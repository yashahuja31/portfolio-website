import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

export const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle('light-theme');
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    {
      id: 'home',
      title: 'Home',
      path: '/'
    },
    {
      id: 'about',
      title: 'About',
      path: '/about'
    },
    {
      id: 'projects',
      title: 'Projects',
      path: '/projects'
    },
    {
      id: 'skills',
      title: 'Skills',
      path: '/skills'
    },
    {
      id: 'contact',
      title: 'Contact',
      path: '/contact'
    }
  ];

  return (
    <nav
      className={`${
        scrolled ? 'bg-primary/80 backdrop-blur-md' : 'bg-transparent'
      } w-full flex items-center py-5 fixed top-0 z-20 transition-all duration-300`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={`${scrolled ? 'text-primary-text' : 'text-white'} text-[24px] font-serif font-bold cursor-pointer flex`}>
              Yash&nbsp;<span className='neon-text'>Ahuja</span>
            </h1>
          </motion.div>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-10 items-center'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title 
                  ? 'text-neon' 
                  : scrolled 
                    ? 'text-primary-text' 
                    : 'text-secondary'
              } hover:text-neon text-[18px] font-medium cursor-pointer transition-colors duration-200`}
              onClick={() => setActive(nav.title)}
            >
              <Link to={nav.path}>{nav.title}</Link>
            </li>
          ))}
          <li>
            <motion.div 
              className={`w-14 h-7 rounded-full p-1 flex items-center cursor-grab active:cursor-grabbing ${isDarkTheme ? 'bg-gray-700' : 'bg-yellow-300'}`}
              onClick={toggleTheme}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className={`w-5 h-5 rounded-full flex items-center justify-center ${isDarkTheme ? 'bg-white text-gray-800' : 'bg-yellow-500 text-white'}`}
                animate={{ x: isDarkTheme ? 0 : 28 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {isDarkTheme ? <FaMoon size={12} /> : <FaSun size={12} />}
              </motion.div>
            </motion.div>
          </li>
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <div
            className='w-[28px] h-[28px] cursor-pointer z-20 flex flex-col justify-between'
            onClick={() => setToggle(!toggle)}
          >
            <span className={`h-0.5 bg-white transition-all duration-300 ${toggle ? 'rotate-45 translate-y-[9px]' : ''}`}></span>
            <span className={`h-0.5 bg-white transition-all duration-300 ${toggle ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`h-0.5 bg-white transition-all duration-300 ${toggle ? '-rotate-45 -translate-y-[9px]' : ''}`}></span>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: toggle ? 1 : 0,
              scale: toggle ? 1 : 0.95
            }}
            transition={{ duration: 0.2 }}
            className={`${
              !toggle ? 'hidden' : 'flex'
            } p-6 glassmorphism absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? 'text-neon' : 'text-secondary'
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <Link to={nav.path}>{nav.title}</Link>
                </li>
              ))}
              <li className="flex items-center mt-2">
                <span className="text-secondary mr-2 text-[14px]">Theme:</span>
                <motion.div 
                  className={`w-12 h-6 rounded-full p-1 flex items-center cursor-grab active:cursor-grabbing ${isDarkTheme ? 'bg-gray-700' : 'bg-yellow-300'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTheme();
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${isDarkTheme ? 'bg-white text-gray-800' : 'bg-yellow-500 text-white'}`}
                    animate={{ x: isDarkTheme ? 0 : 24 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {isDarkTheme ? <FaMoon size={10} /> : <FaSun size={10} />}
                  </motion.div>
                </motion.div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};