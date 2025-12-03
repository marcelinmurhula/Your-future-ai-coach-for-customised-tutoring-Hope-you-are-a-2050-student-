import React, { useState } from 'react';
import PromptInput from './components/PromptInput';
import FollowUpQA from './components/FollowUpQA';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [conceptData, setConceptData] = useState(null);

  const ConceptDefinition = ({ data }) => (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">🧠 CONCEPT DEFINITION</h2>
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-gray-700 text-lg leading-relaxed">{data.conceptDefinition}</p>
      </div>
      <button
        onClick={() => setCurrentStep(2)}
        className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold"      
      >
        Next: Stepwise Logic →
      </button>
    </div>
  );

  const StepwiseLogic = ({ data }) => (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">🔧 STEPWISE LOGIC</h2>
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-6">
        <p className="text-gray-700 text-lg font-mono text-center">{data.stepwiseLogic}</p>
      </div>

      {/* Instant Video Player */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3 text-purple-700">🎥 VISUAL ANIMATION</h3>
        
        {data.videoUrl ? (
          <div className="bg-gray-900 rounded-lg p-4">
            <video 
              controls 
              autoPlay
              muted
              className="w-full rounded-lg"
            >
              <source src={data.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="text-gray-400 text-sm mt-2 text-center">
              Step-by-step visualization
            </p>
          </div>
        ) : (
          <div className="text-center py-8 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-purple-600">✨ Video rendering in cloud</p>
            <p className="text-purple-500 text-sm mt-1">Instant loading for deployed version</p>
          </div>
        )}
      </div>

      <button
        onClick={() => setCurrentStep(3)}
        className="w-full mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-semibold"    
      >
        Next: Interactive Q&A →
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">VERSEL</h1>
        
        <PromptInput 
          onPromptSubmit={(data) => {
            setConceptData(data);
            setCurrentStep(1);
          }}
        />

        {currentStep >= 1 && conceptData && <ConceptDefinition data={conceptData} />}
        {currentStep >= 2 && conceptData && <StepwiseLogic data={conceptData} />}
        {currentStep >= 3 && conceptData && (
          <FollowUpQA
            data={conceptData}
            onBack={() => setCurrentStep(2)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
