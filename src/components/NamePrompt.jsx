import { useState } from 'react';

export function NamePrompt({ onSubmit }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name.trim());
  };

  const handleSkip = () => {
    onSubmit('');
  };

  return (
    <div className="name-prompt-overlay">
      <div className="name-prompt">
        <h2>Welcome, friend</h2>
        <p>What should I call you?</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoFocus
          />
          <div className="name-prompt-buttons">
            <button type="submit" className="btn-primary">
              Let's go
            </button>
            <button type="button" className="btn-secondary" onClick={handleSkip}>
              Skip for now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
