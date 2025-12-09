import { useState, useEffect } from 'react';
import { FaShieldAlt, FaUserSecret, FaDatabase, FaTrophy, FaCode, FaCertificate, FaFilter, FaExternalLinkAlt } from 'react-icons/fa';
import { SiOpensourcehardware, SiPython } from 'react-icons/si';
import { useSpring, animated, useTrail } from '@react-spring/web';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { fetchCertifications } from '../api/api';

const CategoryButton = ({ category, activeFilter, onClick }) => {
  const buttonSpring = useSpring({
    scale: activeFilter === category ? 1.05 : 1,
    config: { tension: 300, friction: 20 },
  });

  return (
    <animated.button
      style={buttonSpring}
      onClick={() => onClick(category)}
      className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeFilter === category
        ? 'bg-cyan-600/20 border border-cyan-400/50 text-cyan-300 shadow-sm'
        : 'bg-gray-700/50 border border-gray-700 hover:bg-gray-700 text-gray-300'
        }`}
    >
      {category === 'All' ? <FaFilter className="mr-2" /> : null}
      {category}
    </animated.button>
  );
};

const CertificationCard = ({ cert, style, isExpanded, onToggle }) => {
  const [cardSpring, cardApi] = useSpring(() => ({
    scale: 1,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    config: { tension: 300, friction: 20 },
  }));

  const expandSpring = useSpring({
    height: isExpanded ? 'auto' : 0,
    opacity: isExpanded ? 1 : 0,
    overflow: 'hidden',
    config: { tension: 200, friction: 20 },
  });

  const buttonStyle = useSpring({
    backgroundColor: isExpanded ? '#1F2937' : '#111827',
    config: { tension: 300, friction: 20 },
  });

  const arrowStyle = useSpring({
    rotate: isExpanded ? 180 : 0,
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.div
      style={{ ...style, ...cardSpring }}
      onMouseEnter={() => cardApi.start({ scale: 1.03, boxShadow: '0 8px 16px rgba(34, 197, 94, 0.2)' })}
      onMouseLeave={() => cardApi.start({ scale: 1, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' })}
      className={`relative rounded-xl border bg-gray-800/70 backdrop-blur-sm ${cert.highlight
        ? 'border-cyan-400/50 shadow-lg'
        : 'border-gray-700'
        }`}
    >
      <div className="p-6">
        <div className="flex items-start">
          {/* Image/Icon Container */}
          <div className="mr-4 w-14 h-14 flex-shrink-0">
            {cert.image ? (
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-contain rounded"
              />
            ) : (
              <div className="w-full h-full bg-gray-700/30 rounded-lg flex items-center justify-center backdrop-blur-sm">
                {cert.icon}
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className={`font-semibold text-lg ${cert.highlight ? 'text-white' : 'text-gray-200'}`}>
                  {cert.title}
                </h3>
                <p className="text-sm mt-1 text-gray-400">
                  {cert.issuer} • {cert.date}
                </p>
              </div>
              <Tooltip
                title="View credential"
                placement="top"
                TransitionComponent={Zoom}
                arrow
              >
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <FaExternalLinkAlt className="ml-2" />
                </a>
              </Tooltip>
            </div>

            {cert.highlight && (
              <span className="inline-block mt-2 px-3 py-1 text-xs bg-cyan-900/30 text-cyan-300 rounded-full border border-cyan-400/20">
                Professional Certification
              </span>
            )}
          </div>
        </div>

        {/* Expandable Content */}
        <animated.div style={expandSpring}>
          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <p className="text-gray-300 text-sm">{cert.description}</p>
            <p className="text-xs text-gray-500 mt-2">{cert.fullName}</p>
          </div>
        </animated.div>
      </div>

      {/* Expand Button */}
      <animated.button
        style={buttonStyle}
        onClick={onToggle}
        className="w-full py-3 text-sm text-gray-400 hover:text-cyan-300 flex items-center justify-center gap-2 transition-colors duration-200"
      >
        {isExpanded ? 'Show Less' : 'Show Details'}
        <animated.span style={arrowStyle}>
          ▼
        </animated.span>
      </animated.button>
    </animated.div>
  );
};

export default function Certifications() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedCert, setExpandedCert] = useState(null);

  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCertifications = async () => {
      try {
        const data = await fetchCertifications();
        console.log('Fetched Certifications:', data);

        // Map icons
        const iconMap = {
          'FaShieldAlt': <FaShieldAlt className="text-green-400" />,
          'FaUserSecret': <FaUserSecret className="text-blue-400" />,
          'FaDatabase': <FaDatabase className="text-purple-400" />,
          'FaTrophy': <FaTrophy className="text-yellow-400" />,
          'FaCode': <FaCode className="text-red-400" />,
          'FaCertificate': <FaCertificate className="text-cyan-400" />,
          'SiOpensourcehardware': <SiOpensourcehardware className="text-cyan-400" />,
          'SiPython': <SiPython className="text-cyan-400" />
        };

        const processedData = data.map(cert => ({
          ...cert,
          icon: iconMap[cert.icon] || null
        }));

        setCertifications(processedData);
      } catch (error) {
        console.error('Error fetching certifications:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCertifications();
  }, []);

  const categories = ['All', ...new Set(certifications.map(cert => cert.category))];

  const filteredCerts = activeFilter === 'All'
    ? certifications
    : certifications.filter(cert => cert.category === activeFilter);

  // Trail animation for cards
  const trail = useTrail(filteredCerts.length, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 60 },
    delay: 100,
  });

  const toggleExpand = (index) => {
    setExpandedCert(expandedCert === index ? null : index);
  };

  return (
    <section id="certifications" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <animated.div
          style={useSpring({
            from: { opacity: 0, transform: 'translateY(-20px)' },
            to: { opacity: 1, transform: 'translateY(0px)' },
            config: { tension: 200, friction: 20 },
          })}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-cyan-400 mb-4 tracking-tight">
            Certifications
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Validated expertise and recognized accomplishments across multiple domains of technology
          </p>
        </animated.div>

        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <CategoryButton
              key={category}
              category={category}
              activeFilter={activeFilter}
              onClick={setActiveFilter}
            />
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trail.map((style, index) => (
            <CertificationCard
              key={filteredCerts[index]._id || index}
              cert={filteredCerts[index]}
              style={style}
              isExpanded={expandedCert === index}
              onToggle={() => toggleExpand(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
