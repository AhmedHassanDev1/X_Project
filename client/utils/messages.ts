import { AxiosError } from "axios";
import { toast } from "react-toastify";

export function successToast(message: string | AxiosError | Error) {
    const msg = (message instanceof AxiosError || message instanceof Error) ? message.message : message
    toast.success(msg, {
        position: "bottom-center",
        hideProgressBar: true,
        closeButton: false,
        icon: false,
        style: { background: "oklch(68.5% 0.169 237.323)", color: "white" }
    });
}

export function errorToast(message: string | AxiosError | Error) {
    const msg = (message instanceof AxiosError || message instanceof Error) ? message.message : message
    toast.error(msg, {
        position: "bottom-center",
        hideProgressBar: true,
        closeButton: false,
        icon: false,
        style: { background: "red", color: "white" }
    });
}