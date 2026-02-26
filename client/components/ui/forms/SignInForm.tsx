"use client"

import { Controller, useForm } from "react-hook-form"

import PasswordInput from "../inputs/PasswordInput"
import z, { email } from "zod"
import { SignInSchema } from "@/utils/validator/signinValidator"
import { zodResolver } from "@hookform/resolvers/zod"
import EmailInput from "../inputs/EmailInput"
import { useMutation } from "@tanstack/react-query"
import { signIn } from "@/lib/api/rest/auth"
import { IoCloseSharp } from "react-icons/io5"
import BackButton from "../buttons/routers/BackButton"
import { useRouter } from "next/navigation"
import { HomeRoute } from "@/constants/router"
import { errorToast } from "@/utils/messages"

type FormType = z.infer<typeof SignInSchema>

function SignInForm() {
    const router = useRouter()

    const { mutate: signin } = useMutation({
        mutationFn: signIn,
        onSuccess: (data) => {
            router.refresh()
            router.push(HomeRoute)
            
        },
        onError: (err) => {
            errorToast(err)
        }
    })

    const { control, handleSubmit } = useForm<FormType>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: " ",
            password: ""
        },
        mode: "onTouched"
    })
    const onSubmit = async (data: Partial<FormType>): Promise<void> => {

        const body = {
            email: data.email || " ",
            password: data.password || " "
        }
        signin(body)
    }

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-step space-y-5">
                <div className="w-full flex justify-between items-center">

                    <BackButton>
                        <IoCloseSharp size={25} />
                    </BackButton>
                    <h1 className="my-3 text-3xl font-bold dark:text-gray-200 text-black">Log in to X</h1>
                    <div className=""></div>
                </div>

                <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                        <div>
                            <EmailInput {...field} name="email" />
                            {fieldState.error && (
                                <p className="form-error" >{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field, fieldState }) => (
                        <div>
                            <PasswordInput {...field} name="password" />
                            {fieldState.error && (
                                <p className="form-error" >{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
                <button className="w-full form-button" type="submit">log in</button>
            </div>
        </form>
    )
}

export default SignInForm