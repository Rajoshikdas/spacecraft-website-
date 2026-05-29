/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Rocket, ChevronRight, CornerDownRight, CheckCircle2, Orbit, ShieldCheck, Zap } from 'lucide-react';
import Header from './components/Header';
import PartnersList from './components/PartnersList';
import StatsCardGroup from './components/StatsCardGroup';
import LaunchMissionModal from './components/LaunchMissionModal';
import AboutAureliaSection from './components/AboutAureliaSection';
import { MissionConfig } from './types';

export default function App() {
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [activeDivision, setActiveDivision] = useState<string | null>(null);
  const [lastLaunch, setLastLaunch] = useState<MissionConfig | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  // Dynamic divisions corresponding to the "/ we do" side element in the reference
  const divisions = [
    {
      id: 'propulsion',
      label: 'PROPULSION',
      description: 'Methalox and Hydrolox closed-cycle booster propulsion technologies.'
    },
    {
      id: 'cybernetics',
      label: 'CYBERNETICS',
      description: 'Distributed avionics & flight path computing running state-of-the-art telemetry kernels.'
    },
    {
      id: 'navigation',
      label: 'NAVIGATION',
      description: 'Sub-meter orbital slot accuracy with autonomous space junk collision avoidance.'
    }
  ];

  const handleLaunchSuccess = (config: MissionConfig) => {
    setLastLaunch(config);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col font-sans select-none overflow-x-hidden">
      {/* Hero Wrapper hosting header & main layout with full-screen, high-fidelity background video */}
      <div className="relative w-full overflow-hidden flex flex-col z-10 border-b border-zinc-900/40">
        {/* Background ambient video (kept in loop, muted, full screen cover with subtle scale to auto-crop watermarks) */}
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
          aria-hidden="true"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-45 scale-100 transition-transform duration-700 ease-out"
            src="https://res.cloudinary.com/dsamvhscd/video/upload/v1780035688/kling_20260529_Image_to_Video_create_a_s_3466_0_lysgni.mp4"
          />
        </div>

        {/* Background stars grid overlay (underneath structural elements) */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40 z-0" 
          aria-hidden="true"
        />

        {/* Top Header Navigation */}
        <Header 
          onMenuToggle={() => setIsLaunchModalOpen(true)} 
          onExploreClick={() => setIsLaunchModalOpen(true)}
        />

        {/* Notification banner on success */}
        <AnimatePresence>
          {showNotification && lastLaunch && (
            <motion.div
              id="launch-success-banner"
              className="fixed top-24 left-1/2 -translate-x-1/2 bg-zinc-950 border border-emerald-500/30 text-white rounded-2xl p-4 shadow-[0_10px_35px_rgba(16,185,129,0.15)] z-50 flex items-center gap-3.5 max-w-sm w-full"
              initial={{ opacity: 0, y: -20, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: -20, x: '-50%' }}
            >
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/25">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-white">ORBIT MONITOR ESTABLISHED</div>
                <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
                  {lastLaunch.payloadName} is now traveling at 27.6k km/h. Destination: {lastLaunch.destination}.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main hero grid body */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-20 flex flex-col gap-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch w-full">
            {/* LEFT COLUMN: Texts and Primary Actions (Occupies 7 spans on desktop) */}
            <section id="hero-left-section" className="lg:col-span-7 flex flex-col justify-between animate-fade-in relative p-5 sm:p-8 lg:p-10 rounded-2xl min-h-[360px] lg:min-h-[480px]">
              {/* Subtler outer gradient for the layout box */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent -z-10 rounded-2xl pointer-events-none" />
              
              {/* Localized container with deep linear gradient (from semi-transparent black on left to transparent) behind text */}
              <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-black/90 via-black/60 to-transparent border border-zinc-900/30 backdrop-blur-[2px] max-w-xl overflow-hidden mb-6">
                {/* Subtitle / Category Pill */}
                <div className="flex items-center gap-2 mb-6" id="agency-badge">
                  <span className="w-6 h-[1.5px] bg-blue-500/85" />
                  <span className="font-display text-xs tracking-[0.25em] text-zinc-300 uppercase font-medium">
                    Aerospace Design Agency
                  </span>
                </div>

                {/* Primary Massive Headline matching layout of the reference */}
                <h1 
                  id="main-headline"
                  className="font-display font-medium tracking-tight text-white leading-[1.1] mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-[52px]"
                >
                  Building <br />
                  spacecraft that <br />
                  <span className="bg-gradient-to-r from-white via-white to-blue-500 bg-clip-text text-transparent">
                    stand out
                  </span>
                </h1>

                {/* Subheading description - brighter text for perfect readability */}
                <p 
                  id="main-description"
                  className="font-sans text-sm md:text-base text-zinc-300 leading-relaxed"
                >
                  Based in Cape Canaveral, we're an aerospace engineering & design studio passionate about creating next-generation spacecraft, high applicability propulsion systems, and beautiful deep-space exploration vehicles.
                </p>
              </div>

              {/* Action CTA buttons */}
              <div className="flex flex-wrap items-center gap-4 mt-auto mb-2 pl-6 sm:pl-8" id="cta-buttons">
                <button
                  id="btn-agency-cta-primary"
                  type="button"
                  onClick={() => setIsLaunchModalOpen(true)}
                  className="px-8 py-4 bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-semibold tracking-wider font-display rounded-full text-sm transition-all shadow-[0_10px_25px_rgba(59,130,246,0.2)] hover:shadow-[0_12px_30px_rgba(59,130,246,0.35)] hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                >
                  <Rocket className="w-4 h-4 fill-current text-white" />
                  Start Now
                </button>

                <button
                  id="btn-agency-cta-secondary"
                  type="button"
                  onClick={() => setIsLaunchModalOpen(true)}
                  className="px-8 py-4 border border-zinc-800 hover:border-zinc-700 bg-zinc-950/20 hover:bg-zinc-950/60 rounded-full text-zinc-300 hover:text-white text-sm font-semibold tracking-wider font-display transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4 text-blue-500" />
                </button>
              </div>
            </section>

            {/* RIGHT COLUMN: Interactive Widgets, Stats Panels and Comms forms (Occupies 5 spans) */}
            <section id="hero-right-section" className="lg:col-span-5 flex flex-col justify-between w-full lg:pl-4 min-h-[320px] lg:min-h-[480px]">
              
              {/* Vertical / We Do categories above the card widgets */}
              <div id="division-we-do-panel" className="bg-zinc-950/10 border border-zinc-900/60 rounded-3xl p-5 mb-4">
                <div className="flex items-center justify-between mb-3 border-b border-zinc-900 pb-2">
                  <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">/ we do</span>
                  <span className="text-[9px] font-mono text-blue-500/60 font-semibold">[ HOVER TO REVIEW ]</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  {divisions.map((div) => (
                    <div
                      key={div.id}
                      id={`div-section-${div.id}`}
                      className="relative group cursor-pointer py-1.5 px-3 rounded-lg hover:bg-zinc-950/80 border border-transparent hover:border-zinc-900 transition-all"
                      onMouseEnter={() => setActiveDivision(div.id)}
                      onMouseLeave={() => setActiveDivision(null)}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-mono tracking-widest transition-colors ${
                          activeDivision === div.id ? 'text-blue-500' : 'text-zinc-400 group-hover:text-white'
                        }`}>
                          {div.label}
                        </span>
                        <CornerDownRight className={`w-3.5 h-3.5 transition-all ${
                          activeDivision === div.id ? 'text-blue-500 translate-x-1' : 'text-zinc-700'
                        }`} />
                      </div>
                      
                      {/* Expand description on hover */}
                      <AnimatePresence>
                        {activeDivision === div.id && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-[11px] font-sans text-zinc-500 mt-2 leading-relaxed"
                          >
                            {div.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Combined Stats Cards Card 1 & Card 2 */}
              <StatsCardGroup />

            </section>
          </div>

          {/* Partner monochromatic logo list full width below */}
          <PartnersList />

        </main>
      </div>

      {/* About Aurelia Section with coordinates and metrics */}
      <AboutAureliaSection />

      {/* Decorative tiny details in the corners of black canvas to resemble beautiful flight engineering deck layout */}
      <footer className="w-full py-4 px-6 md:px-12 border-t border-zinc-900/40 text-[9px] font-mono text-zinc-600 flex flex-col sm:flex-row justify-between items-center gap-2 mt-auto">
        <span>© 2026 SPACECRAFT ORIGIN AGENCY. ALL ORBITAL RESERVATIONS SECURED.</span>
        <div className="flex items-center gap-4">
          <span>COORDINATES: CL-22.18 / AP-90</span>
          <span className="hidden sm:inline text-blue-500/50">● FLIGHT DECK COMPATIBLE</span>
        </div>
      </footer>

      {/* Interactive Telemetry & Launcher Configurator Modal */}
      <LaunchMissionModal
        isOpen={isLaunchModalOpen}
        onClose={() => setIsLaunchModalOpen(false)}
        onLaunchSuccess={handleLaunchSuccess}
      />
    </div>
  );
}
