import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "./ui/Badge";

const CallToAction = () => {
  return (
    <section 
      className="relative px-4 sm:px-6 py-12 sm:py-20 h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: 'url(/callToActionBg.jpg)' }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative max-w-4xl mx-auto text-center text-white px-2 sm:px-0">
        {/* Badge */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="subtle" showIcon={false} className="text-white bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/30">
            What we believe
          </Badge>
        </motion.div>

        {/* Main Paragraph */}
        <motion.h3
          className="font-semibold text-white mb-6 sm:mb-8 max-w-3xl mx-auto"
          style={{ 
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            lineHeight: '120%'
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Mainstream health adviser apps wants to make everyone a saint, living a restricted yet purely healthy life. However, we all know it's not possible.
          <br /><br />
          We believe that just live a balanced life, you can already improve wellbeing of your life.
          <br /><br />
          We built Balance to change that. Now, it's your move.
        </motion.h3>

        {/* CTA Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Link
            to="/signup"
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-colors duration-300"
          >
            Join today
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
