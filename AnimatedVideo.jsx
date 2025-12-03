import React, { useState, useEffect, useRef } from 'react';

const AnimatedVideo = ({ animationSteps, conceptType, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef(null);

  const safeAnimationSteps = animationSteps || [
    { action: 'show', description: 'Showing concept visualization', duration: 2 },
    { action: 'process', description: 'Processing steps', duration: 2 },
    { action: 'complete', description: 'Visualization complete', duration: 1 }
  ];

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#f9fafb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw simple visualization
    ctx.fillStyle = '#3B82F6';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    
    // Draw some shapes based on current step
    const step = safeAnimationSteps[currentStep];
    if (step) {
      // Draw circles or rectangles
      for (let i = 0; i < 5; i++) {
        const x = 80 + i * 70;
        const y = 80;
        ctx.fillStyle = i === currentStep % 5 ? '#EF4444' : '#3B82F6';
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.fill();
      }
      
      // Step description
      ctx.fillStyle = '#1F2937';
      ctx.fillText(step.description, canvas.width / 2, 150);
    }
  }, [currentStep, safeAnimationSteps]);

  const startAnimation = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    const playNextStep = (stepIndex) => {
      if (stepIndex >= safeAnimationSteps.length) {
        setIsPlaying(false);
        if (onComplete) onComplete();
        return;
      }
      
      setCurrentStep(stepIndex);
      setTimeout(() => playNextStep(stepIndex + 1), 2000);
    };
    
    playNextStep(0);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4">🎬 LIVE ANIMATION</h3>
      
      <div className="flex justify-center mb-4">
        <canvas 
          ref={canvasRef} 
          width={500} 
          height={200}
          className="border border-gray-300 rounded"
        />
      </div>
      
      <div className="flex justify-center space-x-4">
        {!isPlaying ? (
          <button 
            onClick={startAnimation}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            ▶️ Play Animation
          </button>
        ) : (
          <button className="bg-gray-400 text-white px-6 py-2 rounded" disabled>
            Playing...
          </button>
        )}
      </div>
      
      <div className="text-center text-gray-600 mt-2">
        Step {currentStep + 1} of {safeAnimationSteps.length}
      </div>
    </div>
  );
};

export default AnimatedVideo;
