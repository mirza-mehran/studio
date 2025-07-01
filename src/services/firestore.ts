'use server';

import type { LeaderboardPlayer, Question, Reward, User } from '@/types';
import { getLevelInfo } from '@/lib/data';

// --- Mock Data ---
const mockUser: User = {
    id: 'user3',
    name: 'Alex Rider',
    avatar: 'https://placehold.co/128x128/7EBCF4/FFFFFF.png',
    score: 1850,
    points: 1850,
    level: getLevelInfo(1850).name,
};

const mockLeaderboard: LeaderboardPlayer[] = [
    { rank: 1, name: 'Olivia Martinez', level: 'Legendary Sword', score: 7000, avatar: 'https://placehold.co/96x96/F46A4E/FFFFFF.png' },
    { rank: 2, name: 'James Wilson', level: 'Majestic Leader', score: 5500, avatar: 'https://placehold.co/96x96/F4B400/FFFFFF.png' },
    { rank: 3, name: 'Alex Rider', level: 'Steadfast Guard', score: 1850, avatar: 'https://placehold.co/96x96/7EBCF4/FFFFFF.png' },
    { rank: 4, name: 'Sophia Garcia', level: 'Rising Knight', score: 750, avatar: 'https://placehold.co/96x96/A1D4E2/FFFFFF.png' },
    { rank: 5, name: 'Ben Carter', level: 'Brave Student', score: 300, avatar: 'https://placehold.co/96x96/C8E6C9/FFFFFF.png' },
];

const mockQuestions: Question[] = [
    { id: '1', question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correctAnswer: 2, level: "Beginner", points: 10 },
    { id: '2', question: "What is the largest planet in our solar system?", options: ["Earth", "Mars", "Jupiter", "Saturn"], correctAnswer: 2, level: "Beginner", points: 15 },
    { id: '3', question: "Which element has the chemical symbol 'O'?", options: ["Oxygen", "Gold", "Osmium", "Oganesson"], correctAnswer: 0, level: "Intermediate", points: 20 },
    { id: '4', question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], correctAnswer: 1, level: "Intermediate", points: 25 },
    { id: '5', question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"], correctAnswer: 0, level: "Advanced", points: 30 }
];

const mockRewards: {inGame: Reward[], realWorld: Reward[]} = {
    inGame: [
        { id: '1', title: 'New Avatar Frame', description: 'Unlock a cool new frame for your profile avatar.', icon: 'User', image: 'https://placehold.co/600x400/A1D4E2/FFFFFF.png', hint: 'avatar frame', type: 'in-game' },
        { id: '2', title: 'Exclusive App Theme', description: 'Personalize your app with a dark and gold exclusive theme.', icon: 'Palette', image: 'https://placehold.co/600x400/C8E6C9/FFFFFF.png', hint: 'app theme', type: 'in-game' },
        { id: '3', title: 'New Quiz Category', description: 'Unlock a special quiz category about Ancient History.', icon: 'BookOpen', image: 'https://placehold.co/600x400/7EBCF4/FFFFFF.png', hint: 'quiz history', type: 'in-game' },
    ],
    realWorld: [
        { id: '4', title: '10% Merchandise Discount', description: 'Get a 10% discount on all official QuestLearn merchandise.', icon: 'ShoppingBag', image: 'https://placehold.co/600x400/F4B400/FFFFFF.png', hint: 'merchandise discount', type: 'real-world' }
    ]
};
// --- End Mock Data ---


export async function getUserProfile(userId: string): Promise<User | null> {
    // In a real app, you would fetch this from your database.
    // For this static version, we return mock data.
    return mockUser;
}

export async function getLeaderboard(count?: number): Promise<LeaderboardPlayer[]> {
    // In a real app, you would fetch this from your database.
    // For this static version, we return mock data.
    return count ? mockLeaderboard.slice(0, count) : mockLeaderboard;
}


export async function getQuestions(): Promise<Question[]> {
    // In a real app, you would fetch this from your database.
    // For this static version, we return mock data.
    return mockQuestions;
}

export async function getRewards(): Promise<{inGame: Reward[], realWorld: Reward[]}> {
    // In a real app, you would fetch this from your database.
    // For this static version, we return mock data.
    return mockRewards;
}
