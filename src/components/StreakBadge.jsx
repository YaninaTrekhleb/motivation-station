export function StreakBadge({ count }) {
  if (count < 1) return null;

  return (
    <div className="streak-badge" aria-label={`Daily streak: day ${count}`}>
      <span className="streak-icon" aria-hidden="true">🔥</span>
      <span className="streak-count">Day {count}</span>
    </div>
  );
}
