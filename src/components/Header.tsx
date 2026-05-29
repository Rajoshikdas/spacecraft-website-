import { useState } from 'react';
import { motion } from 'motion/react';
import { LayoutGrid, Orbit } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  onExploreClick: () => void;
}

export default function Header({ onMenuToggle, onExploreClick }: HeaderProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Services', href: '#' },
    { label: 'Works', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' }
  ];

  return (
    <header className="w-full flex items-center justify-between px-6 py-5 md:px-12 relative z-40">
      {/* Left Logo - Spacecraft Branding */}
      <div className="flex items-center">
        <motion.div
          id="header-spinner-logo"
          className="relative cursor-pointer group flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          onClick={onExploreClick}
        >
          {/* External glow spoke spinner */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center border border-zinc-800 bg-zinc-950 shadow-inner">
            <Orbit className="w-5 h-5 text-blue-500 animate-[spin_12s_linear_infinite]" />
            
            {/* Elegant outer ticks simulating the logo in the reference */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full animate-spin-slow pointer-events-none"
            >
              <defs>
                <radialGradient id="blue-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* Generate radiating dashed circle spokes representing the logo in reference */}
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-zinc-850"
                strokeDasharray="4 7"
              />
              <circle
                cx="50"
                cy="50"
                r="34"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-blue-500/40"
                strokeDasharray="6 4"
              />
            </svg>
          </div>
          <span className="hidden sm:inline font-display text-xs tracking-widest text-blue-500 font-bold uppercase">
            SPACECRAFT / ORIGIN
          </span>
        </motion.div>
      </div>

      {/* Middle Navigation - Positioned in the center with a transparent background layer */}
      <nav aria-label="Primary" className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 bg-white/5 backdrop-blur-md px-6 py-1.5 rounded-full border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            id={`nav-${link.label.toLowerCase()}`}
            className="relative font-display text-xs tracking-widest text-zinc-400 hover:text-white uppercase transition-colors py-2"
            onMouseEnter={() => setHoveredLink(link.label)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {link.label}
            {hoveredLink === link.label && (
              <motion.div
                layoutId="nav-underline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 shadow-[0_0_8px_#3b82f6]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </a>
        ))}
      </nav>

      {/* Right Navigation & Utility Menu (No extra buttons next to menu) */}
      <div className="flex items-center gap-3">
        {/* Dynamic menu action to toggle sidebar / flight layout configuration */}
        <button
          id="btn-menu-toggle"
          type="button"
          onClick={onMenuToggle}
          className="flex items-center gap-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800/80 rounded-full pl-4 pr-3 py-2 text-zinc-300 hover:text-white transition-all text-xs font-mono tracking-widest cursor-pointer"
        >
          <span>MENU</span>
          <LayoutGrid className="w-4 h-4 text-blue-500" />
        </button>
      </div>
    </header>
  );
}
