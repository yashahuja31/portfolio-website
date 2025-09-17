import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const mouseDown = () => setIsClicking(true);
    const mouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Add event listeners for cursor variants
    const updateCursorVariants = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .interactive');
      
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => setCursorVariant('hover'));
        element.addEventListener('mouseleave', () => setCursorVariant('default'));
      });
    };

    // Initial setup
    updateCursorVariants();

    // Setup MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      updateCursorVariants();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      document.body.style.cursor = 'auto';
      observer.disconnect();
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      backgroundColor: '#64ffda',
      mixBlendMode: 'difference',
      opacity: 0.8,
      scale: isClicking ? 0.8 : 1
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: '#64ffda',
      mixBlendMode: 'difference',
      opacity: 0.6,
      scale: isClicking ? 0.9 : 1
    }
  };

  const outlineVariants = {
    default: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      borderColor: 'rgba(100, 255, 218, 0.5)',
      opacity: 0.5,
      scale: isClicking ? 0.8 : 1
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      borderColor: 'rgba(100, 255, 218, 0.8)',
      opacity: 0.8,
      scale: isClicking ? 0.9 : 1
    }
  };

  const trailVariants = {
    default: {
      opacity: [0, 0.3, 0],
      scale: [0.8, 1.2, 0],
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <motion.div
        className="custom-cursor cursor-dot fixed top-0 left-0 rounded-full pointer-events-none z-50"
        variants={variants}
        animate={cursorVariant}
        transition={{ 
          type: 'spring', 
          stiffness: 500, 
          damping: 28,
          opacity: { duration: 0.2 }
        }}
      />
      <motion.div
        className="custom-cursor cursor-outline fixed top-0 left-0 rounded-full border-2 pointer-events-none z-50"
        variants={outlineVariants}
        animate={cursorVariant}
        transition={{ 
          type: 'spring', 
          stiffness: 400, 
          damping: 35, 
          delay: 0.03,
          opacity: { duration: 0.2 }
        }}
      />
      <motion.div
        className="cursor-trail fixed top-0 left-0 rounded-full pointer-events-none z-40 bg-primary-light opacity-0"
        initial={{ x: mousePosition.x - 16, y: mousePosition.y - 16, width: 32, height: 32 }}
        animate={{ 
          x: mousePosition.x - 16, 
          y: mousePosition.y - 16,
          ...trailVariants.default
        }}
        transition={{ 
          x: { type: 'spring', stiffness: 500, damping: 28 },
          y: { type: 'spring', stiffness: 500, damping: 28 }
        }}
      />
    </>
  );
};