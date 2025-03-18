import { z } from 'zod';

export const createTournamentSchema = z.object({
    name: z.string().nonempty(),
    description: z.string(),
    startDate: z.string().nonempty(),
    endDate: z.string().nonempty(),
});