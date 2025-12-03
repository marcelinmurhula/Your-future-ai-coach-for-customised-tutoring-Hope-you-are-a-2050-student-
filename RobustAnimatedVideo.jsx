import React, { useState, useEffect, useRef } from 'react';

const RobustAnimatedVideo = ({ animationData, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elements, setElements] = useState({});
  const canvasRef = useRef(null);

  // Safe data extraction with defaults
  const {
    animationType = 'algorithm',
    visualElements = ['default'],
    animationSteps = [],
    colorScheme = ['#3B82F6', '#EF4444', '#10B981'],
    layout = 'horizontal'
  } = animationData || {};

  // Ensure we have at least one animation step
  const safeAnimationSteps = animationSteps.length > 0 ? animationSteps : [
    { action: 'create', element: 'default', position: [300, 150], properties: { color: '#3B82F6', shape: 'circle' }, description: 'Concept Visualization' }
  ];

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawScene(ctx);
  }, [currentStep, elements]);

  const drawScene = (ctx) => {
    // Clear with professional schematic background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw subtle grid
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let x = 0; x < ctx.canvas.width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ctx.canvas.height);
      ctx.stroke();
    }

    // Draw all elements
    Object.values(elements).forEach(element => {
      if (element && element.position) {
        drawAbstractElement(ctx, element);
      }
    });

    // Draw connections
    Object.values(elements).forEach(element => {
      if (element && element.connections) {
        element.connections.forEach(connectionId => {
          const targetElement = elements[connectionId];
          if (targetElement) {
            drawAbstractConnection(ctx, element, targetElement);
          }
        });
      }
    });

    // Current step info
    const currentStepData = safeAnimationSteps[currentStep];
    if (currentStepData && currentStepData.description) {
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 14px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(currentStepData.description, ctx.canvas.width / 2, ctx.canvas.height - 15);
    }
  };

  const drawAbstractElement = (ctx, element) => {
    const [x, y] = element.position;
    const props = element.properties || {};
    
    ctx.fillStyle = props.color || '#3B82F6';
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;

    switch (props.shape) {
      case 'square':
        ctx.fillRect(x - 25, y - 25, 50, 50);
        ctx.strokeRect(x - 25, y - 25, 50, 50);
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(x, y - 20);
        ctx.lineTo(x - 20, y + 20);
        ctx.lineTo(x + 20, y + 20);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      case 'circle':
      default:
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    // Element label
    if (element.name) {
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(element.name.substring(0, 3), x, y);
    }
  };

  const drawAbstractConnection = (ctx, fromElem, toElem) => {
    const [x1, y1] = fromElem.position;
    const [x2, y2] = toElem.position;
    
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  const executeAnimationStep = (step) => {
    const newElements = { ...elements };
    
    try {
      switch (step.action) {
        case 'create':
          newElements[step.element] = {
            name: step.element,
            position: step.position || [300, 150],
            properties: step.properties || { color: '#3B82F6', shape: 'circle' }
          };
          break;
        case 'transform':
          if (newElements[step.element]) {
            newElements[step.element] = {
              ...newElements[step.element],
              ...step.properties
            };
          }
          break;
        case 'connect':
          if (newElements[step.from] && newElements[step.to]) {
            if (!newElements[step.from].connections) {
              newElements[step.from].connections = [];
            }
            newElements[step.from].connections.push(step.to);
          }
          break;
        case 'highlight':
          // Visual emphasis
          break;
        default:
          // Unknown action, create default element
          if (!newElements.default) {
            newElements.default = {
              name: 'element',
              position: [300, 150],
              properties: { color: '#3B82F6', shape: 'circle' }
            };
          }
      }
    } catch (error) {
      console.log('Animation step error:', error);
      // Ensure we always have at least one element
      if (Object.keys(newElements).length === 0) {
        newElements.default = {
          name: 'concept',
          position: [300, 150],
          properties: { color: '#3B82F6', shape: 'circle' }
        };
      }
    }
    
    setElements(newElements);
  };

  const startAnimation = () => {
    setIsPlaying(true);
    setElements({});
    setCurrentStep(0);
    
    const playStep = (stepIndex) => {
      if (stepIndex >= safeAnimationSteps.length) {
        setIsPlaying(false);
        if (onComplete) onComplete();
        return;
      }
      
      setCurrentStep(stepIndex);
      const step = safeAnimationSteps[stepIndex];
      executeAnimationStep(step);
      
      setTimeout(() => playStep(stepIndex + 1), 2000);
    };
    
    playStep(0);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border">
      <h3 className="text-xl font-bold mb-4 text-gray-800">
        🎬 {animationType.toUpperCase()} SCHEMATIC
      </h3>
      
      <div className="flex justify-center mb-4">
        <canvas 
          ref={canvasRef} 
          width={600} 
          height={250}
          className="border-2 border-gray-200 rounded-lg bg-white"
        />
      </div>
      
      <div className="flex justify-center space-x-4 mb-4">
        {!isPlaying ? (
          <button 
            onClick={startAnimation}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
          >
            ▶️ Play Animation
          </button>
        ) : (
          <button 
            onClick={() => setIsPlaying(false)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-semibold transition-colors"
          >
            ⏹️ Stop
          </button>
        )}
      </div>
      
      <div className="text-center text-gray-600 font-mono text-sm">
        Step {currentStep + 1} of {safeAnimationSteps.length} • {animationType}
      </div>
    </div>
  );
};

export default RobustAnimatedVideo;
