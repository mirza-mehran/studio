'use server';

import { db } from '@/lib/firebase';
import type { LeaderboardPlayer, Question, Reward, User } from '@/types';
import { collection, getDocs, query, orderBy, limit, doc, getDoc } from 'firebase/firestore';
import { getLevelInfo } from '@/lib/data';

export async function getUserProfile(userId: string): Promise<User | null> {
    if (!db) {
        console.error("Firestore is not initialized. Check your Firebase environment variables.");
        return null;
    }
    try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (!userDoc.exists()) {
            console.warn(`No user found with id: ${userId}`);
            return null;
        }
        const userData = userDoc.data();
        const levelInfo = getLevelInfo(userData.score);

        return {
            id: userDoc.id,
            name: userData.name,
            avatar: userData.avatar,
            score: userData.score,
            points: userData.score,
            level: levelInfo.name,
        };
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
}

export async function getLeaderboard(count?: number): Promise<LeaderboardPlayer[]> {
    if (!db) {
        console.error("Firestore is not initialized. Check your Firebase environment variables.");
        return [];
    }
    try {
        const usersRef = collection(db, 'users');
        const q = count 
            ? query(usersRef, orderBy('score', 'desc'), limit(count))
            : query(usersRef, orderBy('score', 'desc'));

        const querySnapshot = await getDocs(q);
        const leaderboard: LeaderboardPlayer[] = [];
        let rank = 1;
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const levelInfo = getLevelInfo(data.score);
            leaderboard.push({
                rank: rank++,
                name: data.name,
                level: levelInfo.name,
                score: data.score,
                avatar: data.avatar,
            });
        });
        return leaderboard;
    } catch (error) {
        console.error("Error fetching leaderboard data: ", error);
        return [];
    }
}


export async function getQuestions(): Promise<Question[]> {
    if (!db) {
        console.error("Firestore is not initialized. Check your Firebase environment variables.");
        return [];
    }
    try {
        const questionsRef = collection(db, 'questions');
        const q = query(questionsRef, orderBy('createdAt', 'asc'));
        const querySnapshot = await getDocs(q);
        
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Question));
    } catch (error) {
        console.error("Error fetching questions: ", error);
        return [];
    }
}

export async function getRewards(): Promise<{inGame: Reward[], realWorld: Reward[]}> {
    if (!db) {
        console.error("Firestore is not initialized. Check your Firebase environment variables.");
        return { inGame: [], realWorld: [] };
    }
    try {
        const rewardsRef = collection(db, 'rewards');
        const querySnapshot = await getDocs(rewardsRef);
        const rewards = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Reward));

        const inGame = rewards.filter(r => r.type === 'in-game');
        const realWorld = rewards.filter(r => r.type === 'real-world');
        
        return { inGame, realWorld };
    } catch (error) {
        console.error("Error fetching rewards: ", error);
        return { inGame: [], realWorld: [] };
    }
}
