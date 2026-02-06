import { useState, useEffect, useRef } from 'react';
export function QuoteCard({
  quote,
  isFavorite,
  onFavorite,
  onNext,
  onPrev,
  onShuffle,
  onShare,
  onBack
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('none');
  const cardRef = useRef(null);
  const touchStartX = useRef(0);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [quote?.text]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setDirection('left');
        onNext();
      } else {
        setDirection('right');
        onPrev();
      }
    }
  };

  if (!quote) return null;

  return (
    <div className="quote-container">
      <button className="back-button" onClick={onBack}>
        ← Pick another mood
      </button>

      <div
        ref={cardRef}
        className={`quote-card ${isAnimating ? `fade-in-${direction || 'up'}` : ''}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <p className="quote-text">"{quote.text}"</p>
        {quote.author && <p className="quote-author">— {quote.author}</p>}
      </div>

      <div className="quote-actions">
        <button className="action-btn nav-btn" onClick={onPrev} aria-label="Previous quote">
          ←
        </button>

        <button
          className={`action-btn favorite-btn ${isFavorite ? 'is-favorite' : ''}`}
          onClick={onFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>

        <button className="action-btn shuffle-btn" onClick={onShuffle} aria-label="Random quote">
          🎲
        </button>

        <button className="action-btn share-btn" onClick={onShare} aria-label="Share this quote">
          📤
        </button>

        <button className="action-btn nav-btn" onClick={onNext} aria-label="Next quote">
          →
        </button>
      </div>

      <p className="hint-text">Swipe or use arrow keys</p>
    </div>
  );
}
