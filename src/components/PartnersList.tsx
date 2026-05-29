import { motion } from 'motion/react';
import { Sparkles, Compass, ShieldAlert, Cpu, Orbit, Circle, Sun } from 'lucide-react';

export default function PartnersList() {
  const partners = [
    { name: 'Zantic Aerospace', icon: Orbit, detail: 'BOOSTER SYSTEMS' },
    { name: 'Neptune Tech', icon: Cpu, detail: 'AVIONICS' },
    { name: 'Krono Labs', icon: ShieldAlert, detail: 'PROPULSION' },
    { name: 'Mercury Global', icon: Compass, detail: 'NAVIGATION' },
    { name: 'Helios Fuels', icon: Sun, detail: 'SOLAR ARRAYS' }
  ];

  return (
    <div id="partners-section" className="mt-16 md:mt-24 pointer-events-auto">
      <div className="flex items-center gap-2 mb-4">
        <span className="h-[1px] w-8 bg-zinc-800" />
        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
          Supported Launch Providers & Agencies
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 max-w-xl">
        {partners.map((partner, index) => {
          const IconComponent = partner.icon;
          return (
            <motion.div
              key={partner.name}
              id={`partner-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center gap-2 cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
            >
              <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-900 group-hover:border-blue-500/30 flex items-center justify-center transition-colors">
                <IconComponent className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <div>
                <dt className="text-xs font-semibold text-zinc-400 group-hover:text-white transition-colors tracking-wide font-display">
                  {partner.name}
                </dt>
                <dd className="text-[8px] font-mono text-zinc-600 group-hover:text-blue-500/80 transition-colors uppercase">
                  {partner.detail}
                </dd>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
