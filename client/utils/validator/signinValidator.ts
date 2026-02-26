import z from "zod";



export const SignInSchema = z.object({
    email: z.email('invalid email.'),
    password: z.string().min(6, 'The password must be at least 6 characters long.'),
})

