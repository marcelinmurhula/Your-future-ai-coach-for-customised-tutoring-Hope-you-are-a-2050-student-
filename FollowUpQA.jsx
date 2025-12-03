import React, { useState } from 'react';

const FollowUpQA = ({ data, onBack }) => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setLoading(true);
    setShowAnswer(false);
    
    try {
      console.log('Sending question to backend...');
      const response = await fetch('http://localhost:8000/answer-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          question: question,
          context: data.conceptDefinition 
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Received answer:', result);
      setCurrentAnswer(result.answer);
      setShowAnswer(true);
      setQuestion('');
    } catch (error) {
      console.error('Q&A Error:', error);
      setCurrentAnswer('Sorry, there was an error getting the answer. Please check if the backend is running on port 8000.');
      setShowAnswer(true);
    }
    
    setLoading(false);
  };

  // Use dynamic questions from API or fallback
  const questions = data.followUpQuestions || [
    "What's the time complexity?",
    "What are practical applications?", 
    "How does it compare to similar approaches?",
    "What are the main advantages?",
    "Where is this used in real life?"
  ];

  const handleQuickQuestion = async (quickQuestion) => {
    setQuestion(quickQuestion);
    // Auto-submit after a short delay
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} };
      handleSubmit(fakeEvent);
    }, 100);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">💬 Curious to learn more?</h2>
      <p className="text-gray-700 mb-4">Ask me anything about this concept!</p>
      
      {/* Show current answer if available */}
      {showAnswer && currentAnswer && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">🤖 AI Answer:</h3>
          <p className="text-green-700 whitespace-pre-line">{currentAnswer}</p>
          <button 
            onClick={() => setShowAnswer(false)}
            className="mt-2 text-sm text-green-600 hover:text-green-800"
          >
            Close Answer
          </button>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here..."
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500"
          disabled={loading}
        />
        <button 
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-green-300 font-semibold"
          disabled={loading || !question.trim()}
        >
          {loading ? 'Getting Answer...' : 'Ask Question'}
        </button>
      </form>

      <div className="mt-6">
        <p className="text-sm text-gray-600 mb-2">Try asking:</p>
        <div className="space-y-2">
          {questions.map((q, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(q)}
              className="block w-full text-left p-3 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 border border-gray-200 transition-colors"
              disabled={loading}
            >
              • {q}
            </button>
          ))}
        </div>
      </div>

      {/* Back button */}
      <button 
        onClick={onBack}
        className="mt-6 w-full bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-semibold"
      >
        ← Back to Concept
      </button>

      {/* Loading indicator */}
      {loading && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
            Asking AI...
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowUpQA;
