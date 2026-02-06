export function FavoritesDrawer({ isOpen, onClose, favorites, onRemove }) {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="favorites-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h3>Your Favorites</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {favorites.length === 0 ? (
          <p className="empty-message">
            No favorites yet. Tap the heart on quotes you love!
          </p>
        ) : (
          <div className="favorites-list">
            {favorites.map((quote, index) => (
              <div key={index} className="favorite-item">
                <p>"{quote.text}"</p>
                <button
                  className="remove-btn"
                  onClick={() => onRemove(quote)}
                  title="Remove from favorites"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {favorites.length > 0 && (
          <button
            className="export-btn"
            onClick={() => {
              const text = favorites.map(q => `"${q.text}"`).join('\n\n');
              navigator.clipboard.writeText(text);
              alert('Copied all favorites to clipboard!');
            }}
          >
            Copy all to clipboard
          </button>
        )}
      </div>
    </div>
  );
}
