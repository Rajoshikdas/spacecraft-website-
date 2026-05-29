import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, RefreshCw, Cpu, Database, Compass, Fuel, Shield, CheckCircle } from 'lucide-react';
import { MissionConfig } from '../types';

interface LaunchMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchSuccess: (config: MissionConfig) => void;
}

export default function LaunchMissionModal({ isOpen, onClose, onLaunchSuccess }: LaunchMissionModalProps) {
  const [activeStep, setActiveStep] = useState<'config' | 'launching' | 'orbit'>('config');
  const [config, setConfig] = useState<MissionConfig>({
    payloadName: 'CHRONOS-IX',
    payloadWeight: 4500,
    orbitAltitude: 550,
    propellantType: 'Methalox',
    destination: 'Low Earth Orbit (LEO)'
  });

  // Launch countdown & Telemetry ticks
  const [countdown, setCountdown] = useState(5);
  const [telemetry, setTelemetry] = useState({
    altitude: 0,
    velocity: 0,
    fuel: 100,
    maxQ: false,
    stageSeparation: false
  });

  const launchInterval = useRef<NodeJS.Timeout | null>(null);

  // Play synthetic computer bleep audio using standard Web Audio API
  const playBeep = (freq: number, duration: number, type: 'sine' | 'square' | 'triangle' = 'sine') => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = type;
      oscillator.frequency.value = freq;
      
      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Ignored if browser sound blocked or unsupported
    }
  };

  useEffect(() => {
    if (activeStep === 'launching') {
      setCountdown(5);
      setTelemetry({ altitude: 0, velocity: 0, fuel: 100, maxQ: false, stageSeparation: false });
    }
    return () => {
      if (launchInterval.current) clearInterval(launchInterval.current);
    };
  }, [activeStep]);

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (activeStep === 'launching' && countdown > 0) {
      t = setTimeout(() => {
        setCountdown((c) => c - 1);
        playBeep(900, 0.1, 'sine');
      }, 1000);
    } else if (activeStep === 'launching' && countdown === 0) {
      // Ignite!
      playBeep(120, 1.2, 'triangle');
      let ticks = 0;
      launchInterval.current = setInterval(() => {
        ticks += 1;
        setTelemetry((prev) => {
          const nextFuel = Math.max(0, 100 - ticks * 1.5);
          const nextAlt = Math.round(Math.pow(ticks, 1.8) * 4);
          const nextVel = Math.round(Math.pow(ticks, 1.5) * 220);
          const hasMaxQ = nextAlt > 80 && nextAlt < 130;
          const hasSep = nextAlt > 240;

          // Accompanying telemetry beep triggers
          if (ticks % 4 === 0) {
            playBeep(1000, 0.05, 'sine');
          }

          if (nextAlt >= config.orbitAltitude) {
            if (launchInterval.current) clearInterval(launchInterval.current);
            setActiveStep('orbit');
            playBeep(1500, 0.6, 'sine');
            onLaunchSuccess(config);
            return {
              altitude: config.orbitAltitude,
              velocity: 27600, // Orbital speed for LEO approx
              fuel: nextFuel,
              maxQ: false,
              stageSeparation: true
            };
          }

          return {
            altitude: nextAlt,
            velocity: nextVel,
            fuel: nextFuel,
            maxQ: hasMaxQ,
            stageSeparation: hasSep
          };
        });
      }, 150);
    }
    return () => clearTimeout(t);
  }, [activeStep, countdown]);

  const handleStartLaunch = () => {
    playBeep(440, 0.15, 'sine');
    setActiveStep('launching');
  };

  const handleReset = () => {
    setActiveStep('config');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="launch-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Glass background overlay */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            id="launch-configurator-box"
            className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.15)] z-10"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Elegant Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-900 bg-zinc-900/20">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                  Telemetry Deck // Payload Integration
                </span>
              </div>
              <button
                id="btn-close-launch-modal"
                type="button"
                className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main viewports */}
            <div className="p-6">
              {activeStep === 'config' && (
                <div>
                  <h3 className="font-display text-2xl font-bold text-white tracking-wider mb-2">
                    Mission Flight Configurator
                  </h3>
                  <p className="text-zinc-400 font-sans text-xs mb-6">
                    Configure your high-applicability spacecraft launch parameters. Values compute directly onto active guidance systems.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    {/* Input Field payload */}
                    <div>
                      <label htmlFor="payload-name" className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase mb-1.5">
                        Payload Codename
                      </label>
                      <input
                        id="payload-name"
                        type="text"
                        value={config.payloadName}
                        onChange={(e) => setConfig({ ...config, payloadName: e.target.value.toUpperCase() })}
                        className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-blue-500/80 rounded-lg py-2.5 px-3.5 text-sm text-white font-mono outline-none transition-colors"
                      />
                    </div>

                    {/* Destination Selection */}
                    <div>
                      <label htmlFor="payload-destination" className="block text-[10px] font-mono text-zinc-500 tracking-wider uppercase mb-1.5">
                        Target Destination Orbit
                      </label>
                      <select
                        id="payload-destination"
                        value={config.destination}
                        onChange={(e) => {
                          const dest = e.target.value as any;
                          let alt = 550;
                          if (dest.includes('GEO')) alt = 35780;
                          if (dest.includes('Lunar')) alt = 384400;
                          if (dest.includes('Martian')) alt = 400000;
                          setConfig({ ...config, destination: dest, orbitAltitude: alt });
                        }}
                        className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-blue-500/80 rounded-lg py-2.5 px-3.5 text-sm text-white font-mono outline-none transition-colors"
                      >
                        <option value="Low Earth Orbit (LEO)">Low Earth Orbit (LEO) - 550 km</option>
                        <option value="Geostationary (GEO)">Geostationary (GEO) - 35,780 km</option>
                        <option value="Lunar Transfer">Lunar Orbit (LTO) - 384,400 km</option>
                        <option value="Martian Orbit">Mars Transfer Transit - 400M km</option>
                      </select>
                    </div>

                    {/* Numeric weight slider */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label htmlFor="payload-weight" className="text-[10px] font-mono text-zinc-400 tracking-wider uppercase">
                          Payload Weight
                        </label>
                        <span className="font-mono text-xs text-blue-500">{config.payloadWeight.toLocaleString()} kg</span>
                      </div>
                      <input
                        id="payload-weight"
                        type="range"
                        min="500"
                        max="25000"
                        step="100"
                        value={config.payloadWeight}
                        onChange={(e) => setConfig({ ...config, payloadWeight: parseInt(e.target.value) })}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>

                    {/* Propellant Type */}
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase mb-1.5">
                        Propellant Formula
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {(['Methalox', 'Hydrolox', 'Kerolox', 'Ion Drive'] as const).map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setConfig({ ...config, propellantType: type })}
                            className={`py-2 px-3 rounded-lg text-xs font-mono border transition-all cursor-pointer text-center ${
                              config.propellantType === type
                                ? 'bg-blue-500/10 border-blue-500 text-blue-500'
                                : 'bg-transparent border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Summary telemetry estimate box */}
                  <div className="bg-zinc-900/30 border border-zinc-900 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zinc-950 flex items-center justify-center border border-zinc-800">
                        <Cpu className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">AUTONOMOUS INTEGRITY OK</div>
                        <div className="text-[10px] font-mono text-zinc-500">System checks fully passed. Launch ready.</div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-right border-r border-zinc-900 pr-4">
                        <div className="text-[10px] font-mono text-zinc-500 uppercase">Target Alt</div>
                        <div className="text-sm font-bold text-white font-mono">{config.orbitAltitude.toLocaleString()} km</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-mono text-zinc-500 uppercase">Est. Fuel Burn</div>
                        <div className="text-sm font-bold text-white font-mono">
                          {config.propellantType === 'Ion Drive' ? '12%' : '88.4%'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    id="btn-confirm-launch"
                    type="button"
                    onClick={handleStartLaunch}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold font-display tracking-widest text-sm rounded-xl py-3.5 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_4px_14px_rgba(59,130,246,0.25)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.35)]"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    INITIATE LAUNCH SEQUENCE
                  </button>
                </div>
              )}

              {activeStep === 'launching' && (
                <div className="text-center py-8">
                  {countdown > 0 ? (
                    <div>
                      <div className="text-[10px] font-mono tracking-widest text-blue-500/80 mb-2 uppercase animate-pulse">
                        TERMINAL COUNTDOWN ACTIVE
                      </div>
                      <div className="text-8xl font-display font-medium text-white mb-6 select-none font-mono">
                        T-{countdown}
                      </div>
                      <div className="w-48 bg-zinc-900 border border-zinc-800 rounded-full h-1.5 mx-auto overflow-hidden">
                        <motion.div
                          className="bg-blue-500 h-full shadow-[0_0_8px_#3b82f6]"
                          initial={{ width: '0%' }}
                          animate={{ width: `${(5 - countdown) * 20}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-md mx-auto text-left">
                      <div className="flex items-center justify-between mb-3 border-b border-zinc-900 pb-2">
                        <div className="font-mono text-[10px] text-blue-500 animate-pulse flex items-center gap-1.5">
                          <Fuel className="w-3.5 h-3.5 animate-spin" />
                          IGNITION SECURED // VEHICLE CLIMBING
                        </div>
                        <div className="font-mono text-[10px] text-zinc-500">
                          BOOSTER STATE: NOMINAL
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-3.5">
                          <span className="block text-[9px] font-mono text-zinc-500 uppercase">Altitude</span>
                          <span className="text-2xl font-mono font-medium text-white">{telemetry.altitude} km</span>
                        </div>
                        <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-3.5">
                          <span className="block text-[9px] font-mono text-zinc-500 uppercase">Velocity</span>
                          <span className="text-2xl font-mono font-medium text-white">{telemetry.velocity.toLocaleString()} km/h</span>
                        </div>
                        <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-3.5">
                          <span className="block text-[9px] font-mono text-zinc-500 uppercase">Fuel Remainder</span>
                          <span className="text-2xl font-mono font-medium text-white">{Math.round(telemetry.fuel)}%</span>
                        </div>
                        <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-3.5 flex flex-col justify-center">
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`w-2 h-2 rounded-full ${telemetry.maxQ ? 'bg-blue-500 animate-ping' : 'bg-zinc-800'}`} />
                            <span className="text-[9px] font-mono text-zinc-400">Max Q Tension</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${telemetry.stageSeparation ? 'bg-emerald-500' : 'bg-zinc-800'}`} />
                            <span className="text-[9px] font-mono text-zinc-400">Main Stage Sep</span>
                          </div>
                        </div>
                      </div>

                      {/* Flight visualization wireframe bar */}
                      <div className="w-full bg-zinc-900 border border-zinc-800 rounded-full h-2 relative mb-2">
                        <div
                          className="bg-blue-500 h-full rounded-full transition-all duration-150 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                          style={{ width: `${(telemetry.altitude / config.orbitAltitude) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500">
                        <span>Sea Level</span>
                        <span>Orbit Target ({config.orbitAltitude}km)</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeStep === 'orbit' && (
                <div className="text-center py-6">
                  {/* Confirmed circular checklist view */}
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 text-emerald-500">
                    <CheckCircle className="w-9 h-9" />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    Orbital Insertion Successful
                  </h3>
                  <p className="text-zinc-400 text-xs font-sans max-w-sm mx-auto mb-6">
                    {config.payloadName} has deployed successfully into {config.destination}. Solar panel arrays are self-deploying. Telemetry stabilized.
                  </p>

                  <div className="inline-grid grid-cols-2 gap-x-8 gap-y-2 border border-zinc-900 bg-zinc-950 px-6 py-4 rounded-2xl font-mono text-left mb-6 text-xs text-zinc-400">
                    <div>Payload Name:</div>
                    <div className="text-white font-semibold">{config.payloadName}</div>
                    <div>Insertion Altitude:</div>
                    <div className="text-white font-semibold">{config.orbitAltitude} km</div>
                    <div>Orbital Velocity:</div>
                    <div className="text-white font-semibold">27,612 km/h</div>
                    <div>Radio Link:</div>
                    <div className="text-emerald-500 font-semibold">GREEN (AP-4)</div>
                  </div>

                  <button
                    id="btn-launch-another"
                    type="button"
                    onClick={handleReset}
                    className="w-full max-w-xs bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-white font-semibold font-display tracking-widest text-sm rounded-xl py-3.5 inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4 text-blue-500" />
                    PREPARE NEW INJECTION
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
