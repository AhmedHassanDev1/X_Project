"use client"
import CombinedSchema from "@/utils/validator/signupValidator"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

import Step1 from "./step1"
import z from "zod";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/lib/api/rest/auth";

import { HomeRoute } from "@/constants/router";
import { useRouter } from "next/navigation";
import { IoCloseSharp } from "react-icons/io5";
// Schema Type
type CombinedType = z.infer<typeof CombinedSchema>;

// Helper: fields per step (used for trigger())
const stepFields: Record<number, Array<keyof CombinedType | string>> = {
    0: ["name", "email"],
    2: ["password", "confirm"],
};

function SignUpForm() {
    const router = useRouter()
    const { mutate: signup } = useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            router.push(HomeRoute)
            router.refresh()
        }
    })

    const [step, setStep] = useState(0);
    const [verification_token, setVerificationToken] = useState(null)
    const methods = useForm<Partial<CombinedType> & { confirm?: string }>({
        resolver: zodResolver(CombinedSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        mode: "onTouched",
    })
    const {  handleSubmit, trigger,  } = methods
    const onSubmit = async (data: Partial<CombinedType> & { confirm?: string }) => {
        signup({ verification_token, ...data })
    }

    const onNext = async () => {
        if (step === 0) {
            const ok = await trigger(stepFields[step] as string[] );
            if (!ok) return;
        }
        if (step === 1) {

        }

        setStep((s) => Math.min(s + 1, Object.keys(stepFields).length));
    }
    const onBack = () => {
        setStep((s) => Math.max(s - 1, 0));
    }

    return (
        <form
            className="form p-4"
            onSubmit={handleSubmit(onSubmit)}>
            <FormProvider {...methods} >
                <div className="w-full">
                    {step==0&& <div
                     className="icon"
                     onClick={router.back}
                     ><IoCloseSharp size={20} />
                     </div> } 
                    {step>=1&&<div className="icon" onClick={onBack}><FaArrowLeft /></div>}
                </div>
                {step === 0 && <Step1 onNext={onNext} onBack={onBack} />}
                {step === 1 && <Step2 onNext={onNext} setVerificationToken={setVerificationToken} />}
                {step === 2 && <Step3 />}
            </FormProvider>
        </form>
    )
}

export default SignUpForm

