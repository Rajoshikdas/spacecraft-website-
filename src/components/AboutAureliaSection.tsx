import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Compass, ShieldAlert, Cpu, Orbit, Globe, ChevronRight } from 'lucide-react';

export default function AboutAureliaSection() {
  const [activeCallout, setActiveCallout] = useState<string | null>(null);

  // Logos from the "Trusted By" reference
  const trustedBrands = [
    { name: 'Gemini', type: 'AI Lead' },
    { name: 'perplexity', type: 'Search' },
    { name: 'OpenAI', type: 'Research' },
    { name: 'emergent', type: 'Dynamics' },
    { name: 'Lovable', type: 'Builder' }
  ];

  // Callouts from the reference surrounding the center
  const callouts = [
    {
      id: 'atm-pressure',
      title: 'ATM. PRESSURE',
      value: '1.1× EARTH STANDARD',
      align: 'left',
      positionClass: 'lg:top-12 lg:left-12',
      dotX: 'left-[15%]',
      dotY: 'top-[20%]'
    },
    {
      id: 'avg-temp',
      title: 'AVG. TEMPERATURE',
      value: '-12°C (10.4°F)',
      align: 'left',
      positionClass: 'lg:top-1/2 lg:-translate-y-1/2 lg:left-2',
      dotX: 'left-[8%]',
      dotY: 'top-[50%]'
    },
    {
      id: 'light-reflection',
      title: 'LIGHT REFLECTION (ALBEDO)',
      value: '0.67 — HIGH REFLECTIVITY',
      align: 'left',
      positionClass: 'lg:bottom-12 lg:left-12',
      dotX: 'left-[16%]',
      dotY: 'bottom-[18%]'
    },
    {
      id: 'humidity',
      title: 'HUMIDITY',
      value: '74.3%',
      align: 'right',
      positionClass: 'lg:top-12 lg:right-16',
      dotX: 'right-[25%]',
      dotY: 'top-[15%]'
    },
    {
      id: 'ocean-coverage',
      title: 'OCEAN COVERAGE',
      value: '82% OF PLANETARY SURFACE',
      align: 'right',
      positionClass: 'lg:top-1/2 lg:-translate-y-1/2 lg:right-2',
      dotX: 'right-[10%]',
      dotY: 'top-[50%]'
    },
    {
      id: 'surface-color',
      title: 'SURFACE COLOR',
      value: 'Deep Oceanic Blue with Cyan Highlights',
      align: 'right',
      positionClass: 'lg:bottom-12 lg:right-16',
      dotX: 'right-[18%]',
      dotY: 'bottom-[16%]'
    }
  ];

  return (
    <section 
      id="about-aurelia-section" 
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-24 md:py-32 border-t border-zinc-900/60 flex flex-col items-center bg-black"
    >
      {/* 1. Trusted By Section (As requested in the reference image) */}
      <div className="w-full flex flex-col items-center mb-16 sm:mb-24 text-center">
        <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-400 uppercase mb-6">
          Trusted By
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-12 gap-y-6 max-w-4xl">
          {trustedBrands.map((brand, i) => (
            <motion.div
              key={brand.name}
              className="flex flex-col items-center px-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="text-base md:text-xl font-bold tracking-wider text-white hover:text-blue-500 cursor-default font-display transition-colors">
                {brand.name}
              </div>
              <span className="text-[7px] font-mono tracking-widest text-zinc-500 uppercase mt-0.5">
                {brand.type}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2. Main Exploration / Coordinates Arena */}
      <div className="w-full relative min-h-[500px] lg:min-h-[600px] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">
        
        {/* Background Video representing the planet Aurelia */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-4xl h-full object-contain opacity-80 md:opacity-100 scale-95 transition-all duration-700 pointer-events-none"
            style={{ clipPath: 'inset(9.5% 12.5% 12.5% 9.5%)' }}
            src="https://res.cloudinary.com/dsamvhscd/video/upload/v1780045632/kling_20260529_Image_to_Video_generate_s_4100_0_q64rp0.mp4"
          />
        </div>

        {/* Background plain black structure with layout lines & coordinates indicating the space where planet is */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 z-0">
          <svg viewBox="0 0 800 500" className="w-full max-w-4xl h-full stroke-zinc-800 fill-none">
            {/* Outline of orbital coordinate lines to direct visual weight as in reference */}
            <circle cx="400" cy="250" r="210" className="stroke-zinc-800/65" strokeWidth="1" />
            <circle cx="400" cy="250" r="150" className="stroke-zinc-800/40" strokeDasharray="3 3" />
            
            {/* Laser measuring telemetry crosshair */}
            <line x1="400" y1="20" x2="400" y2="480" className="stroke-zinc-900/40" />
            <line x1="100" y1="250" x2="700" y2="250" className="stroke-zinc-900/40" />

            {/* Simulated measurement callout lines connecting to the hover dots in reference image */}
            <path d="M 180 80 L 300 80 L 350 180" className="stroke-zinc-800/40" />
            <path d="M 120 250 L 320 250" className="stroke-zinc-800/40" />
            <path d="M 200 420 L 320 420 L 340 320" className="stroke-zinc-800/40" />
            
            <path d="M 600 80 L 520 80 L 520 180" className="stroke-zinc-800/40" />
            <path d="M 680 250 L 580 250" className="stroke-zinc-800/40" />
            <path d="M 620 420 L 540 420 L 500 320" className="stroke-zinc-800/40" />
          </svg>
        </div>

        {/* Outer Grid for Callout labels (Desktop absolute placement, mobile sequential grid) */}
        <div className="w-full lg:absolute lg:inset-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-0 z-10 pointer-events-none px-4 sm:px-6 lg:px-0">
          {callouts.map((c) => (
            <div
              key={c.id}
              className={`lg:absolute ${c.positionClass} p-3.5 sm:p-4 pointer-events-auto group cursor-pointer bg-zinc-950/45 hover:bg-zinc-950/75 lg:bg-transparent lg:hover:bg-transparent backdrop-blur-sm lg:backdrop-blur-none border border-zinc-900/50 lg:border-none rounded-2xl transition-all duration-300`}
              onMouseEnter={() => setActiveCallout(c.id)}
              onMouseLeave={() => setActiveCallout(null)}
            >
              {/* Callout Info Block */}
              <div className={`flex flex-col ${c.align === 'right' ? 'lg:items-end' : 'lg:items-start'}`}>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeCallout === c.id ? 'bg-blue-500 shadow-[0_0_8px_#3b82f6]' : 'bg-white'
                  }`} />
                  <span className="text-[10px] font-mono tracking-widest text-zinc-300 uppercase group-hover:text-blue-400 transition-colors">
                    {c.title}
                  </span>
                </div>
                <div className={`text-xs sm:text-sm font-semibold tracking-wider transition-colors ${
                  activeCallout === c.id ? 'text-blue-400' : 'text-white'
                } font-display`}>
                  {c.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Center Content Section (representing "About Aurelia Blue-9 X") */}
        <div className="relative max-w-xl mx-auto text-center px-4 py-8 lg:py-0 z-20">
          {/* Subtle blue accent aura representing light reflection of space layout */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

          {/* Headline */}
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide mb-6">
            About Aurelia Blue-9 X
          </h2>

          {/* Description */}
          <p className="font-sans text-sm text-zinc-300 leading-relaxed max-w-md mx-auto mb-8 bg-zinc-950/30 lg:bg-transparent backdrop-blur-[2px] lg:backdrop-blur-none p-4 rounded-xl lg:p-0">
            Aurelia Blue-9 is a mesmerizing world bathed in shades of deep oceanic blue, with reflective high-altitude clouds that shimmer like liquid crystal. Its vast oceans cover more than 80% of the surface, giving the planet a serene yet otherworldly appearance.
          </p>

          {/* Button CTA matching reference exactly */}
          <button
            id="btn-explore-aurelia"
            type="button"
            className="px-8 py-3 border border-zinc-800 hover:border-blue-500 text-white bg-zinc-950/40 hover:bg-zinc-950 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 mx-auto"
          >
            <span>Explore More</span>
            <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
          </button>
        </div>

      </div>
    </section>
  );
}
