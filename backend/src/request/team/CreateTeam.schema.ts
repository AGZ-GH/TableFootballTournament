import { z } from 'zod';

export const createTeamSchema = z.object({
    name: z.date(),
    player1Id: z.number().nonnegative(),
    player2Id: z.number().nonnegative(),
});