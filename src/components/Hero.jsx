import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBalanceScale, FaHeartbeat, FaBolt } from 'react-icons/fa';
import { Badge } from './ui/Badge';

// Small motion helpers
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};
const fade = { initial: { opacity: 0 }, animate: { opacity: 1 } };

export function Hero() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden px-6 py-20 lg:py-32 min-h-screen flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/herobg.png)' }}
          aria-hidden
        />

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" aria-hidden />

        {/* Subtle gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/30"
          {...fade}
          np
          transition={{ duration: 0.6 }}
          aria-hidden
        />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Launch badge */}
          <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
            <Badge variant="subtle" className="mb-6">
              We launched new features
            </Badge>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight"
            {...fadeUp}
            transition={{ delay: 0.05, duration: 0.6 }}
          >
            Wellness isn't about perfection.
            <br />
            It's balance.
          </motion.h1>

          {/* Subcopy */}
          <motion.p
            className="text-xl lg:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
            {...fadeUp}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Treats your health lifestyle like a budget.
          </motion.p>

          {/* Quick value chips */}
          {/* <motion.div
          className="mx-auto mb-10 flex flex-wrap items-center justify-center gap-3"
          {...fadeUp}
          transition={{ delay: 0.15 }}
        >
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
            <FaBalanceScale className="mr-2" /> Habit ↔️ Indulgence balance
          </span>
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
            <FaHeartbeat className="mr-2" /> Positive, guilt-free coaching
          </span>
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
            <FaBolt className="mr-2" /> AI-personalized weekly plan
          </span>
        </motion.div> */}

          {/* Primary CTA */}
          <motion.div className="mt-8" {...fadeUp} transition={{ delay: 0.2 }}>
            <Link
              to="/signup"
              className="text-white font-semibold py-4 px-8 rounded-full text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              style={{
                backgroundColor: 'var(--primary-color)',
                '--tw-bg-opacity': '1',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#007A5E';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--primary-color)';
              }}
            >
              Get started
            </Link>
          </motion.div>

          {/* Social proof / stats strip */}
          {/* <motion.div
            className="flex justify-center items-center gap-8 text-sm text-white/80 mt-6"
            {...fadeUp}
            transition={{ delay: 0.25 }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: 'var(--primary-color)' }}
              />
              <span>10k+ balanced weeks</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: 'var(--secondary-color)' }}
              />
              <span>92% feel more in control</span>
            </div>
          </motion.div> */}

          {/* Decorative "balance meter" */}
          {/* <motion.div
          className="mt-10 mx-auto h-2 w-72 rounded-full bg-white/20 overflow-hidden"
          {...fadeUp}
          transition={{ delay: 0.3 }}
          aria-hidden
        >
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400"
            initial={{ width: "30%" }}
            animate={{ width: ["30%", "58%", "50%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div> */}
        </div>
      </section>
    </div>
  );
}
