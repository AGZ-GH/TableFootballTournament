import {z} from 'zod';

export const loginPlayerSchema = z.object ({
    lastname: z.string().nonempty(),
    password: z.string().nonempty(),
});