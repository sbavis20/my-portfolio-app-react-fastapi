import { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import nitclogo from "../assets/imgs/nitc_logo.png";
import suplogo from "../assets/imgs/SUP_logo.png";
import educationLottie from "../assets/imgs/book.json";
import { fetchEducation } from '../api/api';

export default function Education() {
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEducation = async () => {
      try {
        const data = await fetchEducation();

        // Map logos (assuming logos are served from assets or URLs)
        // For now, we'll use the imported logos based on institute name
        const processedData = data.map(edu => ({
          ...edu,
          logo: edu.institute.includes('Calicut') ? nitclogo : suplogo
        }));

        setEducationData(processedData);
      } catch (error) {
        console.error('Error fetching education:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEducation();
  }, []);
  return (
    <section id="education" className="py-20 bg-gradient-to-b from-gray-900 to-gray-950 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <Lottie animationData={educationLottie} loop={true} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500 mb-3">
            Academic Journey
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-600 mx-auto"></div>
        </div>

        <VerticalTimeline
          lineColor="#10c453"
          layout="1-column-left"
          className="vertical-timeline-custom-line"
        >
          {educationData.map((edu, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--education"
              contentStyle={{
                background: 'rgba(31, 41, 55, 0.7)',
                color: '#fff',
                border: '1px solid rgba(16, 196, 83, 0.3)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(16, 196, 83, 0.15)',
                borderRadius: '12px'
              }}
              contentArrowStyle={{
                borderRight: '7px solid rgba(31, 41, 55, 0.7)'
              }}
              date={edu.years}
              dateClassName="text-emerald-300"
              iconStyle={{
                background: '#10c453',
                boxShadow: '0 0 0 4px rgba(16, 196, 83, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              icon={
                <div className="w-full h-full flex items-center justify-center p-1">
                  <img
                    src={edu.logo}
                    alt={edu.institute}
                    className="w-full h-full object-contain bg-white rounded-sm p-0.5"
                  />
                </div>
              }
            >
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white">{edu.institute}</h3>
                    <p className="text-emerald-300 text-sm">{edu.course}</p>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2 py-1 rounded-full">
                    {edu.degree}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-300">
                  <span className="mr-2">CGPA: {edu.cgpa}</span>
                </div>

                <ul className="mt-2 space-y-1.5">
                  {edu.highlights.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-emerald-400 mr-2">•</span>
                      <span className="text-gray-300 text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </VerticalTimelineElement>
          ))}

          <VerticalTimelineElement
            iconStyle={{
              background: '#10c453',
              color: '#fff',
              boxShadow: '0 0 0 4px rgba(16, 196, 83, 0.3)'
            }}
            iconClassName="hover:scale-110 transition-transform"
          />
        </VerticalTimeline>
      </div>
    </section>
  );
}
