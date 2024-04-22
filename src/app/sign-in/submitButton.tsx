"use client";
import { useFormStatus } from "react-dom";
import { ImSpinner8 } from "react-icons/im";

export default function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending} className="mt-3 w-full py-1.5 bg-violet-500 rounded-lg hover:bg-violet-600 transition-colors disabled:bg-gray-500 flex items-center justify-center space-x-3">
            {pending && (
                <ImSpinner8 size={16} className="animate-spin" />
            )}
            <p>{pending ? "Please wait..." : "Submit"}</p>
        </button>
    );
}