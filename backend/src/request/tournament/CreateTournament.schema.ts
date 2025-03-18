import { z } from 'zod';

export const createTournamentSchema = z.object({
    name: z.string().nonempty(),
    description: z.string(),
    startDate: z.date(),
    endDate: z.date(),
});