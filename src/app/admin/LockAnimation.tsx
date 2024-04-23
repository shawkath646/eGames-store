"use client";
import Lottie from 'react-lottie-player';
import lockAnimation from "@/assets/Animation - 1713801794642.json";

export default function LockAnimation() {
    return (
        <Lottie
            animationData={lockAnimation}
            play
            loop
            className="h-[200px] w-[200px]"
        />
    );
};