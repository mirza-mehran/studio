// src/app/actions.ts
'use server';

import {
  generateMotivationalNotification,
  type MotivationalNotificationInput,
} from '@/ai/flows/motivational-notifications';

const motivationalMessages: Omit<MotivationalNotificationInput, 'playerId'>[] = [
  {
    playerData: {
      level: 4,
      points: 880,
      correctAnswers: 150,
      incorrectAnswers: 30,
      recentActivity: 'Completed 3 levels in the last session.',
    },
    goalType: 'level',
    goalValue: 900,
  },
  {
    playerData: {
      level: 8,
      points: 2200,
      correctAnswers: 4,
      incorrectAnswers: 0,
      recentActivity: 'Just started a new session.',
    },
    goalType: 'streak',
    goalValue: 5,
  },
  {
    playerData: {
      level: 6,
      points: 1300,
      correctAnswers: 200,
      incorrectAnswers: 55,
      recentActivity: 'Struggled with the last quiz on history.',
    },
    goalType: 'level',
  },
];


export async function getMotivationalMessage() {
  const randomScenario = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
  
  const input: MotivationalNotificationInput = {
    ...randomScenario,
    playerId: `user_${Math.floor(Math.random() * 10000)}`,
  };

  try {
    const result = await generateMotivationalNotification(input);
    return result.message;
  } catch (error) {
    console.error('Error generating motivational notification:', error);
    return "Keep up the great work! Every step forward is a victory.";
  }
}
