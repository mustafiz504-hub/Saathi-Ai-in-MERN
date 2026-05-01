import React, { useEffect, useState } from "react";

const BotEyeAvatar = ({ mood = "idle", size = "w-12 h-12" }) => {
  const [isBlinking, setIsBlinking] = useState(false);

  // Automatic blinking logic
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Mood-based configurations
  // idle | happy | sad | thinking | excited
  const moodStyles = {
    idle: {
      eyeShape: "M 20 50 Q 50 20 80 50 Q 50 80 20 50",
      pupilSize: "8",
      glowColor: "rgba(34, 211, 238, 0.4)", // Cyan
    },
    happy: {
        eyeShape: "M 20 60 Q 50 30 80 60",
        pupilSize: "6",
        glowColor: "rgba(34, 211, 238, 0.6)",
    },
    sad: {
        eyeShape: "M 20 40 Q 50 70 80 40",
        pupilSize: "7",
        glowColor: "rgba(147, 197, 253, 0.3)", // Soft blue
    },
    thinking: {
        eyeShape: "M 20 50 Q 50 40 80 50 Q 50 60 20 50",
        pupilSize: "5",
        glowColor: "rgba(167, 139, 250, 0.4)", // Purple
    },
    excited: {
        eyeShape: "M 20 50 Q 50 10 80 50 Q 50 90 20 50",
        pupilSize: "10",
        glowColor: "rgba(34, 211, 238, 0.8)",
    }
  };

  const currentStyle = moodStyles[mood] || moodStyles.idle;

  return (
    <div className={`${size} relative flex items-center justify-center bg-gray-900 rounded-full overflow-hidden shadow-inner border border-gray-700 animate-float`}>
      {/* Background Glow */}
      <div 
        className="absolute inset-0 transition-opacity duration-500"
        style={{ backgroundColor: currentStyle.glowColor, opacity: mood === 'excited' ? 0.6 : 0.3 }}
      />
      
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full transform transition-all duration-300"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Eye Socket / Shadow */}
        <path
          d={currentStyle.eyeShape}
          fill="#111827"
          className="transition-all duration-500"
        />

        {/* The Eye Base */}
        <path
          d={isBlinking ? "M 20 50 Q 50 50 80 50" : currentStyle.eyeShape}
          fill="none"
          stroke="#22d3ee"
          strokeWidth="3"
          strokeLinecap="round"
          className="transition-all duration-300"
          style={{ 
            filter: `drop-shadow(0 0 4px ${currentStyle.glowColor})`,
          }}
        />

        {/* Pupil / Core */}
        {!isBlinking && (
          <circle
            cx="50"
            cy="50"
            r={currentStyle.pupilSize}
            fill="#22d3ee"
            className="transition-all duration-300 animate-pulse"
            style={{ 
                filter: `drop-shadow(0 0 8px #22d3ee)`,
            }}
          >
              {mood === 'thinking' && (
                  <animate
                    attributeName="cx"
                    values="45;55;45"
                    dur="3s"
                    repeatCount="indefinite"
                  />
              )}
          </circle>
        )}
      </svg>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BotEyeAvatar;
