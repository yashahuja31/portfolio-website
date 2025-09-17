import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="glassmorphism max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-white text-2xl sm:text-3xl font-bold">{project.title}</h2>
              <button 
                onClick={onClose}
                className="text-white hover:text-neon transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img 
                  src={project.image || 'https://via.placeholder.com/600x400?text=Project+Image'} 
                  alt={project.title}
                  className="w-full h-auto rounded-lg"
                />
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags && project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="bg-tertiary px-3 py-1 rounded-full text-sm text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="mt-6 flex gap-4">
                  {project.source_code_link && (
                    <a
                      href={project.source_code_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-tertiary hover:bg-neon hover:text-black transition-colors px-4 py-2 rounded-lg text-white flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                      </svg>
                      Source Code
                    </a>
                  )}
                  
                  {project.live_demo_link && (
                    <a
                      href={project.live_demo_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-tertiary hover:bg-neon hover:text-black transition-colors px-4 py-2 rounded-lg text-white flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                        <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-white text-xl font-bold mb-3">Project Overview</h3>
                <p className="text-secondary mb-6 leading-relaxed">
                  {project.longDescription || project.description}
                </p>
                
                {project.features && (
                  <>
                    <h3 className="text-white text-xl font-bold mb-3">Key Features</h3>
                    <ul className="list-disc pl-5 text-secondary space-y-2 mb-6">
                      {project.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </>
                )}
                
                {project.technologies && (
                  <>
                    <h3 className="text-white text-xl font-bold mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="bg-black-100 px-3 py-1 rounded-full text-sm text-neon"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </>
                )}
                
                {project.challenges && (
                  <>
                    <h3 className="text-white text-xl font-bold mb-3">Challenges & Solutions</h3>
                    <p className="text-secondary leading-relaxed">
                      {project.challenges}
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};