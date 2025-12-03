import React, { useState, useEffect, useRef } from 'react';

const DirectMappingVideo = ({ animationData, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elements, setElements] = useState({});
  const canvasRef = useRef(null);

  // Extract data with safe defaults
  const {
    conceptDefinition = '',
    stepwiseLogic = '',
    animationSteps = [],
    animationType = 'algorithm'
  } = animationData || {};

  // Ensure we have animation steps
  const safeSteps = animationSteps.length > 0 ? animationSteps : [
    {
      action: 'create',
      element: 'concept',
      position: [300, 150],
      properties: { color: '#3B82F6', shape: 'circle' },
      description: conceptDefinition || 'Processing concept',
      duration: 3
    }
  ];

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    renderCurrentStep(ctx);
  }, [currentStep, elements]);

  const renderCurrentStep = (ctx) => {
    // Clear with clean background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw current logic step prominently
    const currentStepData = safeSteps[currentStep];
    if (currentStepData) {
      drawLogicVisualization(ctx, currentStepData);
    }

    // Show step description
    ctx.fillStyle = '#1e293b';
    ctx.font = '16px Fira Code, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(currentStepData?.description || `Step ${currentStep + 1}`, canvas.width / 2, canvas.height - 20);
    
    // Show overall logic
    ctx.fillStyle = '#64748b';
    ctx.font = '14px Fira Code, monospace';
    ctx.fillText(`Logic: ${stepwiseLogic}`, canvas.width / 2, canvas.height - 40);
  };

  const drawLogicVisualization = (ctx, step) => {
    const [x, y] = step.position || [300, 150];
    const props = step.properties || {};
    
    // Draw main element for this step
    ctx.fillStyle = props.color || '#3B82F6';
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 3;

    switch (props.shape) {
      case 'square':
        ctx.fillRect(x - 30, y - 30, 60, 60);
        ctx.strokeRect(x - 30, y - 30, 60, 60);
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(x, y - 25);
        ctx.lineTo(x - 25, y + 25);
        ctx.lineTo(x + 25, y + 25);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      default: // circle
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    // Element label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Fira Code, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(step.element || 'Step', x, y);

    // Show action type
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Fira Code, monospace';
    ctx.fillText(step.action, x, y + 50);
  };

  const executeStep = (step) => {
    const newElements = { ...elements };
    
    try {
      switch (step.action) {
        case 'create':
          newElements[step.element] = {
            name: step.element,
            position: step.position,
            properties: step.properties
          };
          break;
        case 'connect':
          if (newElements[step.from] && newElements[step.to]) {
            // Connection visualization handled in render
          }
          break;
        // Other actions can be added as needed
      }
    } catch (error) {
      console.log('Step execution error:', error);
    }
    
    setElements(newElements);
  };

  const startAnimation = () => {
    setIsPlaying(true);
    setElements({});
    setCurrentStep(0);
    
    const playNextStep = (stepIndex) => {
      if (stepIndex >= safeSteps.length) {
        setIsPlaying(false);
        if (onComplete) onComplete();
        return;
      }
      
      setCurrentStep(stepIndex);
      const step = safeSteps[stepIndex];
      executeStep(step);
      
      const duration = (step.duration || 2) * 1000;
      setTimeout(() => playNextStep(stepIndex + 1), duration);
    };
    
    playNextStep(0);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-gray-100">
      <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
        🎬 {animationType.toUpperCase()} VISUALIZATION
      </h3>
      
      <div className="text-center mb-4 text-gray-600">
        {conceptDefinition}
      </div>
      
      <div className="flex justify-center mb-4">
        <canvas 
          ref={canvasRef} 
          width={600} 
          height={250}
          className="border border-gray-300 rounded-lg bg-white shadow-sm"
        />
      </div>
      
      <div className="flex justify-center space-x-4 mb-4">
        {!isPlaying ? (
          <button 
            onClick={startAnimation}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold transition-colors shadow"
          >
            ▶️ Visualize Concept
          </button>
        ) : (
          <button 
            onClick={() => setIsPlaying(false)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-semibold transition-colors shadow"
          >
            ⏹️ Stop Visualization
          </button>
        )}
      </div>
      
      <div className="text-center text-gray-500 font-mono text-sm">
        Step {currentStep + 1} of {safeSteps.length} • Direct Mapping
      </div>
    </div>
  );
};

export default DirectMappingVideo;
