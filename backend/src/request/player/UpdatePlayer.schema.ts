import {z} from 'zod';

export const updatePlayerSchema = z.object ({
    firstname: z.string().nonempty(),
    lastname: z.string().nonempty(),
});