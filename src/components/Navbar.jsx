import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
            <h1 className='text-white text-[24px] font-serif font-bold cursor-pointer flex'>
              Yash&nbsp;<span className='neon-text'>Ahuja</span>
            </h1>
          </motion.div>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? 'text-neon' : 'text-secondary'
              } hover:text-neon text-[18px] font-medium cursor-pointer transition-colors duration-200`}
              onClick={() => setActive(nav.title)}
            >
              <Link to={nav.path}>{nav.title}</Link>
            </li>
          ))}
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
            </ul>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};