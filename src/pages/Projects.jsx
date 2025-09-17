import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import SectionWrapper from '../components/SectionWrapper';
import { projects } from '../constants';

const Projects = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : -20 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-white font-serif font-bold text-[40px] sm:text-[50px] md:text-[60px]">
          My <span className="neon-text">Projects</span>
        </h2>
        <p className="text-secondary text-[17px] max-w-3xl mx-auto mt-4 leading-[30px]">
          The following projects showcase my skills and experience through real-world examples of my work.
          Each project is briefly described with links to code repositories and live demos.
          They reflect my ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </p>
      </motion.div>

      <div className="mt-20 flex flex-wrap gap-7 justify-center">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: isMounted ? 1 : 0, 
              y: isMounted ? 0 : 50 
            }}
            transition={{ 
              duration: 0.5,
              delay: index * 0.2
            }}
          >
            <ProjectCard 
              project={project}
              onOpenModal={handleOpenModal}
            />
          </motion.div>
        ))}
      </div>

      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default SectionWrapper(Projects, "projects");