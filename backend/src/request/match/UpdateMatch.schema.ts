import { z } from 'zod';

export const updateMatchSchema = z.object({
    date: z.string().optional(),
    scoreTeam1: z.number().nonnegative().optional(),
    scoreTeam2: z.number().nonnegative().optional(),
    team1Id: z.number().nonnegative().optional(),
    team2Id: z.number().nonnegative().optional(),
    tournamentId: z.number().nonnegative().optional(),
    closed: z.boolean().optional(),
});