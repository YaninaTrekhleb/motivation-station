import { moodCategories } from '../utils/quoteUtils';

export function MoodSelector({ onSelect, unlockedCategories }) {
  return (
    <div className="mood-selector">
      <h2>How are you feeling?</h2>
      <p className="mood-subtitle">Pick what resonates right now</p>
      <div className="mood-grid">
        {moodCategories.map((mood, index) => {
          const isLocked = !unlockedCategories.includes(mood.id);
          return (
            <button
              key={mood.id}
              className={`mood-card ${isLocked ? 'locked' : ''}`}
              onClick={() => !isLocked && onSelect(mood.id)}
              disabled={isLocked}
            >
              <span className="mood-emoji">{mood.emoji}</span>
              <span className="mood-label">{mood.label}</span>
              {isLocked && <span className="lock-icon">🔒</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
