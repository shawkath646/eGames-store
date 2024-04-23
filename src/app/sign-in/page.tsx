"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import signInSchema from "@/schema/signin.schema";
import userSignIn from "@/actions/userSignIn";
import { FaLock, FaGoogle } from "react-icons/fa";
import darkBackground from "@/assets/dark-background.jpg";
import cloudBurstLabLogo from "@/assets/cloudburst_lab_logo_transparent.png"
import { SignInFormType } from "@/types/types";
import { ImSpinner8 } from "react-icons/im";


export default function Page() {

    const {
        register,
        handleSubmit,
        formState: { errors, isLoading },
        watch,
    } = useForm<SignInFormType>({
        defaultValues: {
            showPassword: false
        },
        resolver: yupResolver(signInSchema)
    });

    const onSubmit: SubmitHandler<SignInFormType> = (data) => {
        console.log(data)
    };

    return (
        <main style={{ backgroundImage: `url(${darkBackground.src})` }} className="w-full text-white bg-gray-900 bg-cover bg-center bg-fixed">
            <div className="container mx-auto pt-28 pb-20 lg:pb-40 lg:pt-48 flex items-center justify-center px-5 lg:px-0">
                <form onSubmit={handleSubmit(onSubmit)} className="p-5 bg-gray-900 rounded-xl shadow-xl w-full max-w-[450px]">
                    <div className="flex items-center justify-center space-x-3 mb-8">
                        <p className="font-semibold text-2xl">Login</p>
                        <FaLock size={20} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="emailAddress" className="block mb-2 font-medium">Email:</label>
                        <input type="email" {...register("emailAddress")} aria-invalid={!!errors.emailAddress} className="px-2 py-1.5 bg-gray-700 rounded w-full focus:border-gray-600 outline-none aria-invalid:border aria-invalid:border-red-500" />
                        <p className="text-xs text-red-500 mt-1">{errors.emailAddress?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 font-medium">Password:</label>
                        <input type={watch("showPassword") ? "text" : "password"} {...register("password")} aria-invalid={!!errors.password} className="px-2 py-1.5 bg-gray-700 rounded w-full focus:border-gray-600 outline-none aria-invalid:border aria-invalid:border-red-500" />
                        <p className="text-xs text-red-500 mt-1">{errors.password?.message}</p>
                    </div>
                    <div className="flex items-center space-x-2 cursor-pointer mt-4">
                        <input type="checkbox" {...register("showPassword")} />
                        <label className="font-medium text-sm">Show Password</label>
                    </div>
                    <button type="submit" disabled={isLoading} className="mt-3 w-full py-1.5 bg-violet-500 rounded-lg hover:bg-violet-600 transition-colors disabled:bg-gray-500 flex items-center justify-center space-x-3 font-medium">
                        {isLoading && (
                            <ImSpinner8 size={16} className="animate-spin" />
                        )}
                        <p>{isLoading ? "Please wait..." : "Submit"}</p>
                    </button>
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