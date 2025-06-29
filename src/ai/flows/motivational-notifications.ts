// src/ai/flows/motivational-notifications.ts
'use server';

/**
 * @fileOverview A flow for generating personalized motivational notifications for players.
 *
 * - generateMotivationalNotification - A function that generates a motivational notification based on player data.
 * - MotivationalNotificationInput - The input type for the generateMotivationalNotification function.
 * - MotivationalNotificationOutput - The return type for the generateMotivationalNotification function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PlayerDataSchema = z.object({
  level: z.number().describe('The current level of the player.'),
  points: z.number().describe('The current points of the player.'),
  correctAnswers: z.number().describe('The number of correct answers the player has given.'),
  incorrectAnswers: z.number().describe('The number of incorrect answers the player has given.'),
  recentActivity: z.string().describe('A description of the player\'s recent activity in the game.'),
});

const MotivationalNotificationInputSchema = z.object({
  playerId: z.string().describe('The unique identifier of the player.'),
  playerData: PlayerDataSchema.describe('The player data to use for generating the notification.'),
  goalType: z.enum(['level', 'points', 'streak']).describe('The type of goal the player is close to achieving or struggling with.'),
  goalValue: z.number().optional().describe('The value of the goal the player is close to achieving.'),
});
export type MotivationalNotificationInput = z.infer<typeof MotivationalNotificationInputSchema>;

const MotivationalNotificationOutputSchema = z.object({
  message: z.string().describe('The personalized motivational message for the player.'),
});
export type MotivationalNotificationOutput = z.infer<typeof MotivationalNotificationOutputSchema>;

export async function generateMotivationalNotification(
  input: MotivationalNotificationInput
): Promise<MotivationalNotificationOutput> {
  return motivationalNotificationFlow(input);
}

const motivationalNotificationPrompt = ai.definePrompt({
  name: 'motivationalNotificationPrompt',
  input: {schema: MotivationalNotificationInputSchema},
  output: {schema: MotivationalNotificationOutputSchema},
  prompt: `You are an AI assistant designed to generate personalized motivational messages for players in an educational game called QuestLearn.

  Your goal is to encourage and support players based on their current progress and challenges.
  Consider the following player data and goal information to create an engaging and supportive message:

  Player ID: {{{playerId}}}
  Level: {{{playerData.level}}}
  Points: {{{playerData.points}}}
  Correct Answers: {{{playerData.correctAnswers}}}
  Incorrect Answers: {{{playerData.incorrectAnswers}}}
  Recent Activity: {{{playerData.recentActivity}}}

  Goal Type: {{{goalType}}}
  Goal Value: {{#if goalValue}}{{{goalValue}}}{{else}}N/A{{/if}}

  Based on this information, generate a motivational message that is:
  - Personalized to the player's specific situation.
  - Encouraging and supportive.
  - Relevant to the player's goal.
  - Not longer than 50 words.

  Here are some example messages:
  - \"Great job! You're just 20 points away from reaching the next level. Keep up the good work!\"
  - \"Don't give up! You can regain your level by completing specific tasks.\"
  - \"You're on a roll! Keep answering questions correctly to maintain your streak.\"
  - \"We noticed you've had some incorrect answers. Review previous levels and try again!\"
  `,
});

const motivationalNotificationFlow = ai.defineFlow(
  {
    name: 'motivationalNotificationFlow',
    inputSchema: MotivationalNotificationInputSchema,
    outputSchema: MotivationalNotificationOutputSchema,
  },
  async input => {
    const {output} = await motivationalNotificationPrompt(input);
    return output!;
  }
);
