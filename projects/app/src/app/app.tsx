import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export function App() {
  const [comment, setComment] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3333/api/verify', {
        comment,
      });

      setResult(response.data);
    } catch (error) {
      console.error('Erreur lors de l\'appel à l\'API:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">
        <span>Hello there,</span> Welcome to the app 👋
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="commentInput" className="form-label">
            Your Comment
          </label>
          <input
            type="text"
            className="form-control"
            id="commentInput"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Enter your comment"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Analyze Comment
        </button>
      </form>

      {result && (
        <div className="mt-4">
          <h4>Analysis Results:</h4>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Toxicity: {result.attributeScores.TOXICITY.summaryScore.value}</h5>
              <p className="card-text">This is the score of toxicity for the entered comment.</p>
              <p>
                <strong>Summary:</strong> {result.attributeScores.TOXICITY.summaryScore.value > 0.5 ? 'Toxic' : 'Not Toxic'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
