import React, { useState, useEffect, useRef } from 'react';

const AdvancedAnimatedVideo = ({ animationData, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elements, setElements] = useState({});
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const {
    animationType = 'algorithm',
    visualElements = [],
    animationSteps = [],
    colorScheme = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B'],
    layout = 'horizontal'
  } = animationData || {};

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawScene(ctx);
  }, [currentStep, elements]);

  const drawScene = (ctx) => {
    // Clear with abstract schematic background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw grid for abstract schematic style
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let x = 0; x < ctx.canvas.width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ctx.canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < ctx.canvas.height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(ctx.canvas.width, y);
      ctx.stroke();
    }

    // Draw all elements
    Object.values(elements).forEach(element => {
      drawElement(ctx, element);
    });

    // Draw connections
    Object.values(elements).forEach(element => {
      if (element.connections) {
        element.connections.forEach(connection => {
          drawConnection(ctx, element, elements[connection]);
        });
      }
    });

    // Current step description
    if (animationSteps[currentStep]) {
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 16px Fira Code, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(animationSteps[currentStep].description || `Step ${currentStep + 1}`, ctx.canvas.width / 2, ctx.canvas.height - 20);
    }
  };

  const drawElement = (ctx, element) => {
    const { position, properties } = element;
    const [x, y] = position;
    
    ctx.fillStyle = properties.color || '#3B82F6';
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 2;

    switch (properties.shape) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        break;
      case 'square':
        ctx.fillRect(x - 20, y - 20, 40, 40);
        ctx.strokeRect(x - 20, y - 20, 40, 40);
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
      default:
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    // Element label
    ctx.fillStyle = 'white';
    ctx.font = '12px Fira Code, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(element.name, x, y);
  };

  const drawConnection = (ctx, fromElem, toElem) => {
    if (!fromElem || !toElem) return;
    
    const [x1, y1] = fromElem.position;
    const [x2, y2] = toElem.position;
    
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Arrow head
    const angle = Math.atan2(y2 - y1, x2 - x1);
    ctx.fillStyle = '#6b7280';
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - 10 * Math.cos(angle - Math.PI/6), y2 - 10 * Math.sin(angle - Math.PI/6));
    ctx.lineTo(x2 - 10 * Math.cos(angle + Math.PI/6), y2 - 10 * Math.sin(angle + Math.PI/6));
    ctx.closePath();
    ctx.fill();
  };

  const executeStep = (step) => {
    const newElements = { ...elements };
    
    switch (step.action) {
      case 'create':
        newElements[step.element] = {
          name: step.element,
          position: step.position,
          properties: step.properties
        };
        break;
      case 'transform':
        if (newElements[step.element]) {
          newElements[step.element].properties = {
            ...newElements[step.element].properties,
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
        // Visual effect handled in draw
        break;
      default:
        console.log('Unknown action:', step.action);
    }
    
    setElements(newElements);
  };

  const startAnimation = () => {
    setIsPlaying(true);
    setElements({});
    setCurrentStep(0);
    
    const playNextStep = (stepIndex) => {
      if (stepIndex >= animationSteps.length) {
        setIsPlaying(false);
        if (onComplete) onComplete();
        return;
      }
      
      setCurrentStep(stepIndex);
      const step = animationSteps[stepIndex];
      executeStep(step);
      
      const duration = (step.duration || 2) * 1000;
      animationRef.current = setTimeout(() => playNextStep(stepIndex + 1), duration);
    };
    
    playNextStep(0);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4">🎬 {animationType.toUpperCase()} SCHEMATIC</h3>
      
      <div className="flex justify-center mb-4">
        <canvas 
          ref={canvasRef} 
          width={600} 
          height={300}
          className="border border-gray-300 rounded bg-white"
        />
      </div>
      
      <div className="flex justify-center space-x-4 mb-4">
        {!isPlaying ? (
          <button 
            onClick={startAnimation}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-semibold"
            disabled={animationSteps.length === 0}
          >
            ▶️ Play Schematic Animation
          </button>
        ) : (
          <button 
            onClick={() => setIsPlaying(false)}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-semibold"
          >
            ⏹️ Stop
          </button>
        )}
      </div>
      
      <div className="text-center text-gray-600 font-mono">
        Step {currentStep + 1} of {animationSteps.length} • {animationType}
      </div>
    </div>
  );
};

export default AdvancedAnimatedVideo;
