import {z} from 'zod';

export const createPlayerSchema = z.object ({
    firstname: z.string().nonempty(),
    lastname: z.string().nonempty(),
    password: z.string().nonempty().min(12),
});