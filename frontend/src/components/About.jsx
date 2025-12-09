import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaLock, FaCode, FaNetworkWired, FaChartLine, FaAdn } from 'react-icons/fa';
import { fetchContact } from '../api/api';
import { useSpring, animated, useTrail } from '@react-spring/web';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import profilepic from "../assets/imgs/profile-pic.jpg";
const About = () => {
  // Animation for profile photo
  const photoSpring = useSpring({
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
    config: { tension: 200, friction: 20 },
  });

  // Animation for content
  const contentSpring = useSpring({
    from: { opacity: 0, transform: 'translateX(50px)' },
    to: { opacity: 1, transform: 'translateX(0px)' },
    config: { tension: 180, friction: 18 },
    delay: 200,
  });

  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const loadContact = async () => {
      try {
        const data = await fetchContact();

        // Map icons
        const iconMap = {
          'FaGithub': <FaGithub className="text-xl" />,
          'FaLinkedin': <FaLinkedin className="text-xl" />,
          'FaEnvelope': <FaEnvelope className="text-xl" />
        };

        const processedData = data.map(item => ({
          ...item,
          icon: iconMap[item.icon] || <FaEnvelope className="text-xl" />
        }));

        setSocialLinks(processedData);
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };

    fetchContact();
  }, []);

  // Trail animation for social links
  const socialTrail = useTrail(socialLinks.length, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 60 },
    delay: 400,
  });

  // Skills highlights data (Pentesting + DSA mix)
  const skills = [
    { name: 'Web App Pentesting', icon: <FaLock className="text-2xl text-cyan-400" /> },
    { name: 'Network Exploitation', icon: <FaNetworkWired className="text-2xl text-green-400" /> },
    { name: 'AI Security', icon: <FaAdn className="text-2xl text-green-400" /> },
    { name: 'DSA', icon: <FaAdn className="text-2xl text-purple-400" /> },
    { name: 'OOPs', icon: <FaChartLine className="text-2xl text-yellow-400" /> },
  ];

  // Trail animation for skills
  const skillsTrail = useTrail(skills.length, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 60 },
    delay: 600,
  });

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Profile Photo */}
          <animated.div
            style={photoSpring}
            className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0 group"
          >
            <div className="relative rounded-full overflow-hidden border-4 border-cyan-400/50 p-1 bg-gray-800/30 backdrop-blur-sm transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-cyan-400/20">
              <img
                src={profilepic}
                alt="Profile Photo"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
            </div>
          </animated.div>

          {/* About Content */}
          <animated.div style={contentSpring} className="flex-1">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-cyan-400 mb-4 tracking-tight">
              About Me
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              <span className="font-semibold">
                I secure systems and solve complex problems as a cybersecurity expert and full-stack developer.
              </span>{' '}
              With an MTech focused on side-channel attack detection, I blend offensive security, robust coding, and innovative research to deliver scalable, secure solutions. My passion lies in tackling intricate challenges with precision and creativity.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4">
              {socialTrail.map((style, index) => {
                const link = socialLinks[index];
                const [linkSpring, linkApi] = useSpring(() => ({
                  scale: 1,
                  config: { tension: 300, friction: 20 },
                }));

                return (
                  <Tooltip
                    key={link.name}
                    title={link.ariaLabel}
                    placement="top"
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <animated.a
                      style={{ ...style, ...linkSpring }}
                      onMouseEnter={() => linkApi.start({ scale: 1.05 })}
                      onMouseLeave={() => linkApi.start({ scale: 1 })}
                      href={link.href}
                      target={link.name !== 'Email' ? '_blank' : undefined}
                      rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 hover:text-cyan-300 hover:border-cyan-400/50 transition-colors duration-200 backdrop-blur-sm"
                      aria-label={link.ariaLabel}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </animated.a>
                  </Tooltip>
                );
              })}
            </div>
          </animated.div>
        </div>

        {/* Skills Highlights */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-gray-200 text-center mb-8">
            Core Expertise
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skillsTrail.map((style, index) => {
              const skill = skills[index];
              const [skillSpring, skillApi] = useSpring(() => ({
                scale: 1,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                config: { tension: 300, friction: 20 },
              }));

              return (
                <animated.div
                  key={index}
                  style={{ ...style, ...skillSpring }}
                  onMouseEnter={() =>
                    skillApi.start({
                      scale: 1.05,
                      boxShadow: '0 8px 16px rgba(34, 197, 94, 0.2)',
                    })
                  }
                  onMouseLeave={() =>
                    skillApi.start({
                      scale: 1,
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    })
                  }
                  className="bg-gray-800/70 p-4 rounded-lg border border-gray-700 text-center hover:border-cyan-400/50 transition-colors duration-200 backdrop-blur-sm"
                >
                  <span className="block mb-2">{skill.icon}</span>
                  <h3 className="font-medium text-gray-200">{skill.name}</h3>
                </animated.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
