import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import SkillSphere from '../components/canvas/SkillSphere';
import { skills } from '../constants';

const SkillCategory = ({ category, index, isMounted }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isMounted ? 1 : 0, 
        y: isMounted ? 0 : 20 
      }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.2 + 0.5
      }}
      className="mb-10"
    >
      <h3 className="text-white text-[24px] font-bold mb-4">{category.name}</h3>
      <div className="flex flex-wrap gap-4">
        {category.items.map((skill, skillIndex) => (
          <motion.div
            key={skillIndex}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-tertiary rounded-lg p-4 flex flex-col items-center justify-center w-[100px] h-[100px] transition-all hover:shadow-card"
          >
            <img 
              src={skill.icon} 
              alt={skill.name} 
              className="w-12 h-12 object-contain mb-2"
            />
            <p className="text-white text-[14px] text-center">{skill.name}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('visual');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : -20 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-white font-serif font-bold text-[40px] sm:text-[50px] md:text-[60px]">
          My <span className="neon-text">Skills</span>
        </h2>
        <p className="text-secondary text-[17px] max-w-3xl mx-auto mt-4 leading-[30px]">
          I've worked with a range of technologies in the web development world.
          From backend to frontend, databases to deployment, I enjoy exploring new tools and frameworks.
        </p>
      </motion.div>

      <div className="flex justify-center mb-8">
        <div className="bg-tertiary rounded-full p-1 flex">
          <button
            className={`px-6 py-2 rounded-full transition-all ${
              activeTab === 'visual' ? 'bg-primary text-white' : 'text-secondary'
            }`}
            onClick={() => setActiveTab('visual')}
          >
            3D View
          </button>
          <button
            className={`px-6 py-2 rounded-full transition-all ${
              activeTab === 'list' ? 'bg-primary text-white' : 'text-secondary'
            }`}
            onClick={() => setActiveTab('list')}
          >
            List View
          </button>
        </div>
      </div>

      {activeTab === 'visual' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isMounted ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="h-[500px] w-full bg-tertiary rounded-2xl overflow-hidden"
        >
          <SkillSphere skillItems={skills} />
        </motion.div>
      ) : (
        <div className="mt-10">
          {skills.map((category, index) => (
            <SkillCategory 
              key={index}
              category={category}
              index={index}
              isMounted={isMounted}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default SectionWrapper(Skills, "skills");