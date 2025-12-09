import { useState, useEffect } from 'react';
import { FiCode, FiShield, FiTool, FiLock, FiCpu, FiServer, FiDatabase } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { fetchSkills } from '../api/api';

export default function Skills() {
  const [skillCategories, setSkillCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await fetchSkills();

        // Group skills by category
        const groupedSkills = data.reduce((acc, skill) => {
          const category = skill.category;
          if (!acc[category]) {
            acc[category] = {
              title: category,
              skills: []
            };
          }
          acc[category].skills.push(skill);
          return acc;
        }, {});

        // Helper to get icon for category
        const getIcon = (title) => {
          if (title.includes('Programming')) return <FiCode className="text-blue-400" size={24} />;
          if (title.includes('Offensive')) return <FiShield className="text-red-400" size={24} />;
          if (title.includes('Tools')) return <FiTool className="text-green-400" size={24} />;
          if (title.includes('Algorithms')) return <FiCpu className="text-yellow-400" size={24} />;
          if (title.includes('Databases')) return <FiDatabase className="text-teal-400" size={24} />;
          if (title.includes('Cloud')) return <FiServer className="text-orange-400" size={24} />;
          if (title.includes('Defensive')) return <FiLock className="text-purple-400" size={24} />;
          return <FiCode className="text-gray-400" size={24} />;
        };

        const processedData = Object.values(groupedSkills).map(category => ({
          ...category,
          icon: getIcon(category.title)
        }));

        setSkillCategories(processedData);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-green-400 mb-4 tracking-tight">
            Technical Expertise
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Cutting-edge skills honed through real-world projects and offensive security research
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-800/70 border border-gray-700 rounded-xl shadow-lg hover:shadow-green-500/20 hover:border-green-400/50 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="p-6 border-b border-gray-700 flex items-center">
                <div className="mr-4 p-3 bg-gray-900 rounded-full shadow-inner">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-100">{category.title}</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <li key={skillIndex}>
                      <h4 className="font-medium text-gray-100">{skill.name}</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skill.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs bg-green-500/20 text-green-300 px-2.5 py-1 rounded-full border border-green-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-200">Additional Technologies</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              "Docker", "Git", "PowerShell", "Linux Shell", "Visual Studio Code", "GitHub Actions",
              "Makefile", "tmux", "Netcat", "curl / wget", "Vim", "GDB", "Terraform", "Cloud SDK (gcloud / aws-cli)"
            ].map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.1, backgroundColor: "#10B981" }}
                className="px-4 py-2 bg-gray-800 rounded-full border border-gray-700 text-sm text-gray-200 hover:text-white transition-colors duration-200"
              >
                {tool}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
