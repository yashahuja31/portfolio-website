import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StarsCanvas from '../components/canvas/Stars';
import ComputersCanvas from '../components/canvas/Computers';

export const Home = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      <StarsCanvas />
      
      <div className="absolute inset-0 top-[120px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-start gap-5">
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-neon" />
          <div className="w-1 sm:h-80 h-40 neon-gradient" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: isMounted ? 1 : 0, x: isMounted ? 0 : -50 }}
          transition={{ duration: 1 }}
          className="z-10"
        >
          <h1 className="font-serif font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2">
            Hi, I'm <span className="neon-text">Yash</span>
          </h1>
          <p className="text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2 max-w-3xl">
            Full-stack Developer with expertise in <br className="sm:block hidden" />
            React.js, Node.js, and AI integration.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <Link to="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
              >
                View Projects
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent py-3 px-8 rounded-xl outline-none w-fit text-white font-bold border border-neon shadow-md shadow-primary"
              >
                Contact Me
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>

      <div className="absolute bottom-0 w-full h-[50%] z-0">
        <ComputersCanvas />
      </div>
    </section>
  );
};

export default Home;