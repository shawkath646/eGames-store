"use client";
import Link from "next/link";
import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Lottie from 'react-lottie-player'
import placeOrder from "@/actions/database/order/placeOrder";
import { OrderResponseType, PackagesType, PlaceOrderType } from "@/types/types";
import { ImSpinner8 } from "react-icons/im";
import { FaCartPlus } from "react-icons/fa6";
import darkBackground from "@/assets/dark-background.jpg";
import bkashLogo from "@/assets/paymentMethodIcons/1656234745bkash-app-logo-png.png";
import nagadLogo from "@/assets/paymentMethodIcons/Nagad-Logo.wine.png";
import rocketLogo from "@/assets/paymentMethodIcons/184568.svg";
import upayLogo from "@/assets/paymentMethodIcons/Upay Logo । উপায় লোগো PNG HD Image - 1200x1200.png";
import binanceLogo from "@/assets/paymentMethodIcons/binance.png";
import orderCompleteAnimation from "@/assets/Animation - 1713765322367.json";



export default function OrderBox({ packageData, productType, packageId, docId, productName }: { productName: string; packageData: PackagesType; productType: string; packageId: string; docId: string; }) {

    const [pageState, setPageState] = useState<"initial" | "loading" | "completed">("initial");
    const [formStatus, setFormStatus] = useState<OrderResponseType["formStatus"]>();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("bkash");

    const transactionIdRef = useRef<HTMLInputElement | null>(null);
    const accountLast4DigitRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setPageState("loading");

        const transactionId = transactionIdRef.current?.value || "";
        const accountLast4Digit = accountLast4DigitRef.current?.value || "";

        const placeOrderData: PlaceOrderType = {
            productType,
            packageId,
            docId,
            paymentMethod: selectedPaymentMethod,
            transactionId,
            accountLast4Digit,
            productName
        };

        const response = await placeOrder(placeOrderData);
        if ("formStatus" in response) {
            setFormStatus(response.formStatus);
            setPageState("initial");
            return;
        }
        setPageState("completed");
    };

    return (
        <main style={{ backgroundImage: `url(${darkBackground.src})` }} className="w-full text-white bg-gray-900 bg-cover bg-center bg-fixed pb-40">
            <div className="container mx-auto flex justify-center pt-28 gap-5 px-5 lg:px-0">
                {pageState === "completed" ? (
                    <div className="w-full max-w-md md:max-w-lg mx-auto rounded-lg shadow-lg bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-8 flex flex-col items-center justify-center mt-10 md:mt-20 lg:mt-32">
                        <Lottie
                            animationData={orderCompleteAnimation}
                            play
                            loop={false}
                            className="h-40 md:h-48 w-40 md:w-48 mb-6"
                        />
                        <p className="text-xl md:text-2xl font-bold text-indigo-400 mb-4 text-center whitespace-nowrap animate-fade-in opacity-0 animation-delay-1s">Order Placed Successfully!</p>
                        <Link href="/profile" className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-8 rounded-lg text-lg font-medium transition duration-300 transform hover:scale-105 animate-fade-in opacity-0 animation-delay-3s">
                            View Order
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-gray-800 text-gray-200 p-8 rounded-lg w-full lg:max-w-xl shadow-lg">
                        <h2 className="text-3xl font-semibold mb-4">Place Order</h2>
                        <p className="text-lg font-medium">{productName} - {packageData.title}</p>
                        <p className="text-lg mb-10">Price: <span className="text-blue-300">৳{packageData.price}</span></p>
                        <RadioGroup value={selectedPaymentMethod} onChange={setSelectedPaymentMethod}>
                            <RadioGroup.Label>Payment method:</RadioGroup.Label>

                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                                <RadioGroup.Option
                                    value="bkash"
                                    className={({ checked }) => `p-2 flex items-center justify-center space-x-3 border rounded hover:border-blue-700 transition-colors cursor-pointer shadow-lg ${checked ? "border-blue-500 shadow-blue-500/30" : "border-gray-700"}`}
                                >
                                    <Image src={bkashLogo} alt="bKash logo" height={50} width={50} />
                                    <p>bKash</p>
                                </RadioGroup.Option>

                                <RadioGroup.Option
                                    value="nagad"
                                    className={({ checked }) => `p-2 flex items-center justify-center space-x-3 border rounded hover:border-blue-700 transition-colors cursor-pointer shadow-lg ${checked ? "border-blue-500 shadow-blue-500/30" : "border-gray-700"}`}
                                >
                                    <Image src={nagadLogo} alt="nagad logo" height={50} width={50} />
                                    <p>Nagad</p>
                                </RadioGroup.Option>

                                <RadioGroup.Option
                                    value="rocket"
                                    className={({ checked }) => `p-2 flex items-center justify-center space-x-3 border rounded hover:border-blue-700 transition-colors cursor-pointer shadow-lg ${checked ? "border-blue-500 shadow-blue-500/30" : "border-gray-700"}`}
                                >
                                    <Image src={rocketLogo} alt="rocket logo" height={50} width={50} />
                                    <p>Rocket</p>
                                </RadioGroup.Option>

                                <RadioGroup.Option
                                    value="upay"
                                    className={({ checked }) => `p-2 flex items-center justify-center space-x-3 border rounded hover:border-blue-700 transition-colors cursor-pointer shadow-lg ${checked ? "border-blue-500 shadow-blue-500/30" : "border-gray-700"}`}
                                >
                                    <Image src={upayLogo} alt="upay logo" height={50} width={50} />
                                    <p>Upay</p>
                                </RadioGroup.Option>
                                <RadioGroup.Option
                                    value="binance"
                                    className={({ checked }) => `p-2 flex items-center justify-center space-x-3 border rounded hover:border-blue-700 transition-colors cursor-pointer shadow-lg ${checked ? "border-blue-500 shadow-blue-500/30" : "border-gray-700"}`}
                                >
                                    <Image src={binanceLogo} alt="binance logo" height={50} width={50} />
                                    <p>Binance</p>
                                </RadioGroup.Option>
                            </div>
                        </RadioGroup>
                        <p className="font-medium text-lg mt-5">Account Number:</p>
                        <ul className="pl-12 list-disc mt-2 text-emerald-500">
                            <li>+880162044645</li>
                            <li>+8801830402560</li>
                        </ul>
                        <ol className="list-decimal pl-6 my-4">
                            <li>Open bKash app</li>
                            <li>Tap "Send Money" (Personal)</li>
                            <li>Send exactly <span className="text-blue-300">${packageData.price}</span></li>
                        </ol>
                        <p className="text-sm text-gray-400 mb-4">Note: Mobile recharge is not acceptable. If you accidentally recharge your mobile, we cannot refund the amount.</p>
                        <div className="mb-2">
                            <label htmlFor="transactionId" className="block font-medium mb-1">Transaction ID:</label>
                            <input type="text" name="transactionId" ref={transactionIdRef} className="w-full bg-gray-700 text-gray-200 px-4 py-2 rounded-lg outline-none" />
                            <p className="text-xs text-red-500 mt-1">{formStatus?.transactionId}</p>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="accountLast4Digit" className="block font-medium mb-1">Last 4 digit of your account:</label>
                            <input type="text" name="accountLast4Digit" ref={accountLast4DigitRef} className="w-full bg-gray-700 text-gray-200 px-4 py-2 rounded-lg outline-none" />
                            <p className="text-xs text-red-500 mt-1">{formStatus?.accountLast4Digit}</p>
                        </div>
                        <button type="submit" disabled={pageState === "loading"} className="bg-blue-500 text-white px-6 py-2 disabled:bg-gray-500 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center space-x-2">
                            {pageState === "loading" ? (
                                <ImSpinner8 size={16} className="animate-spin" />
                            ) : (
                                <FaCartPlus size={16} />
                            )}
                            <p>{pageState === "loading" ? "Please wait..." : "Confirm Order"}</p>
                        </button>
                    </form>
                )}
            </div>
        </main>
    );
}