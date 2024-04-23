"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Lottie from 'react-lottie-player';
import orderBoxSchema from "@/schema/orderBox.schema";
import placeOrder from "@/actions/database/order/placeOrder";
import { PackagesType, OrderBoxFormType, PaymentMethodItem } from "@/types/types";
import { ImSpinner8 } from "react-icons/im";
import { FaCartPlus } from "react-icons/fa6";
import { IoWallet } from "react-icons/io5";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import darkBackground from "@/assets/dark-background.jpg";
import orderCompleteAnimation from "@/assets/Animation - 1713765322367.json";


export default function OrderBox({ packageData, productType, packageId, docId, productName, paymentMethods }: { productName: string; packageData: PackagesType; productType: string; packageId: string; docId: string; paymentMethods: PaymentMethodItem[] }) {

    const [isOrderComplete, setOrderComplete] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isLoading },
        setError,
        watch,
    } = useForm<OrderBoxFormType>({
        defaultValues: {
            productName,
            productType,
            docId,
            packageId,
        },
        resolver: yupResolver(orderBoxSchema)
    });

    const onSubmit: SubmitHandler<OrderBoxFormType> = async (data) => {
        const response = await placeOrder(data);
        if ("transactionId" in response) setError("transactionId", { message: response.transactionId });
        if ("voucherCode" in response) setError("voucherCode", { message: response.voucherCode });
        setOrderComplete(response.status);
    };

    return (
        <main style={{ backgroundImage: `url(${darkBackground.src})` }} className="w-full text-white bg-gray-900 bg-cover bg-center bg-fixed">
            <div className="container mx-auto flex justify-center pt-28 pb-20 lg:pb-40 lg:pt-48 gap-5 px-5 lg:px-0">
                {isOrderComplete ? (
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
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 text-gray-200 p-8 rounded-lg w-full lg:max-w-xl shadow-lg">
                        <h2 className="text-3xl font-semibold mb-4">Place Order</h2>
                        <p className="text-lg font-medium">{productName} - {packageData.title}</p>
                        <p className="text-lg mb-10">Price: <span className="text-blue-300">৳{packageData.price}</span></p>
                        <Controller
                            name="paymentMethod"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup value={field.value} onChange={field.onChange} aria-invalid={!!errors.paymentMethod}>
                                    <RadioGroup.Label>Payment method:</RadioGroup.Label>

                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                                        {paymentMethods.map((item, index) => (
                                            <RadioGroup.Option
                                                key={index}
                                                value={item.name.toLowerCase()}
                                                className={({ checked }) => `p-2 flex items-center justify-center space-x-3 border rounded hover:border-blue-700 transition-colors cursor-pointer shadow-lg ${checked ? "border-blue-500 shadow-blue-500/30" : "border-gray-700"}`}
                                            >
                                                {item.icon ? (
                                                    <Image src={item.icon} alt="bKash logo" height={50} width={50} />
                                                ) : (
                                                    <IoWallet size={38} className="text-gray-500 h-[50] w-[50]" />
                                                )}
                                                <p>{item.name}</p>
                                            </RadioGroup.Option>
                                        ))}
                                        {(productType !== "vouchers") && (
                                            <RadioGroup.Option
                                                value="voucher"
                                                className={({ checked }) => `p-2 flex items-center justify-center space-x-3 border rounded hover:border-blue-700 transition-colors cursor-pointer shadow-lg ${checked ? "border-blue-500 shadow-blue-500/30" : "border-gray-700"}`}
                                            >
                                                <BsFillTicketPerforatedFill size={38} className="text-gray-500 h-[50] w-[50]" />
                                                <p>Voucher</p>
                                            </RadioGroup.Option>
                                        )}
                                    </div>
                                    <p className="text-xs text-red-500 mt-1">{errors.paymentMethod?.message}</p>
                                </RadioGroup>
                            )}
                        />

                        {watch("paymentMethod") === "voucher" ? (
                            <div className="mb-4 mt-5">
                                <label htmlFor="voucherCode" className="block font-medium mb-1">Voucher Code:</label>
                                <input type="text" {...register("voucherCode")} aria-invalid={!!errors.voucherCode} className="w-full bg-gray-700 text-gray-200 px-4 py-2 rounded-lg outline-none aria-invalid:border aria-invalid:border-red-500" />
                                <p className="text-xs text-red-500 mt-1">{errors.voucherCode?.message}</p>
                            </div>
                        ) : (
                            <>
                                <p className="font-medium text-lg mt-5">Account Number:</p>
                                <ul className="pl-12 list-disc mt-2 text-emerald-500">
                                    {paymentMethods.find(item => item.name.toLowerCase() === watch("paymentMethod"))?.accounts.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                                <ol className="list-decimal pl-6 my-4">
                                    <li>Use "send money" option for every payment method</li>
                                    <li>Send exactly <span className="text-blue-300">৳{packageData.price}</span></li>
                                </ol>
                                <p className="text-sm text-gray-400 mb-4">Note: Mobile recharge is not acceptable. If you accidentally recharge your mobile, we cannot refund the amount.</p>
                                <div className="mb-2">
                                    <label htmlFor="transactionId" className="block font-medium mb-1">Transaction ID:</label>
                                    <input type="text" {...register("transactionId")} aria-invalid={!!errors.transactionId} className="w-full bg-gray-700 text-gray-200 px-4 py-2 rounded-lg outline-none aria-invalid:border aria-invalid:border-red-500" />
                                    <p className="text-xs text-red-500 mt-1">{errors.transactionId?.message}</p>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="accountLast4Digit" className="block font-medium mb-1">Last 4 digit of your account:</label>
                                    <input type="text" {...register("accountLast4Digit")} aria-invalid={!!errors.accountLast4Digit} className="w-full bg-gray-700 text-gray-200 px-4 py-2 rounded-lg outline-none aria-invalid:border aria-invalid:border-red-500" />
                                    <p className="text-xs text-red-500 mt-1">{errors.accountLast4Digit?.message}</p>
                                </div>
                            </>
                        )}
                        <div className="mb-4">
                            <label htmlFor="accountLast4Digit" className="block font-medium mb-1">Details:</label>
                            <textarea {...register("details")} rows={6} placeholder="Provide information of your account mentioned in previous page..." aria-invalid={!!errors.details} className="w-full bg-gray-700 text-gray-200 px-4 py-2 rounded-lg outline-none aria-invalid:border aria-invalid:border-red-500 resize-none" />
                            <p className="text-xs text-red-500 mt-1">{errors.details?.message}</p>
                        </div>
                        <button type="submit" disabled={isLoading} className="bg-blue-500 text-white px-6 py-2 disabled:bg-gray-500 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center space-x-2">
                            {isLoading ? (
                                <ImSpinner8 size={16} className="animate-spin" />
                            ) : (
                                <FaCartPlus size={16} />
                            )}
                            <p>{isLoading ? "Please wait..." : "Confirm Order"}</p>
                        </button>
                    </form>
                )}
            </div>
        </main >
    );
}