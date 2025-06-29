
export const LEVELS = [
  { id: 1, name: 'Beginner Hero', minPoints: 0 },
  { id: 2, name: 'Brave Student', minPoints: 150 },
  { id: 3, name: 'Adventurous Hero', minPoints: 350 },
  { id: 4, name: 'Rising Knight', minPoints: 600 },
  { id: 5, name: 'Piercing Spear', minPoints: 900 },
  { id: 6, name: 'Steadfast Guard', minPoints: 1250 },
  { id: 7, name: 'Leaping Lion', minPoints: 1650 },
  { id: 8, name: 'Champion Warrior', minPoints: 2100 },
  { id: 9, name: 'Fierce Fighter', minPoints: 2600 },
  { id: 10, name: 'Mighty Lion', minPoints: 3150 },
  { id: 11, name: 'Shining Star', minPoints: 3750 },
  { id: 12, name: 'Fearless Falcon', minPoints: 4400 },
  { id: 13, name: 'Majestic Leader', minPoints: 5100 },
  { id: 14, name: 'Solid Rock', minPoints: 5850 },
  { id: 15, name: 'Legendary Sword', minPoints: 6650 },
];

export const getLevelInfo = (points: number) => {
  let currentLevel = LEVELS[0];
  let nextLevel = LEVELS[1];

  for (let i = 0; i < LEVELS.length; i++) {
    if (points >= LEVELS[i].minPoints) {
      currentLevel = LEVELS[i];
      if (i < LEVELS.length - 1) {
        nextLevel = LEVELS[i + 1];
      } else {
        // Max level
        nextLevel = LEVELS[i];
      }
    } else {
      break;
    }
  }

  const pointsInLevel = points - currentLevel.minPoints;
  const pointsForNextLevel = nextLevel.minPoints - currentLevel.minPoints;
  
  const progress = pointsForNextLevel > 0 ? (pointsInLevel / pointsForNextLevel) * 100 : 100;

  return {
    ...currentLevel,
    progress: Math.min(progress, 100),
    pointsToNext: Math.max(0, nextLevel.minPoints - points),
  };
};

export const leaderboardData = [
  { rank: 1, name: 'Ahmad Al-Farsi', level: 'Fearless Falcon', score: 4520, avatar: 'https://placehold.co/40x40/29ABE2/FFFFFF.png' },
  { rank: 2, name: 'Fatima Al-Zahra', level: 'Mighty Lion', score: 3280, avatar: 'https://placehold.co/40x40/F46A4E/FFFFFF.png' },
  { rank: 3, name: 'Yusuf Ibrahim', level: 'Champion Warrior', score: 2310, avatar: 'https://placehold.co/40x40/F4B400/FFFFFF.png' },
  { rank: 4, name: 'Layla Khan', level: 'Leaping Lion', score: 1980, avatar: 'https://placehold.co/40x40/2A9D8F/FFFFFF.png' },
  { rank: 5, name: 'Omar Abdullah', level: 'Steadfast Guard', score: 1450, avatar: 'https://placehold.co/40x40/F9A857/FFFFFF.png' },
  { rank: 6, name: 'Noor Hassan', level: 'Piercing Spear', score: 1020, avatar: 'https://placehold.co/40x40/E9C46A/FFFFFF.png' },
  { rank: 7, name: 'Zainab Ali', level: 'Rising Knight', score: 750, avatar: 'https://placehold.co/40x40/E76F51/FFFFFF.png' },
  { rank: 8, name: 'Tariq Ahmed', level: 'Adventurous Hero', score: 550, avatar: 'https://placehold.co/40x40/264653/FFFFFF.png' },
];
