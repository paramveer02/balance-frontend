import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Indulgences = () => {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Sample data for indulgence chips - split into two rows with fixed amounts
  const firstRowData = [
    { id: 1, text: "Fast Food", imageUrl: "/ChipImage01.png" },
    { id: 2, text: "Late-night Party", imageUrl: "/ChipImage02.png" },
    { id: 3, text: "Sugary Beverage", imageUrl: "/ChipImage03.png" }
  ];

  const secondRowData = [
    { id: 4, text: "Binge-Watch", imageUrl: "/ChipImage04.png" },
    { id: 5, text: "Video Games", imageUrl: "/ChipImage05.png" },
    { id: 6, text: "Desserts", imageUrl: "/ChipImage06.png" },
    { id: 7, text: "Doom Scrolling", imageUrl: "/ChipImage07.png" },
    { id: 8, text: "Alcohol", imageUrl: "/ChipImage08.png" },
  ];

  // Create infinite loop by duplicating data multiple times
  const createInfiniteLoop = (data, repetitions = 12) => {
    return Array.from({ length: repetitions }, () => data).flat();
  };

  const extendedFirstRow = createInfiniteLoop(firstRowData);
  const extendedSecondRow = createInfiniteLoop(secondRowData);

  // Transform scroll progress to horizontal movement - subtle (1/3 viewport width)
  const firstRowX = useTransform(scrollYProgress, [0, 1], ['0%', '-33vw']);
  const secondRowX = useTransform(scrollYProgress, [0, 1], ['0%', '13vw']);

  // Intersection Observer to detect when component enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full py-16 bg-gray-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className=" text-gray-900 leading-tight">
            Life has Indulgences.
            <br />
            We help you make Balance Moves.
          </h1>
        </div>

        {/* First Row - Right to Left */}
        <div className="mb-8">
          <motion.div
            className="flex gap-6 w-max"
            style={{ x: isInView ? firstRowX : 0 }}
            transition={{ type: "none" }}
          >
            {extendedFirstRow.map((item, index) => (
              <div key={`first-${item.id}-${index}`} className="flex gap-6">
                {/* Label Element */}
                <div className="flex-shrink-0 bg-white rounded-full border border-2 border-purple-300 flex items-center justify-center px-14 py-10 h-[6rem]">
                  <h3 className=" font-semibold text-gray-900 text-center whitespace-nowrap">
                    {item.text}
                  </h3>
                </div>
                {/* Image Element */}
                <div className="flex-shrink-0 w-[18rem] h-[6rem] rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={item.imageUrl}
                    alt={item.text}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg hidden">
                    {item.text.charAt(0)}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second Row - Left to Right */}
        <div className="mb-12">
          <motion.div
            className="flex gap-6 w-max"
            style={{ x: isInView ? secondRowX : 0 }}
            transition={{ type: "none" }}
          >
            {extendedSecondRow.map((item, index) => (
                              <div key={`second-${item.id}-${index}`} className="flex gap-6">
                  {/* Label Element */}
                  <div className="flex-shrink-0 bg-white rounded-full border border-2 border-purple-300 flex items-center justify-center px-14 py-10 h-[6rem]">
                    <h3 className="font-semibold text-gray-900 text-center whitespace-nowrap">
                      {item.text}
                    </h3>
                  </div>
                  {/* Image Element */}
                  <div className="flex-shrink-0 w-[18rem] h-[6rem] rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img
                      src={item.imageUrl}
                      alt={item.text}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center text-white font-bold text-lg hidden">
                      {item.text.charAt(0)}
                    </div>
                  </div>
                </div>
            ))}
          </motion.div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <motion.button
            className="bg-green-800 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Show balance moves</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Indulgences;
