import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Small motion helpers
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};
const fade = { initial: { opacity: 0 }, animate: { opacity: 1 } };

export function AppExplain() {
  return (
    <div className="bg-white">
      <section className="bg-[#6642b3] to-[#584FFB] min-fit flex-col justify-around items-center text-white/80 px-16 lg:py-20">
        <div className=" flex flex-col gap-8 text-center xl:flex xl:flex-row xl:justify-between lg:px-40 lg:gap-2">
          <div className="flex flex-col text-center gap-8 justify-between items-center lg:text-left lg:justify-center lg:items-start lg:gap-8 lg:min-w-[50%]">
            <p className="mt-8 lg:mt-0 lg:text-lg ">What is Balance?</p>
            <h1 className="lg:!text-7xl">
              A HEALTH<br></br> TRACKER APP,<br></br> YOU NEVER<br></br>
              EXPERIENCED<br></br> BEFORE
            </h1>
            <p>
              Fully customized to your schedule.<br></br> Another perspective to
              view your wellbeing status.<br></br> Stay balanced.
            </p>

            <motion.div
              className="mt-4"
              {...fadeUp}
              transition={{ delay: 0.2 }}
            >
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
          </div>
          <img
            src="/irefusetocodethis.png"
            className="mb-8 relative xl:right-7 lg:overflow-hidden object-contain"
          ></img>
        </div>
      </section>
    </div>
  );
}
