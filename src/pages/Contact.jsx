import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter } from 'react-icons/fa';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // This would be replaced with an actual API call in production
      // For now, we'll simulate a successful API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 bg-tertiary p-8 rounded-2xl w-full max-w-2xl mx-auto"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-white font-medium">Your Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="What's your name?"
          required
          className="bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-white font-medium">Your Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="What's your email?"
          required
          className="bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-white font-medium">Your Message</label>
        <textarea
          name="message"
          id="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="What do you want to say?"
          required
          rows={7}
          className="bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`py-3 px-8 outline-none w-fit text-white font-bold shadow-md rounded-xl ${
          loading ? 'bg-gray-500' : 'bg-primary hover:bg-primary-dark'
        } transition-all`}
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>

      {success && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-500 font-medium"
        >
          Thank you! Your message has been sent successfully.
        </motion.p>
      )}

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 font-medium"
        >
          {error}
        </motion.p>
      )}
    </motion.form>
  );
};

const SocialLinks = ({ isMounted }) => {
  const socialLinks = [
    { icon: <FaGithub size={24} />, url: 'https://github.com/yashahuja31', label: 'GitHub' },
    { icon: <FaLinkedin size={24} />, url: 'https://www.linkedin.com/in/yash-ahuja-610851274/', label: 'LinkedIn' },
    { icon: <FaEnvelope size={24} />, url: 'mailto:ahujayash460@gmail.com', label: 'Email' },
    { icon: <FaTwitter size={24} />, url: 'https://x.com/ruineds0ul_', label: 'Twitter' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="flex justify-center gap-6 mt-10"
    >
      {socialLinks.map((link, index) => (
        <motion.a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full flex items-center justify-center bg-tertiary text-white hover:text-primary transition-all"
          aria-label={link.label}
        >
          {link.icon}
        </motion.a>
      ))}
    </motion.div>
  );
};

const Contact = () => {
  const [isMounted, setIsMounted] = useState(false);

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
          Get In <span className="neon-text">Touch</span>
        </h2>
        <p className="text-secondary text-[17px] max-w-3xl mx-auto mt-4 leading-[30px]">
          Have a project in mind? Looking to collaborate or hire me? Feel free to reach out using the form below or connect with me on social media.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isMounted ? 1 : 0, x: isMounted ? 0 : -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full md:w-1/2"
        >
          <div className="bg-tertiary rounded-2xl p-8 h-full">
            <h3 className="text-white text-[24px] font-bold mb-4">Contact Information</h3>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-secondary">Email</p>
                <a href="mailto:ahgujayash460@gmail.com" className="text-white hover:text-primary transition-all">
                  ahujayash460@gmail.com
                </a>
              </div>
              <div>
                <p className="text-secondary">Location</p>
                <p className="text-white">New Delhi, India</p>
              </div>
              <div>
                <p className="text-secondary">Available for</p>
                <p className="text-white">Freelance, Full-time opportunities</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="w-full md:w-1/2">
          <ContactForm />
        </div>
      </div>

      <SocialLinks isMounted={isMounted} />
    </>
  );
};

export default SectionWrapper(Contact, "contact");