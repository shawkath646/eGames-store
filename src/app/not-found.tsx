"use client";
import Lottie from "react-lottie-player";
import notFoundAnimation from "@/assets/Animation - 1713887594599.json";


export default function NotFoundPage() {
    return (
        <main className="w-full bg-white text-indigo-500 bg-cover bg-center bg-fixed">
            <div className="min-h-[700px] container mx-auto flex flex-col justify-center items-center py-20 gap-5">
                <Lottie
                    animationData={notFoundAnimation}
                    play
                    loop={false}
                    className="w-48 lg:w-64"
                />
                <h1 className="text-4xl lg:text-6xl font-bold">404</h1>
                <p className="text-xl lg:text-2xl text-center">Oops! The page you're looking for doesn't exist.</p>
            </div>
        </main>
    );
}