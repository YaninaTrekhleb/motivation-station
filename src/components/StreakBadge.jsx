export function StreakBadge({ count }) {
  if (count < 1) return null;

  return (
    <div className="streak-badge">
      <span className="streak-icon">🔥</span>
      <span className="streak-count">Day {count}</span>
    </div>
  );
}
