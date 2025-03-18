import { z } from 'zod';

export const updateTeamSchema = z.object({
    name: z.date(),
    player1Id: z.number().nonnegative(),
    player2Id: z.number().nonnegative(),
});