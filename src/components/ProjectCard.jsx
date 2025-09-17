import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';

export const ProjectCard = ({ project, onOpenModal }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Tilt
      options={{
        max: 45,
        scale: 1,
        speed: 450,
      }}
      className="w-full sm:w-[360px]"
    >
      <motion.div
        className="project-card glassmorphism p-5 rounded-2xl h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -10 }}
      >
        <div className="relative w-full h-[230px] overflow-hidden rounded-2xl">
          <img
            src={project.image || 'https://via.placeholder.com/400x230?text=Project+Image'}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.7 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => onOpenModal(project)}
              className="px-4 py-2 bg-neon text-black font-bold rounded-lg"
            >
              View Details
            </button>
          </motion.div>
        </div>

        <div className="mt-5 flex flex-col flex-grow">
          <h3 className="text-white font-bold text-[24px]">{project.title}</h3>
          <p className="mt-2 text-secondary text-[14px] flex-grow">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <p key={tag} className="text-[14px] text-neon">
                #{tag}
              </p>
            ))}
          </div>

          <div className="mt-4 flex justify-between">
            {project.source_code_link && (
              <a
                href={project.source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-neon transition-colors flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                Code
              </a>
            )}
            {project.live_demo_link && (
              <a
                href={project.live_demo_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-neon transition-colors flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                  <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                </svg>
                Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};