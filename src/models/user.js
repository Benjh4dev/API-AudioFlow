import { z } from 'zod';

const userModel = z.object({
    username: z.string().min(3, {
        message: 'Username must be at least 3 characters long'
    }),
    email: z.string({
        message: 'Email must be a string'
    }).email({
        message: 'Invalid email address'
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters long'
    }),
});


const validateUser = (object) => {
    return userModel.safeParse(object);
}

export { userModel, validateUser };