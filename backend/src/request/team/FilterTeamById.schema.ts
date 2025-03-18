import { z } from 'zod';

export const filterTeamByIdSchema = z.object({
    teamIds: z.array(z.number().nonnegative()),
});