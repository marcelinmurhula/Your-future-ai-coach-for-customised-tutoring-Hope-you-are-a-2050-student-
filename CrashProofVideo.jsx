import React, { useState } from 'react';

const CrashProofVideo = ({ animationData, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const {
    conceptDefinition = '',
    stepwiseLogic = '',
    animationSteps = [],
    animationType = 'algorithm'
  } = animationData || {};

  // Simple steps that never crash
  const safeSteps = animationSteps && animationSteps.length > 0 
    ? animationSteps.slice(0, 6) // Limit to 6 steps max
    : [
        { description: 'Initializing visualization...', duration: 2 },
        { description: 'Processing concept steps...', duration: 2 },
        { description: 'Rendering schematic...', duration: 2 },
        { description: 'Visualization complete', duration: 1 }
      ];

  const startAnimation = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    const playNextStep = (stepIndex) => {
      if (stepIndex >= safeSteps.length) {
        setIsPlaying(false);
        if (onComplete) onComplete();
        return;
      }
      
      setCurrentStep(stepIndex);
      const duration = (safeSteps[stepIndex].duration || 2) * 1000;
      
      setTimeout(() => playNextStep(stepIndex + 1), duration);
    };
    
    playNextStep(0);
  };

  // Simple geometric shapes using CSS - no Canvas
  const getShape = (index) => {
    const shapes = ['●', '■', '▲', '◆'];
    const colors = ['text-blue-500', 'text-red-500', 'text-green-500', 'text-purple-500'];
    return {
      shape: shapes[index % shapes.length],
      color: colors[index % colors.length]
    };
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-gray-100">
      <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
        🎬 {animationType.toUpperCase()} SCHEMATIC
      </h3>
      
      {/* Concept Definition */}
      <div className="text-center mb-6 text-gray-600 bg-blue-50 p-4 rounded-lg">
        {conceptDefinition}
      </div>

      {/* Animation Visualization */}
      <div className="flex justify-center items-center mb-6 h-40 bg-gray-50 rounded-lg">
        <div className="text-center">
          {/* Animated Elements */}
          <div className="flex justify-center space-x-4 mb-4">
            {safeSteps.slice(0, 4).map((step, index) => {
              const { shape, color } = getShape(index);
              const isActive = index <= currentStep;
              
              return (
                <div key={index} className="text-center">
                  <div className={`text-4xl transition-all duration-500 ${
                    isActive ? color + ' scale-125' : 'text-gray-300 scale-100'
                  }`}>
                    {shape}
                  </div>
                  <div className={`text-xs mt-2 ${
                    isActive ? 'text-gray-700 font-semibold' : 'text-gray-400'
                  }`}>
                    Step {index + 1}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / safeSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Current Step Description */}
      <div className="text-center mb-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-gray-700 font-semibold">
          {safeSteps[currentStep]?.description || `Step ${currentStep + 1} of ${safeSteps.length}`}
        </p>
      </div>

      {/* Step Logic */}
      <div className="text-center mb-4 text-sm text-gray-500 font-mono">
        {stepwiseLogic}
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        {!isPlaying ? (
          <button 
            onClick={startAnimation}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold transition-colors shadow"
          >
            ▶️ Play Visualization
          </button>
        ) : (
          <button 
            onClick={() => setIsPlaying(false)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-semibold transition-colors shadow"
          >
            ⏹️ Stop
          </button>
        )}
      </div>

      {/* Progress */}
      <div className="text-center text-gray-500 text-sm mt-4">
        Step {currentStep + 1} of {safeSteps.length}
      </div>
    </div>
  );
};

export default CrashProofVideo;
