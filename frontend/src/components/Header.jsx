import video from "../assets/video/video_12.mp4";
export default function Header() {
    return (
      <div className="inset-0 bg-gray-900 text-white pt-16 p-6 sm:p-8 md:p-12">
        {/* Content Container - Left Aligned */}
        <div className="max-w-4xl">
          {/* Terminal Prompt with Typing Animation */}
          <div className="text-gray-300 text-lg sm:text-xl mb-4">
            root@localhost:~# <span className="text-green-300 font-mono">whoami</span>
          </div>

          {/* Name with Typing Animation */}
          <div className="mb-6 overflow-hidden">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-left inline-block">
              <span className="typing-animation">Swapnil Baviskar</span>
              <span className="cursor-animation">|</span>
            </h1>
          </div>

          {/* Tagline - Left Aligned */}
          <p className="text-gray-300 text-lg sm:text-xl mb-8 text-left">
            Cyber Security Analyst
          </p>

          </div>

 {/* Video - right side */}
 <div className="absolute right-0 top-0 w-1/2 h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>

      </div>
    );
  }
