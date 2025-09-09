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
      className="w-full pt-24 pb-12 bg-gray-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Life has Indulgences.
            <br />
            We help you make Balance Moves.
          </h1>
        </div>

        {/* First Row - Right to Left */}
        <div className="mb-8">
          <motion.div
            className="flex gap-4 sm:gap-6 lg:gap-8 w-max"
            style={{ x: isInView ? firstRowX : 0 }}
            transition={{ type: "none" }}
          >
            {extendedFirstRow.map((item, index) => (
              <div key={`first-${item.id}-${index}`} className="flex gap-4 sm:gap-6 lg:gap-8">
                {/* Label Element */}
                <div className="flex-shrink-0 bg-white rounded-full border border-2 border-[#584FFB] flex items-center justify-center px-4 py-3 sm:px-8 sm:py-6 lg:px-12 lg:py-10 h-[4rem] sm:h-[5rem] lg:h-[7rem]">
                  <h4 className="text-[#584FFB] text-center whitespace-nowrap text-4xl sm:text-base lg:text-lg">
                    {item.text}
                  </h4>
                </div>
                {/* Image Element */}
                <div className="flex-shrink-0 w-[8rem] h-[4rem] sm:w-[12rem] sm:h-[5rem] lg:w-[20rem] lg:h-[7rem] rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
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
        <div className="mb-24">
          <motion.div
            className="flex gap-4 sm:gap-6 lg:gap-8 w-max"
            style={{ x: isInView ? secondRowX : 0 }}
            transition={{ type: "none" }}
          >
            {extendedSecondRow.map((item, index) => (
              <div key={`second-${item.id}-${index}`} className="flex gap-4 sm:gap-6 lg:gap-8">
                {/* Label Element */}
                <div className="flex-shrink-0 bg-white rounded-full border border-2 border-[#584FFB] flex items-center justify-center px-4 py-3 sm:px-8 sm:py-6 lg:px-12 lg:py-10 h-[4rem] sm:h-[5rem] lg:h-[7rem]">
                  <h4 className="text-[#584FFB] text-center whitespace-nowrap text-4xl sm:text-base lg:text-lg">
                    {item.text}
                  </h4>
                </div>
                {/* Image Element */}
                <div className="flex-shrink-0 w-[8rem] h-[4rem] sm:w-[12rem] sm:h-[5rem] lg:w-[20rem] lg:h-[7rem] rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
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

    
      </div>
    </div>
  );
};

export default Indulgences;
