import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ShowcaseAI = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 50%", "center start"]
  });

  // Image slider data
  const sliderImages = [
    '/Task01.png',
    '/Task02.png', 
    '/Task03.png',
    '/Task04.png',
    '/Task03.png',
    '/Task02.png',
    '/Task01.png',
  ];

  // Transform scroll progress to horizontal movement
  // Total width: 1304px (4 images × 320px + 3 gaps × 8px)
  // Phone screen width: ~320px
  // To show first image: 0px (no movement needed)
  // To show last image: 320px - 1304px = -984px
  const x = useTransform(scrollYProgress, [0, 1], [860, -860]);

  return (
    <div ref={ref} className="min-h-screen flex flex-col items-center justify-center px-6 pt-8 pb-32 bg-gray-50">
      {/* Spherical Logo */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-40 h-40 bg-gray-50 rounded-full overflow-hidden object-cover items-center justify-center flex">
        <video
          src="https://framerusercontent.com/assets/MNzawPFqWliRq8SHkLceiOFSY8.mp4"
          autoPlay
          loop
          muted
          className="rotate-360 w-[200%] h-[200%] object-cover"
        />
      </div>
      </motion.div>

      {/* Introductory Text */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 leading-relaxed">
          Hey, I'm Balancia, here's your<br />
          weekly balance moves...
        </h2>
      </motion.div>

      {/* Smartphone Mockup */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {/* Phone Mockup Image */}
        <div className="relative w-80 h-[750px]">
          <img
            src="/phone mockup.png"
            alt="Phone Mockup"
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>

      {/* Image Slider - positioned independently */}
      <motion.div
        className="relative w-80 h-[300px] mx-auto -mt-[390px] pointer-events-none"
        style={{ x }}
      >
        <div className="flex h-full gap-2" style={{ width: '1304px' }}>
          {sliderImages.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-55 h-full">
              <img
                src={image}
                alt={`Task ${index + 1}`}
                className="w-full h-full object-fit"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ShowcaseAI;