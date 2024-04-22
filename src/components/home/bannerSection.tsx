"use client";
import Image from 'next/image';
import { Slide } from 'react-slideshow-image';
import { FaRegCircleCheck } from "react-icons/fa6";
import bannerPubg from "@/assets/banners/pubg-pictures.jpg";
import bannerFreeFire from "@/assets/banners/free-fire.jpg";
import bannerGinsenImpact from "@/assets/banners/ginsen-impact.png";
import bannerCallOfDuty from "@/assets/banners/call-of-duty-pictures.jpg";
import 'react-slideshow-image/dist/styles.css';


export default function BannerSection() {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center lg:items-start lg:gap-8 py-12 lg:py-24">
            <div className="text-center lg:text-left">
                <h1 className="mb-5 text-4xl lg:text-5xl font-semibold text-gray-200">Gamers' Choice & Top-Ranked Reliable Gaming Shop</h1>
                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <FaRegCircleCheck className="text-green-500" />
                        <p className="ml-2 text-lg text-gray-400">100% Trusted Platform</p>
                    </div>
                    <div className="flex items-center mb-4">
                        <FaRegCircleCheck className="text-green-500" />
                        <p className="ml-2 text-lg text-gray-400">Fastest Delivery</p>
                    </div>
                    <div className="flex items-center mb-4">
                        <FaRegCircleCheck className="text-green-500" />
                        <p className="ml-2 text-lg text-gray-400">Most Popular Games Available</p>
                    </div>
                    <div className="flex items-center mb-4">
                        <FaRegCircleCheck className="text-green-500" />
                        <p className="ml-2 text-lg text-gray-400">Wide Payment Methods Supported</p>
                    </div>
                </div>
                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300">Shop Now</button>
            </div>
            <div className="w-full lg:w-[500px] mt-8 lg:mt-0 mx-auto">
                <Slide>
                    <div className="rounded overflow-hidden">
                        <Image src={bannerPubg} alt="PUBG banner" height={170} width={340} className="mx-auto" />
                    </div>
                    <div className="rounded overflow-hidden">
                        <Image src={bannerCallOfDuty} alt="Call of Duty banner" height={170} width={340} className="mx-auto" />
                    </div>
                    <div className="rounded overflow-hidden">
                        <Image src={bannerFreeFire} alt="Free Fire banner" height={170} width={340} className="mx-auto" />
                    </div>
                    <div className="rounded overflow-hidden">
                        <Image src={bannerGinsenImpact} alt="Genshin Impact banner" height={170} width={340} className="mx-auto" />
                    </div>
                </Slide>
            </div>
        </section>
    );
}