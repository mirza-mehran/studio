import type { Timestamp } from "firebase/firestore";

export interface User {
    id: string;
    name: string;
    level: string;
    score: number;
    avatar: string;
    points: number;
}

export interface LeaderboardPlayer {
    rank: number;
    name: string;
    level: string;
    score: number;
    avatar: string;
}

export interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    level: string;
    points: number;
    createdAt?: Timestamp;
}

export interface Reward {
    id: string;
    title: string;
    description: string;
    icon: string;
    image: string;
    hint: string;
    type: 'in-game' | 'real-world';
    unlocked?: boolean;
}
