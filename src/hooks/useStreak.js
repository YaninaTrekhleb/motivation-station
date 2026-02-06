import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useStreak() {
  const [streakData, setStreakData] = useLocalStorage('streak', {
    count: 0,
    lastVisit: null
  });

  useEffect(() => {
    const today = new Date().toDateString();
    const lastVisit = streakData.lastVisit;

    if (lastVisit === today) {
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();

    if (lastVisit === yesterdayString) {
      setStreakData({
        count: streakData.count + 1,
        lastVisit: today
      });
    } else if (lastVisit === null) {
      setStreakData({
        count: 1,
        lastVisit: today
      });
    } else {
      setStreakData({
        count: 1,
        lastVisit: today
      });
    }
  }, []);

  return streakData.count;
}
