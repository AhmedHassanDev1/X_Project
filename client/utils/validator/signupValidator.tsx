import { z } from "zod"
import { isEmailTaken } from "@/lib/api/rest/auth"

const Step1Schema = z.object({
    name: z.string().min(1, "what`s your name."),
    email: z.email('invalid email.').refine(async (email) => {
        const isTaken = await isEmailTaken(email)
        return isTaken
    }, "The email is already in use.")
})


 
const Step3Schema = z.object({
    password: z.string().min(6, 'The password must be at least 6 characters long.'),
    confirm: z.string().min(1, "Password confirmation is required")
}).refine((d) => d.password === d.confirm, {
    message: "The password and confirmation do not match.",
    path: ["confirm"]
})

const CombinedSchema = Step1Schema.merge(Step3Schema)

export default CombinedSchema