// src/components/CallToAction.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <section className="relative px-6 py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600">
      <motion.div
        className="absolute inset-0 opacity-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        transition={{ duration: 0.6 }}
        aria-hidden
      />
      <div className="relative max-w-4xl mx-auto text-center text-white">
        <motion.h2
          className="text-4xl lg:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Ready to Level Up?
        </motion.h2>

        <motion.p
          className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.6 }}
        >
          Join thousands transforming their routines with balanced habits, not
          guilt. Your next level awaits.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <Link
            to="/signup"
            className="btn btn-lg bg-white text-purple-700 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
          >
            🚀 Start Your Journey
          </Link>
          <Link
            to="/login"
            className="btn btn-lg btn-outline border-2 border-white text-white hover:bg-white hover:text-purple-700 px-8 py-4 text-lg font-semibold"
          >
            🔐 I already have an account
          </Link>
        </motion.div>

        <p className="text-purple-200 text-sm">
          Free to start • Premium features available • No ads, ever
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
