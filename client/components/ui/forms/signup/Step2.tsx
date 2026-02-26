import { Controller, useFormContext } from "react-hook-form"
import TextInput from "../../inputs/TextInput"
import { useState } from "react"
import { errorToast } from "@/utils/messages";
import { emailVerification } from "@/lib/api/rest/auth";
import { useMutation } from "@tanstack/react-query";

function Step2({ onNext, setVerificationToken }: { onNext: () => void, setVerificationToken: () => void }) {
    const { getValues, setValue } = useFormContext()
    const [code, setCode] = useState<string | null>(null)
    const { mutate: Verification } = useMutation({
        mutationFn: emailVerification,
        onSuccess: (data) => {
            setVerificationToken(data.data?.verification_token);
            onNext()
        },
        onError: () => errorToast("The code you entered is incorrect. Please try again. ")
    })



    const handleSubmit = async () => {
        console.log(code);

        try {
            const body = { email: getValues("email"), code }
            Verification(body)
            console.log(getValues("email"), code);

        } catch (error) {
            console.log(error);
            errorToast("The code you entered is incorrect. Please try again. ")
        }

    }
    return (
        <div className="form-step flex flex-col justify-between gap-6">
            <div className="mt-3 space-y-5">
                <div className="">
                    <h2 className=" text-3xl font-bold dark:text-gray-200 text-black">We sent you a code</h2>
                    <h5 className="text-zinc-500 text-sm">Enter it below to verify {getValues("email")}.</h5>
                </div>
                <div>
                    <TextInput onChange={(e) => setCode(e.target.value)} name="verification code" />
                    <button className="text-sky-500">resend email</button>
                </div>
            </div>


            <button
                onClick={handleSubmit}
                disabled={!code}
                type="button"
                className="form-button"
            >Next</button>
        </div>
    )
}

export default Step2