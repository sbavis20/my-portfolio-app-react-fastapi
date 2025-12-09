import { useState, useEffect } from 'react';
import { FaTrophy, FaMedal, FaGraduationCap, FaFileAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { fetchAchievements } from '../api/api';

const ResearchAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        const data = await fetchAchievements();
        console.log('Fetched Achievements:', data);

        // Map icons
        const iconMap = {
          'FaFileAlt': <FaFileAlt className="text-blue-500 text-3xl" />,
          'FaMedal': <FaMedal className="text-yellow-500 text-3xl" />,
          'FaGraduationCap': <FaGraduationCap className="text-purple-500 text-3xl" />,
          'FaTrophy': <FaTrophy className="text-green-500 text-3xl" />
        };

        const processedData = data.map(item => ({
          ...item,
          icon: iconMap[item.icon] || <FaTrophy className="text-gray-500 text-3xl" />
        }));

        setAchievements(processedData);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAchievements();
  }, []);

  return (
    <section id="accomplishments" className="py-20 bg-gray-800">
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-4">
              Accomplishments
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Recognized contributions and accomplishments in computer science and engineering
            </p>
          </motion.div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 hover:border-cyan-400/30 transition-all"
              >
                <div className="flex items-start">
                  <div className="mr-6">
                    <div className="p-3 bg-gray-700 rounded-full">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <span className="ml-auto text-sm bg-gray-700 px-3 py-1 rounded-full">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-gray-300">{item.description}</p>
                    <span className="inline-block mt-3 px-3 py-1 text-xs bg-gray-700 rounded-full">
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>


        </div>
      </div></section>
  );
};

export default ResearchAchievements;
