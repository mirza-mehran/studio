
// src/app/actions.ts
'use server';

import {
  generateMotivationalNotification,
  type MotivationalNotificationInput,
} from '@/ai/flows/motivational-notifications';
import { motivationalMessages } from '@/lib/messages';


export async function getMotivationalMessage(index: number, playerId: string) {
  const scenario = motivationalMessages[index];
  
  if (!scenario) {
    return "Keep up the great work! Every step forward is a victory.";
  }

  const input: MotivationalNotificationInput = {
    ...scenario,
    playerId: playerId,
  };

  try {
    const result = await generateMotivationalNotification(input);
    return result.message;
  } catch (error) {
    console.error('Error generating motivational notification:', error);
    return "Keep up the great work! Every step forward is a victory.";
  }
}
