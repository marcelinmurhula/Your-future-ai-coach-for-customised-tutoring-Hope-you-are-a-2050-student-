import React, { useState } from 'react';

const PromptInput = ({ onPromptSubmit }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/generate-explanation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      onPromptSubmit(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to backend. Make sure it is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">💡 Enter Your CS Concept</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask about zero knowledge proof, blockchain, binary search, neural networks..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={loading}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 font-semibold"
          disabled={loading || !prompt.trim()}
        >
          {loading ? 'Generating...' : 'Generate Explanation'}
        </button>
      </form>
    </div>
  );
};

export default PromptInput;
