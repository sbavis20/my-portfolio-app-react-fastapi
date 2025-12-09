import { useState, useEffect } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaShieldAlt, FaUserSecret, FaLaptopCode } from 'react-icons/fa';
import { fetchExperiences } from '../api/api';

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const data = await fetchExperiences();
        setExperiences(data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false);
      }
    };

    loadExperiences();
  }, []);
  return (
    <section id="experience" className="py-20 bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-2 text-center text-green-300">
          Professional Journey
        </h2>
        <h3 className="text-xl font-medium mb-12 text-center text-gray-300">
          Security Expertise Timeline
        </h3>

        <VerticalTimeline layout="1-column-left" lineColor="#10b981">
          {experiences.map((exp, index) => (
            exp.experience.map((item, i) => (
              <VerticalTimelineElement
                key={`${index}-${i}`}
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: 'rgba(17, 24, 39, 0.7)',
                  borderTop: `4px solid ${item.type === 'Contract' ? '#3b82f6' : item.type === 'Research/Academic' ? '#8b5cf6' : '#10b981'}`,
                  boxShadow: '0 4px 20px rgba(16, 185, 129, 0.15)',
                  backdropFilter: 'blur(8px)'
                }}
                contentArrowStyle={{ borderRight: '7px solid rgba(17, 24, 39, 0.7)' }}
                date={item.date}
                dateClassName={item.type === 'Contract' ? 'text-blue-300' : item.type === 'Research/Academic' ? 'text-purple-300' : 'text-green-300'}
                iconStyle={{
                  background: item.type === 'Contract' ? '#3b82f6' : item.type === 'Research/Academic' ? '#8b5cf6' : '#10b981',
                  color: '#fff'
                }}
                icon={item.icon === 'FaUserSecret' ? <FaUserSecret /> : item.icon === 'FaLaptopCode' ? <FaLaptopCode /> : <FaShieldAlt />}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white">{item.company}</h3>
                    <h4 className={`text-lg font-semibold ${item.type === 'Contract' ? 'text-blue-300' : item.type === 'Research/Academic' ? 'text-purple-300' : 'text-green-300'}`}>
                      {item.role}
                    </h4>
                  </div>
                  {item.tags && item.tags.includes("Current Role") && (
                    <span className="bg-green-900/50 text-green-300 px-3 py-1 rounded-full text-sm">
                      Current Role
                    </span>
                  )}
                </div>

                <div className="mt-4 space-y-4">
                  {Object.entries(item.highlights).map(([category, points], idx) => (
                    <div key={idx}>
                      <h5 className="font-bold text-gray-100">{category}</h5>
                      <ul className="mt-1 ml-4 space-y-1 text-gray-300">
                        {points.map((point, pIdx) => (
                          <li key={pIdx} className="relative pl-4 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-green-400 before:rounded-full">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </VerticalTimelineElement>
            ))
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
}
