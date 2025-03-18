import { z } from 'zod';

export const addTeamToTournamentSchema = z.object({
    tournamentId: z.number().nonnegative(),
    teamId: z.number().nonnegative(),
});