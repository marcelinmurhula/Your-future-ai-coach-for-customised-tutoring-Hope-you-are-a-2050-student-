import React, { useState, useEffect } from 'react';

const VideoPlayer = ({ data, onNext }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generateVideo = async () => {
      try {
        setLoading(true);
        console.log('Generating animation for:', data);
        
        // Simulate video generation delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate video URL
        const simulatedVideoUrl = `data:video/mp4;base64,simulated-video-${Date.now()}`;
        setVideoUrl(simulatedVideoUrl);
        
      } catch (err) {
        console.error('Video generation error:', err);
        setError('Failed to generate animation video');
      } finally {
        setLoading(false);
      }
    };

    generateVideo();
  }, [data]);

  const renderVisualSteps = () => {
    if (!data.animationSteps) return null;

    return (
      <div className="flex justify-center items-center space-x-4 my-6">
        {data.animationSteps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg transition-all duration-500 animate-pulse"
              style={{ 
                backgroundColor: step.properties?.color || '#3B82F6',
                animationDelay: `${index * 0.5}s`
              }}
            >
              {step.properties?.shape === 'circle' ? '○' : 
               step.properties?.shape === 'square' ? '□' : '△'}
            </div>
            <div className="mt-2 text-xs text-center text-gray-600 max-w-20">
              {step.description}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">🎥 VISUAL ANIMATION</h2>
      
      {loading && (
        <div className="text-center py-12">
          <div className="inline-flex items-center px-6 py-4 bg-blue-100 text-blue-700 rounded-lg mb-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-700 mr-3"></div>
            Generating animation video...
          </div>
          <p className="text-gray-600 text-sm">
            Creating Manim visualization for: {data.stepwiseLogic}
          </p>
        </div>
      )}

      {error && (
        <div className="text-center py-8 bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-600 mb-4">⚠️ {error}</p>
          <p className="text-gray-600 text-sm">Showing visual representation instead</p>
        </div>
      )}

      {!loading && !error && videoUrl && (
        <div className="text-center">
          <div className="bg-black rounded-lg p-4 mb-4 inline-block">
            <div className="w-64 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center text-white font-bold">
              🎬 Manim Animation
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-4">Video visualization of the step-by-step process</p>
        </div>
      )}

      <div className="mt-6">
        <h3 className="font-semibold text-gray-700 mb-3">Step Visualization:</h3>
        {renderVisualSteps()}
      </div>

      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={() => window.location.reload()}
          className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 font-semibold"
        >
          ↻ Regenerate
        </button>
        
        <button
          onClick={onNext}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 font-semibold"
          disabled={loading}
        >
          Next: Q&A System →
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
