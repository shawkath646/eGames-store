"use client";
import { useRef, useState } from "react";
import * as yup from "yup";

export default function AccountNumberField({ onItemAdd }: { onItemAdd: (item: string) => void }) {

    const [errorMessage, setErrorMessage] = useState("");
    const fieldRef = useRef<HTMLInputElement | null>(null);

    const handleAdd = async() => {
        if (!fieldRef.current) return;

        const fieldValue = fieldRef.current.value;
        const fieldSchema = yup.string().required("Account number is required field").min(3, "Account number must be at least 10 characters").max(64, "Account number cannot exceed 64 characters");

        try {
            fieldSchema.validateSync(fieldValue);
        } catch (error: any) {
            setErrorMessage(error.message);
            return;
        }
        
        onItemAdd(fieldValue);
        fieldRef.current.value = "";
        setErrorMessage("");
    }

    return (
        <>
            <div className="mb-2 flex items-center space-x-2">
                <input type="text" name="accountNumber" ref={fieldRef} aria-invalid={!!errorMessage} className="bg-white text-black border border-blue-500 rounded-md px-2 py-1 focus:outline-none focus:border-blue-700 aria-invalid:border-red-500 transition-colors w-full" />
                <button type="button" onClick={handleAdd} className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 font-medium px-4 py-1.5 rounded transition-colors outline-none">Add</button>
            </div>
            <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        </>
    );
}