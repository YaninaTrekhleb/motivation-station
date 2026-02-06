export function getRandomQuote(quotes, category, excludeText = null) {
  const categoryQuotes = quotes[category] || [];
  const available = excludeText
    ? categoryQuotes.filter(q => q.text !== excludeText)
    : categoryQuotes;

  if (available.length === 0) return categoryQuotes[0] || null;

  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}

export function personalizeQuote(quote, name) {
  if (!quote || !quote.text) return quote;
  if (!name) {
    return {
      ...quote,
      text: quote.text.replace(/,?\s*\{name\}/g, '')
    };
  }
  return {
    ...quote,
    text: quote.text.replace(/\{name\}/g, name)
  };
}

export const moodCategories = [
  { id: 'rejected', label: 'Feeling rejected', emoji: '💔' },
  { id: 'interview', label: 'Interview anxiety', emoji: '😰' },
  { id: 'imposter', label: 'Imposter syndrome', emoji: '🎭' },
  { id: 'waiting', label: 'Waiting for responses', emoji: '⏳' },
  { id: 'ghosted', label: 'Ghosted by HR', emoji: '👻' },
  { id: 'another_candidate', label: '"Thank you for your interest. Unfortunately..."', emoji: '📧' },
  { id: 'burnout', label: 'Burnout from applying', emoji: '🔥' },
  { id: 'boost', label: 'Just need a boost', emoji: '✨' }
];
