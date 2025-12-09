import { useState, useEffect } from 'react';
import Oneko from "./components/Oneko";
import Navbar from './components/NavBar';
import Header from './components/Header';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import About from './components/About';
import Accomplishments from './components/Accomplishments';
import Publications from './components/Publications';

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gray-900 text-white">
        <Oneko /> {/* 🐾 This will start the Oneko animation */}
      {/* Floating Navbar */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <Navbar />

      </div>

      {/* Header Section - Full viewport height */}
      <section id="home" className="relative pt-16"> {/* pt-16 matches navbar height */}
        <Header />
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Experience />
        </div>
      </section>

          {/* Education Section */}
          <section id="education" className="min-h-screen bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Education />
        </div>
      </section>

         {/* Skills Section */}
          <section id="skills" className="min-h-screen bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skills />
        </div>
      </section>

          {/* Projects Section */}
          <section id="proj" className="min-h-screen bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Projects />
        </div>
      </section>

        {/* Certifications Section */}
          <section id="certi" className="min-h-screen bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Certifications />
        </div>
      </section>

              {/* Accomplishments Section */}
          <section id="accom" className="min-h-screen bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Accomplishments />
        </div>
      </section>


              {/* Publications Section */}
          <section id="publ" className="min-h-screen bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Publications />
        </div>
      </section>

      {/* About Section */}
          <section id="about" className="min-h-screen bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <About />
        </div>
      </section>

    </div>
  );
}
