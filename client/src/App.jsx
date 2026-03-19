import { useState } from 'react';
import ResultCard from './components/ResultCard';

function App() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to summarize.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('https://zoo-media-ai-intern-3ofk.vercel.app/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Server error occurred.');
      }

      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to connect to the production Vercel server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>AI Summarizer</h1>
        <p>Transform lengthy text into structured insights powered by LLMs.</p>
      </header>

      <main className="app-main">
        <section className="input-section">
          <textarea
            className="textarea"
            placeholder="Paste your unstructured text here (e.g., an article, meeting notes, etc.)..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
          />
          <button 
            className="btn-submit" 
            onClick={handleSubmit} 
            disabled={loading || !inputText.trim()}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Analyzing...
              </>
            ) : (
              'Generate Summary'
            )}
          </button>
          
          {error && (
            <div className="error-message">
              <p><strong>Error:</strong> {error}</p>
            </div>
          )}
        </section>

        {result && (
          <ResultCard 
            summary={result.summary} 
            keyPoints={result.keyPoints} 
            sentiment={result.sentiment} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
