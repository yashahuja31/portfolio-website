import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const About = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const education = [
    {
      title: "Bachelor of Technology in Computer Science and Engineering",
      institution: "Guru Gobind Singh Indraprastha University",
      location: "New Delhi, India",
      date: "2023 - Present",
      gpa: "8.696/10.0",
      icon: "🎓",
    },
    {
      title: "CBSE (12th Standard)",
      institution: "The Indian School, Sadiq Nagar",
      location: "New Delhi, India",
      date: "2022-2023",
      gpa: "91%",
      icon: "🏫",
    },
    {
      title: "CBSE (10th Standard)",
      institution: "The Indian School, Sadiq Nagar",
      location: "New Delhi, India",
      date: "2020-2021",
      gpa: "92.4%",
      icon: "🏫",
    }
  ];

  const activities = [
    {
      title: "Web Development Intern",
      organization: "Tech Ad Solution",
      date: "Jun 2023 - Aug 2023",
      description: "Developed responsive web applications and implemented frontend solutions using modern JavaScript frameworks and libraries.",
      icon: "💼",
    },
    {
      title: "Technical Team Member",
      organization: "Google Developer Student Club (GDSC), ADGIPS",
      date: "Oct 2023 - Present",
      description: "Contributed to multiple projects and served as a core team member for the \"Hack-n-Chill\" hackathon, fostering rapid prototyping.",
      icon: "💻",
    },
    {
      title: "Participant (Pre Final Round)",
      organization: "Smart India Hackathon (SIH'23)",
      date: "2023",
      description: "Engaged in intense development cycles, reinforcing problem-solving skills under pressure.",
      icon: "🚀",
    },
    {
      title: "Member",
      organization: "Robogyan Society",
      date: "Dec 2023 - Present",
      description: "Actively involved in technical projects, applying engineering principles.",
      icon: "🤖",
    }
  ];

  return (
    <>
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : -20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-white font-serif font-bold text-[40px] sm:text-[50px] md:text-[60px]">
            About <span className="neon-text">Me</span>
          </h2>
          <p className="text-secondary text-[17px] max-w-3xl mt-4 leading-[30px]">
            Highly motivated Computer Science Engineering student with hands-on experience in full-stack development, 
            data management, and API integration. Proven ability to build scalable web applications and optimize code 
            for efficiency, eager to contribute to innovative AI-driven solutions in a dynamic startup environment.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isMounted ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glassmorphism p-6 sm:p-8 rounded-2xl w-full max-w-3xl mb-12"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-32 h-32 rounded-full bg-tertiary flex items-center justify-center text-5xl">
              YA
            </div>
            <div>
              <h3 className="text-white text-[24px] font-bold">Yash Ahuja</h3>
              <p className="text-secondary text-[16px] mt-1">Full-stack Developer | AI Enthusiast</p>
              
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:ahujayash460@gmail.com" className="text-white hover:text-neon transition-colors">ahujayash460@gmail.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-white">+91 9650083563</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <div className="flex gap-3">
                    <a href="https://www.linkedin.com/in/yash-ahuja-610851274/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neon transition-colors">LinkedIn</a>
                    <span className="text-secondary">|</span>
                    <a href="https://github.com/yashahuja31" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neon transition-colors">GitHub</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-16">
        <h3 className="text-white font-serif font-bold text-[30px] mb-10 text-center">
          Education
        </h3>
        <VerticalTimeline lineColor="rgba(170, 166, 195, 0.3)">
          {education.map((item, index) => (
            <VerticalTimelineElement
              key={index}
              contentStyle={{ background: 'rgba(21, 16, 48, 0.7)', color: '#fff', borderRadius: '15px' }}
              contentArrowStyle={{ borderRight: '7px solid rgba(21, 16, 48, 0.7)' }}
              date={item.date}
              iconStyle={{ background: '#151030', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              icon={<div className="flex justify-center items-center w-full h-full">{item.icon}</div>}
            >
              <h3 className="text-white text-[20px] font-bold">{item.title}</h3>
              <h4 className="text-secondary text-[16px]">{item.institution}</h4>
              <p className="text-secondary text-[14px]">{item.location}</p>
              <p className="text-neon text-[14px] mt-2">{item.gpa}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>

      <div className="mt-16">
        <h3 className="text-white font-serif font-bold text-[30px] mb-10 text-center">
          Academic & Extracurricular Activities
        </h3>
        <VerticalTimeline lineColor="rgba(170, 166, 195, 0.3)">
          {activities.map((item, index) => (
            <VerticalTimelineElement
              key={index}
              contentStyle={{ background: 'rgba(21, 16, 48, 0.7)', color: '#fff', borderRadius: '15px' }}
              contentArrowStyle={{ borderRight: '7px solid rgba(21, 16, 48, 0.7)' }}
              date={item.date}
              iconStyle={{ background: '#151030', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              icon={<div className="flex justify-center items-center w-full h-full">{item.icon}</div>}
            >
              <h3 className="text-white text-[20px] font-bold">{item.title}</h3>
              <h4 className="text-secondary text-[16px]">{item.organization}</h4>
              <p className="text-white text-[14px] mt-2">{item.description}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>

      <div className="mt-16">
        <h3 className="text-white font-serif font-bold text-[30px] mb-6 text-center">
          Interests
        </h3>
        <div className="glassmorphism p-6 rounded-2xl">
          <p className="text-white text-[16px] leading-[28px]">
            Passionate about distributed computing, machine learning, and natural language processing,
            with a keen interest in optimizing code for efficiency and building resilient, impactful
            technology.
          </p>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");