import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ShowcaseAI = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  // Image slider data
  const sliderImages = [
    '/Task01.png',
    '/Task02.png', 
    '/Task03.png',
    '/Task04.png'
  ];

  // Transform scroll progress to horizontal movement
  // Start with first image centered, end with fourth image centered
  // 4 images × 320px = 1280px total width
  const x = useTransform(scrollYProgress, [0, 1], [1440, -800]);

  return (
    <div ref={ref} className="min-h-screen flex flex-col items-center justify-center px-6 py-8 bg-gray-50">
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
        <div className="w-80 h-[600px] bg-black rounded-[3rem] p-2 shadow-2xl">
          {/* Phone Screen */}
          <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-6 pt-3 pb-2">
              <span className="text-black text-sm font-medium">9:41</span>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-2 bg-black rounded-sm"></div>
                <div className="w-4 h-2 bg-black rounded-sm"></div>
                <div className="w-6 h-3 bg-black rounded-sm"></div>
              </div>
            </div>

            {/* App Header */}
            <div className="flex justify-between items-center px-6 py-4">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Balance
              </h1>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500"></div>
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <div className="w-4 h-0.5 bg-gray-600"></div>
                  <div className="w-4 h-0.5 bg-gray-600"></div>
                  <div className="w-4 h-0.5 bg-gray-600"></div>
                </div>
              </div>
            </div>

            {/* Welcome Section */}
            <div className="px-6 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">Welcome.</p>
                  <h2 className="text-2xl font-bold text-gray-800">Ciro</h2>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-sm">27 Aug</p>
                  <p className="text-gray-500 text-sm">Wednesday</p>
                </div>
              </div>
            </div>

            {/* Main Content Area with Gradient */}
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-100 via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Image Slider Overlay */}
          <motion.div
            className="absolute bottom-2 left-2 right-2 h-[300px] rounded-[2.5rem] pointer-events-none"
            style={{ x }}
          >
            <div className="flex h-full">
              {sliderImages.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-80 h-full ">
                  <img
                    src={image}
                    alt={`Task ${index + 1}`}
                    className="w-full object-fit"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ShowcaseAI;