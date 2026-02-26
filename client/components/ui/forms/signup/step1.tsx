import { Controller, useFormContext } from "react-hook-form"
import EmailInput from "../../inputs/EmailInput"
import TextInput from "../../inputs/TextInput"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { sendVerificationCode } from "@/lib/api/rest/auth"
import Loading from "../../loading/loading"
function Step1({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
    const { control, getValues } = useFormContext()
    const [sending, setSending] = useState<boolean>(false)
    const { mutate: sendEmail } = useMutation({
        mutationFn: sendVerificationCode,
        onSuccess: () => {
            setSending(false)
            onNext()
        }
    })

    const handleSubmit = async () => {
        try {
            const email = getValues("email")
            setSending(true)
            sendEmail(email)

        } catch (error) {
            console.log(error);

        }
    }

    if (sending) {
        return <div className="dark:bg-white bg-black w-full h-full ">
            <Loading/>
        </div>
    }
    return (
        <div className="form-step flex flex-col gap-6">
            <h1 className="my-3 text-3xl font-bold dark:text-gray-200 text-black">Create your account</h1>
            <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                    <div>
                        <TextInput {...field} name="name" />
                        {fieldState.error && (
                            <p className="form-error" >{fieldState.error.message}</p>
                        )}
                    </div>
                )}
            />
            <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                    <div>
                        <EmailInput {...field} />
                        {fieldState.error && (
                            <p className="form-error">{fieldState.error.message}</p>
                        )}
                    </div>
                )}
            />
            <button
                onClick={handleSubmit}
                type="button"
                className="form-button">
                next
            </button>
            <div className="mt-4">
                <h4 className="font-bold">Date of birth</h4>
                <h5 className=" text-zinc-500 text-sm">This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</h5>
            </div>
        </div>
    )
}

export default Step1