import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Subtle parallax for the section background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <motion.div 
      ref={sectionRef}
      className="bg-[#f2f8ff]  max-w-screen flex flex-col justify-between p-8 gap-8 relative overflow-hidden"
      style={{ y: backgroundY }}
    >
      <p className="lg:pl-16 text-[#584ffb] md:text-center xl:text-left">
        [How it works]
      </p>
      <h2 className="mb-8 !text-5xl md:text-center xl:text-left lg:pl-16 lg:!text-6xl !font-light ">
        Making wellness feel achievable,<br></br>flexible, and{' '}
        <span className="text-[#584ffb]">personal.</span>
      </h2>
      <div className="flex flex-col items-center gap-8 xl:flex-row min-w-full xl:items-center xl:justify-between lg:px-16">
        <div>
          <p>[1]</p>
          <p className="!font-bold">Set weekly Allowances</p>
          <p className="mb-8">
            Users set weekly allowances for indulgences<br></br> (like 🍕, 🍺)
          </p>
          <img src="./frontindulgeces.png"></img>
        </div>
        <div>
          <p>[2]</p>
          <p className="!font-bold">Ai-curated health act plan</p>
          <p className="mb-8">
            The app helps balance out the indulgences with<br></br> an
            AI-curated customized health act plan.{' '}
          </p>
          <img src="./frontpagehealthact.png"></img>
        </div>
        <div>
          <p>[3]</p>
          <p className="!font-bold"> Follow the plan, achieve balance</p>
          <p className="mb-8">
            A smart dashboard visualizes users health<br></br> actions and
            highlights their wellbeing progress.
          </p>
          <img src="./frontpagedetail.png"></img>
        </div>
      </div>
    </motion.div>
  );
};

export default HowItWorks;
