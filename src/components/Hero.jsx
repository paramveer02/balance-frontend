// src/components/Hero.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBalanceScale, FaHeartbeat, FaBolt } from "react-icons/fa";

// Small motion helpers
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};
const fade = { initial: { opacity: 0 }, animate: { opacity: 1 } };

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-20 lg:py-32">
      {/* Soft gradient background + floating blobs */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-green-600/10"
        {...fade}
        transition={{ duration: 0.6 }}
        aria-hidden
      />
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-xl"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Launch badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-6 rounded-full px-4 py-2 text-sm text-white
                     bg-gradient-to-r from-purple-600 to-blue-600 shadow-sm"
          {...fadeUp}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-white/90 animate-pulse" />
          <span>We launched new features</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600
                     bg-clip-text text-transparent mb-4"
          {...fadeUp}
          transition={{ delay: 0.05, duration: 0.6 }}
        >
          Balance your life—beautifully
        </motion.h1>

        {/* Subcopy */}
        <motion.p
          className="text-xl lg:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
          {...fadeUp}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Log indulgences, add healthy habits, and let our AI turn them into a
          weekly plan you’ll actually follow. No guilt—just balance.
        </motion.p>

        {/* Quick value chips */}
        <motion.div
          className="mx-auto mb-10 flex flex-wrap items-center justify-center gap-3"
          {...fadeUp}
          transition={{ delay: 0.15 }}
        >
          <span className="badge badge-lg border-0 bg-purple-100 text-purple-700">
            <FaBalanceScale className="mr-2" /> Habit ↔️ Indulgence balance
          </span>
          <span className="badge badge-lg border-0 bg-blue-100 text-blue-700">
            <FaHeartbeat className="mr-2" /> Positive, guilt-free coaching
          </span>
          <span className="badge badge-lg border-0 bg-green-100 text-green-700">
            <FaBolt className="mr-2" /> AI-personalized weekly plan
          </span>
        </motion.div>

        {/* Primary CTAs (Router links) */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14"
          {...fadeUp}
          transition={{ delay: 0.2 }}
        >
          <Link to="/signup" className="btn btn-primary btn-lg px-8">
            🚀 Start free
          </Link>
          <Link to="/login" className="btn btn-secondary btn-lg px-8">
            🔐 I already have an account
          </Link>
        </motion.div>

        {/* Social proof / stats strip */}
        <motion.div
          className="flex justify-center items-center gap-8 text-sm text-gray-500"
          {...fadeUp}
          transition={{ delay: 0.25 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>10k+ balanced weeks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span>92% feel more in control</span>
          </div>
        </motion.div>

        {/* Decorative “balance meter” */}
        <motion.div
          className="mt-10 mx-auto h-2 w-72 rounded-full bg-gray-200/70 overflow-hidden"
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
        </motion.div>
      </div>
    </section>
  );
}
