import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, CheckCircle2, UserCheck, ShieldAlert, Sparkles, Orbit, Clock, Radio } from 'lucide-react';

export default function StatsCardGroup() {
  const [showScheduler, setShowScheduler] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState('Apollo Heavy');
  const [scheduledSuccessfully, setScheduledSuccessfully] = useState(false);

  const days = Array.from({ length: 14 }, (_, i) => i + 1);

  const handleScheduleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setScheduledSuccessfully(true);
    setTimeout(() => {
      setScheduledSuccessfully(false);
      setShowScheduler(false);
      setSelectedDate(null);
    }, 2800);
  };

  return (
    <div id="stats-grid-group" className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full z-10 relative">
      {/* CARD 1: 400+ Trusted Partners & Book Launch Button */}
      <div className="relative overflow-hidden bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-blue-500/35 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] transition-all flex flex-col justify-between h-[160px] z-20">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span 
              className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight"
              style={{ textShadow: '0 0 15px rgba(59,130,246,0.6)' }}
            >
              400+
            </span>
            <div className="flex -space-x-1.5 opacity-80">
              <div className="w-5 h-5 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center text-[7px] text-zinc-300 font-mono">U</div>
              <div className="w-5 h-5 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center text-[7px] text-zinc-300 font-mono">N</div>
              <div className="w-5 h-5 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center text-[7px] text-zinc-300 font-mono">E</div>
            </div>
          </div>
          <p className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">Trusted Launch Partners</p>
        </div>

        {/* CTA "Book Launch Window" Button */}
        <button
          id="btn-book-launch"
          type="button"
          onClick={() => setShowScheduler(true)}
          className="relative z-30 w-full py-2 bg-blue-500/10 border border-blue-500/30 hover:border-blue-500 hover:bg-blue-500/20 text-blue-300 hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all rounded-full text-xs font-semibold tracking-widest font-mono flex items-center justify-center gap-1.5 cursor-pointer mt-2"
        >
          <Calendar className="w-3.5 h-3.5 text-blue-400" />
          Book a call
        </button>
      </div>

      {/* CARD 2: "230+" completions, showing dynamic orbital vector in place of VR backdrop */}
      <div className="relative overflow-hidden bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-blue-500/35 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] transition-all flex flex-col justify-between h-[160px] z-10">
        {/* SVG Orbital ring and particles inside as structural elements */}
        <div className="absolute right-0 bottom-0 top-0 w-1/2 overflow-hidden flex items-center justify-center opacity-40 pointer-events-none z-0">
          <svg viewBox="0 0 100 100" className="w-[120%] h-[120%] stroke-zinc-800 fill-none">
            {/* Concentric planetary orbits */}
            <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="30" strokeDasharray="1 4" className="stroke-blue-500/45 animate-[spin_50s_linear_infinite]" />
            <circle cx="50" cy="50" r="15" className="stroke-zinc-900" />
            
            {/* Moving satellite node along orbital line */}
            <g className="animate-[spin_10s_linear_infinite]" style={{ transformOrigin: '50px 50px' }}>
              <circle cx="50" cy="5" r="3" className="fill-blue-500 stroke-none" />
              <line x1="50" y1="5" x2="50" y2="50" className="stroke-blue-500/10 stroke-1" />
            </g>

            {/* Micro radio wave indicator */}
            <circle cx="50" cy="50" r="5" className="fill-zinc-900 stroke-zinc-800" />
          </svg>
        </div>

        <div className="relative z-10 w-full">
          <div className="flex items-center gap-1 mb-2">
            <Radio className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-[8px] font-mono tracking-wider text-zinc-400 uppercase">TELEMETRY COMPOSITE</span>
          </div>
          <span 
            className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight"
            style={{ textShadow: '0 0 15px rgba(59,130,246,0.6)' }}
          >
            230+
          </span>
          <p className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">Vehicles In Active Orbit</p>
        </div>

        <div className="text-[9px] font-mono text-zinc-400 flex items-center gap-1.5 border-t border-white/5 pt-2 relative z-10 w-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>REAL-TIME STREAMING</span>
        </div>
      </div>

      {/* Scheduler Modal Popover */}
      <AnimatePresence>
        {showScheduler && (
          <div id="scheduler-drawer" className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowScheduler(false)}
            />
            
            <motion.div
              id="scheduler-container"
              className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-2xl z-10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {scheduledSuccessfully ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-500">
                    <CheckCircle2 className="w-6 h-6 animate-pulse" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-white mb-2">Flight Session Requested</h4>
                  <p className="text-zinc-400 text-xs font-mono max-w-xs mx-auto">
                    Calendar slot reserved for date UTC-05/{selectedDate}. Spacecraft engineers will contact you at immediate flight review.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleScheduleSubmit}>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-mono tracking-widest text-zinc-400 uppercase">Select Orbital Review Window</h4>
                    <button
                      type="button"
                      onClick={() => setShowScheduler(false)}
                      className="text-zinc-500 hover:text-white text-xs cursor-pointer"
                    >
                      Close
                    </button>
                  </div>

                  {/* Vehicle selection field */}
                  <label htmlFor="select-vehicle" className="block text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
                    Select Vehicle Class
                  </label>
                  <select
                    id="select-vehicle"
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs font-mono text-white mb-4 outline-none"
                  >
                    <option value="Apollo Heavy">Apollo Heavy Class (Expended)</option>
                    <option value="Booster-X Reusable">Booster-X Reusable (Medium Lift)</option>
                    <option value="Scout Drone">Scout Drone (Ion Drive Propulsion)</option>
                  </select>

                  <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-2">Available Dates (June 2026)</div>
                  
                  <div className="grid grid-cols-7 gap-1.5 mb-6">
                    {days.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setSelectedDate(day)}
                        className={`py-2 rounded text-xs font-mono transition-all cursor-pointer ${
                          selectedDate === day
                            ? 'bg-blue-500 text-white font-semibold shadow-[0_0_8px_rgba(59,130,246,0.5)]'
                            : 'bg-zinc-900 hover:bg-zinc-850 text-zinc-300'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>

                  <button
                    id="btn-confirm-booking"
                    type="submit"
                    disabled={selectedDate === null}
                    className="w-full py-2.5 bg-blue-500 text-white rounded-lg text-xs font-mono font-semibold hover:bg-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {selectedDate !== null ? `CONFIRM JUNE ${selectedDate} BRIEFING` : 'SELECT DATE TO PROCEED'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
