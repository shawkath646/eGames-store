"use client";
import Image from "next/image";
import { useState } from "react";
import { useFormState } from "react-dom";
import { signIn } from "next-auth/react";
import SubmitButton from "./submitButton";
import userSignIn from "@/actions/userSignIn";
import { FaLock, FaGoogle } from "react-icons/fa";
import darkBackground from "@/assets/dark-background.jpg";
import cloudBurstLabLogo from "@/assets/cloudburst_lab_logo_transparent.png"



export default function Page() {

    const [showPassword, setShowPassword] = useState(false);
    const [state, formAction] = useFormState(userSignIn, {
        userEmail: "",
        userPassword: "",
    });
    
    return (
        <main style={{ backgroundImage: `url(${darkBackground.src})` }} className="w-full text-white bg-gray-900 bg-cover bg-center bg-fixed pb-40">
            <div className="container mx-auto pt-48 flex items-center justify-center px-5 lg:px-0">
                <form action={formAction} className="p-5 bg-gray-900 rounded-xl shadow-xl">
                    <div className="flex items-center justify-center space-x-3 mb-8">
                        <p className="font-semibold text-2xl">Login</p>
                        <FaLock size={20} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email-address" className="block mb-2 font-medium">Email:</label>
                        <input type="email" name="email-address" className="px-2 py-1.5 bg-gray-700 rounded w-[400px] focus:border-gray-600 outline-none" />
                        <p className="text-xs text-red-500 mt-1">{state.userEmail}</p>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 font-medium">Password:</label>
                        <input type={showPassword ? "text" : "password"} name="password" className="px-2 py-1.5 bg-gray-700 rounded w-[400px] focus:border-gray-600 outline-none" />
                        <p className="text-xs text-red-500 mt-1">{state.userPassword}</p>
                    </div>
                    <div onClick={() => setShowPassword(prev => !prev)} className="flex items-center space-x-2 cursor-pointer mt-4">
                        <input type="checkbox" checked={showPassword} onChange={() => { }} />
                        <label className="font-medium text-sm">Show Password</label>
                    </div>
                    <SubmitButton />
                    <div className="flex items-center space-x-2 my-5">
                        <hr className="h-px bg-gray-700 border-0 w-full" />
                        <p className="text-sm text-gray-700">Or</p>
                        <hr className="h-px bg-gray-700 border-0 w-full" />
                    </div>
                    <button type="button" onClick={() => signIn("google", { callbackUrl: "/profile" })} className="flex items-center justify-center space-x-4 mb-2 py-1 border border-gray-700 rounded w-full text-gray-200 hover:text-gray-300 transition-colors">
                        <FaGoogle size={15} />
                        <p>Continue with Google</p>
                    </button>
                    <button type="button" onClick={() => signIn("cloudburst-lab", { callbackUrl: "/profile" })} className="flex items-center justify-center space-x-4 py-1 border border-gray-700 rounded w-full text-gray-200 hover:text-gray-300 transition-colors">
                        <Image src={cloudBurstLabLogo} alt="CloudBurst Lab logo" height={25} width={25} />
                        <p>Continue with CloudBurst Lab</p>
                    </button>
                </form>
            </div>
        </main>
    );
}