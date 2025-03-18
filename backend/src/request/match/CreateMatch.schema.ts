import { z } from 'zod';

export const createMatchSchema = z.object({
    date: z.date(),
    scoreTeam1: z.number().nonnegative(),
    scoreTeam2: z.number().nonnegative(),
    team1Id: z.number().nonnegative(),
    team2Id: z.number().nonnegative(),
    tournamentId: z.number().nonnegative(),
});