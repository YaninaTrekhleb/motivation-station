import { useState, useCallback } from 'react';
import { NamePrompt } from './components/NamePrompt';
import { MoodSelector } from './components/MoodSelector';
import { QuoteCard } from './components/QuoteCard';
import { StreakBadge } from './components/StreakBadge';
import { Confetti } from './components/Confetti';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { ShareCard } from './components/ShareCard';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useStreak } from './hooks/useStreak';
import { useTheme } from './hooks/useTheme';

import { getRandomQuote, personalizeQuote, moodCategories } from './utils/quoteUtils';
import quotes from './data/quotes.json';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { HiGlobeAlt } from 'react-icons/hi';
import './App.css';

function App() {
  const [userName, setUserName] = useLocalStorage('userName', null);
  const [hasSeenNamePrompt, setHasSeenNamePrompt] = useLocalStorage('hasSeenNamePrompt', false);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const [currentMood, setCurrentMood] = useState(null);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const streak = useStreak();
  const [theme, toggleTheme] = useTheme();

  // All categories unlocked
  const unlockedCategories = moodCategories.map(m => m.id);

  const handleNameSubmit = (name) => {
    setUserName(name);
    setHasSeenNamePrompt(true);
  };

  const handleMoodSelect = (moodId) => {
    setCurrentMood(moodId);
    const quote = getRandomQuote(quotes, moodId);
    setCurrentQuote(personalizeQuote(quote, userName));
  };

  const handleNextQuote = useCallback(() => {
    if (!currentMood) return;
    const quote = getRandomQuote(quotes, currentMood, currentQuote?.text);
    setCurrentQuote(personalizeQuote(quote, userName));
  }, [currentMood, currentQuote, userName]);

  const handlePrevQuote = handleNextQuote;

  const handleFavorite = () => {
    if (!currentQuote) return;

    const exists = favorites.some(f => f.text === currentQuote.text);
    if (exists) {
      setFavorites(favorites.filter(f => f.text !== currentQuote.text));
    } else {
      setFavorites([...favorites, currentQuote]);
      setConfettiTrigger(prev => prev + 1);
    }
  };

  const handleRemoveFavorite = (quote) => {
    setFavorites(favorites.filter(f => f.text !== quote.text));
  };

  const handleBack = () => {
    setCurrentMood(null);
    setCurrentQuote(null);
  };

  const isFavorite = currentQuote
    ? favorites.some(f => f.text === currentQuote.text)
    : false;

  // Show name prompt on first visit
  if (!hasSeenNamePrompt) {
    return (
      <div className="app">
        <NamePrompt onSubmit={handleNameSubmit} />
      </div>
    );
  }

  return (
    <div className="app">
      <Confetti trigger={confettiTrigger} />

      <header className="app-header">
        <h1 className="app-title">Motivation Station</h1>
        <div className="header-actions">
          <StreakBadge count={streak} />
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            className="favorites-toggle"
            onClick={() => setShowFavorites(true)}
            aria-label={`Open favorites (${favorites.length} saved)`}
          >
            ❤️ {favorites.length}
          </button>
        </div>
      </header>

      <main className="app-main">
        {!currentMood ? (
          <MoodSelector
            onSelect={handleMoodSelect}
            unlockedCategories={unlockedCategories}
          />
        ) : (
          <QuoteCard
            quote={currentQuote}
            isFavorite={isFavorite}
            onFavorite={handleFavorite}
            onNext={handleNextQuote}
            onPrev={handlePrevQuote}
            onShuffle={handleNextQuote}
            onShare={() => setShowShare(true)}
            onBack={handleBack}
          />
        )}
      </main>

      {userName && (
        <p className="greeting">Keep going, {userName}. You've got this.</p>
      )}

      <footer className="app-footer">
        <p className="footer-tagline">
          Handcrafted by <strong>Yanina Trekhleb</strong> — because even job searching deserves good UI.
          <br />
          This spot could say <em>"your new colleague."</em>
        </p>
        <div className="footer-links">
          <a href="https://yaninatrekhleb.github.io/portfolio/#/" target="_blank" rel="noopener noreferrer" title="Portfolio">
            <HiGlobeAlt />
          </a>
          <a href="https://www.linkedin.com/in/yanina-trekhleb/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://github.com/YaninaTrekhleb" target="_blank" rel="noopener noreferrer" title="GitHub">
            <FaGithub />
          </a>
        </div>
      </footer>

      <FavoritesDrawer
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        favorites={favorites}
        onRemove={handleRemoveFavorite}
      />

      <ShareCard
        quote={currentQuote}
        isOpen={showShare}
        onClose={() => setShowShare(false)}
      />
    </div>
  );
}

export default App;
