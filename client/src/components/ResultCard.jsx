import React from 'react';

const ResultCard = ({ summary, keyPoints, sentiment }) => {
  // Normalize sentiment to ensure the CSS class matches
  const normalizedSentiment = sentiment?.toLowerCase() || 'neutral';
  
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Analysis Result</h2>
        <span className={`sentiment-badge sentiment-${normalizedSentiment}`}>
          {sentiment || 'Neutral'}
        </span>
      </div>
      
      <div className="card-body">
        <div className="section-label">Summary</div>
        <p className="summary-text">{summary || 'No summary available.'}</p>
        
        <div className="section-label">Key Points</div>
        {keyPoints && keyPoints.length > 0 ? (
          <ul className="points-list">
            {keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted" style={{ color: 'var(--text-muted)' }}>No key points extracted.</p>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
