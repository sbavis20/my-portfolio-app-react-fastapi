import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip';
import { fetchPublications } from '../api/api';

const Research = () => {
  const [publications, setPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPublications = async () => {
      try {
        const data = await fetchPublications();
        setPublications(data);
      } catch (error) {
        console.error('Error fetching publications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPublications();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <section
      id="publications"
      className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 text-white min-h-[600px]"
      itemScope
      itemType="http://schema.org/ItemList"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4"
            itemProp="name"
          >
            Research & Publications
          </h2>
          <p className="text-lg text-gray-300 dark:text-gray-200 max-w-2xl mx-auto">
            Explore our peer-reviewed contributions in cybersecurity and high-performance computing
          </p>
        </motion.div>

        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array(3)
                .fill()
                .map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 animate-pulse"
                    role="status"
                    aria-label="Loading publication"
                  >
                    <div className="space-y-4">
                      <div className="h-6 bg-gray-700/50 rounded w-3/4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-700/50 rounded w-full"></div>
                        <div className="h-4 bg-gray-700/50 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-700/50 rounded w-2/3"></div>
                      </div>
                      <div className="h-4 bg-gray-700/50 rounded w-1/2"></div>
                    </div>
                  </div>
                ))
            ) : (
              publications.map((pub, index) => (
                <motion.div
                  key={pub.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                  itemProp="itemListElement"
                  itemScope
                  itemType="http://schema.org/ScholarlyArticle"
                >
                  <div
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 hover:border-cyan-500/50 rounded-lg p-6 transition-colors duration-300"
                    role="article"
                    aria-labelledby={`publication-title-${pub.id}`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <h3
                          id={`publication-title-${pub.id}`}
                          className="text-xl font-semibold text-cyan-300 line-clamp-2"
                          itemProp="headline"
                        >
                          {pub.title}
                        </h3>
                        <span
                          className="text-xs bg-cyan-500/20 text-cyan-200 px-2 py-1 rounded-full"
                          aria-label={`Publication type: ${pub.type}`}
                        >
                          {pub.type}
                        </span>
                      </div>
                      <div className="text-sm text-gray-300 dark:text-gray-200 space-y-2">
                        <p itemProp="author">
                          <strong>Authors:</strong> {pub.authors}
                        </p>
                        <div itemProp="publisher">
                          <p>
                            <strong>Publisher:</strong> {pub.publisher}
                          </p>
                          <p>
                            <strong>Conference:</strong> {pub.conference}
                          </p>
                          <p>
                            <strong>Year:</strong> {pub.year}
                          </p>
                        </div>
                        <p itemProp="identifier">
                          <strong>DOI:</strong> {pub.doi}
                        </p>
                      </div>
                      <Tooltip title="Access Publication" arrow>
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                          itemProp="url"
                          aria-label={`View publication: ${pub.title}`}
                        >
                          View Paper <FaExternalLinkAlt size={14} />
                        </a>
                      </Tooltip>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Research;
