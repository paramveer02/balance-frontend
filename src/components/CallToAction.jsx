import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "./ui/Badge";
import { useRef } from "react";

const CallToAction = () => {
  const textRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 80%", "end end"]
  });

  // Split text into three paragraphs for individual animation
  const paragraphs = [
    "Mainstream health adviser apps wants to make everyone a saint, living a restricted yet purely healthy life. However, we all know it's not possible.",
    "We believe that just live a balanced life, you can already improve wellbeing of your life.",
    "We built Balance to change that. Now, it's your move."
  ];

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

        {/* Main Paragraph with Scroll-based Word Animation */}
        <motion.h3
          ref={textRef}
          className="font-bold text-white mb-6 sm:mb-8 max-w-3xl mx-auto scroll-highlight"
          style={{ 
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            lineHeight: '120%',
            opacity: 1
          }}
        >
          {paragraphs.map((paragraph, paragraphIndex) => {
            const words = paragraph.split(" ");
            
            return (
              <div key={paragraphIndex} className={paragraphIndex > 0 ? "mt-6" : ""}>
                {words.map((word, wordIndex) => {
                  // Calculate individual word opacity based on scroll progress
                  const globalWordIndex = paragraphs.slice(0, paragraphIndex).reduce((acc, p) => acc + p.split(" ").length, 0) + wordIndex;
                  const totalWords = paragraphs.reduce((acc, p) => acc + p.split(" ").length, 0);
                  
                  // Add delay for each word (staggered effect)
                  const wordDelay = globalWordIndex / totalWords;
                  const wordProgress = useTransform(
                    scrollYProgress,
                    [wordDelay, Math.min(wordDelay + 0.05, 1)],
                    [0.3, 1]
                  );

                  return (
                    <motion.span
                      key={`${paragraphIndex}-${wordIndex}`}
                      className="word inline-block mr-2"
                      style={{ 
                        opacity: wordProgress,
                        display: 'inline-block'
                      }}
                    >
                      {word}
                    </motion.span>
                  );
                })}
              </div>
            );
          })}
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
