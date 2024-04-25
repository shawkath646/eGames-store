"use client";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AccountNumberField from "./accountNumberField";
import ImagePicker from "../../../app/admin/settings/imagePicker";
import { v4 as uuidv4 } from 'uuid';
import { PaymentMethodItemType } from "@/types/types";
import { MdDelete } from "react-icons/md";
import addPaymentMethodItem from "@/actions/database/admin/settings/payments/addPaymentMethodItem";


export default function PaymentDialogBox({ isModalOpen, setModalOpen, defaultItem }: { isModalOpen: boolean; setModalOpen: Dispatch<SetStateAction<boolean>>; defaultItem?: PaymentMethodItemType }) {

    const [isLoading, setLoading] = useState(false);

    const { control, register, handleSubmit, reset, formState: { errors } } = useForm<PaymentMethodItemType>({
        resolver: yupResolver(
            yup.object().shape({
                name: yup.string().required("Name is required field").min(3, "Name must be at least 10 characters").max(32, "Account number cannot exceed 32 characters"),
                icon: yup.string().defined(),
                id: yup.string().required("ID is required field"),
                accounts: yup.array().of(yup.string().required("Account number is required")).required("Account number array is required").min(1, "Minimum 1 account number required")
            })
        )
    });

    useEffect(() => {
        reset({
            accounts: defaultItem?.accounts || [],
            icon: defaultItem?.icon || "",
            id: defaultItem?.id || uuidv4(),
            name: defaultItem?.name || ""
        })
    }, [isModalOpen, defaultItem]);

    const onSubmit: SubmitHandler<PaymentMethodItemType> = async (data) => {
        setLoading(true);
        await addPaymentMethodItem(data);
        setModalOpen(false);
        setLoading(false);
    };

    return (
        <Transition appear show={isModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => { }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-blue-900 mb-4"
                                >
                                    {defaultItem ? "Update" : "Add"} Payment Method
                                </Dialog.Title>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block font-medium mb-1 text-sm text-blue-500">Name:</label>
                                        <input type="text" {...register("name")} aria-invalid={!!errors.name} className="text-black border border-blue-500 rounded-md px-2 py-1 focus:outline-none focus:border-blue-700 aria-invalid:border-red-500 transition-colors w-full" />
                                        <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
                                    </div>
                                    <Controller
                                        name="icon"
                                        control={control}
                                        render={({ field }) => <ImagePicker label="Select Icon" currentImage={field.value} onImageSelect={field.onChange} />}
                                    />
                                    <Controller
                                        name="accounts"
                                        control={control}
                                        render={({ field }) => (
                                            <div className="mb-4">
                                                <label htmlFor="accountNumber" className="block font-medium mb-1 text-sm text-blue-500">Account Number:</label>
                                                {(field.value ?? []).map((item, index) => (
                                                    <Fragment key={index}>
                                                        <div className="flex items-center justify-between py-1 bg-blue-500/10 text-blue-500 px-2 space-x-2 mb-2">
                                                            <p className="text-sm">{item}</p>
                                                            <button type="button" onClick={() => field.onChange(field.value.filter(prevItem => prevItem !== item))} className="outline-none">
                                                                <MdDelete size={18} className="text-red-500 hover:text-red-600 transition-colors" />
                                                            </button>
                                                        </div>
                                                        {errors.accounts && errors.accounts[index] && (
                                                            <p className="text-red-500 text-sm mt-1">{errors.accounts[index]?.message}</p>
                                                        )}
                                                    </Fragment>
                                                ))}
                                                <AccountNumberField onItemAdd={(item) => field.onChange([...field.value ?? [], item])} />
                                            </div>
                                        )}
                                    />
                                    <div className="flex items-center space-x-2">
                                        <button
                                            type="button"
                                            disabled={isLoading}
                                            onClick={() => setModalOpen(false)}
                                            className="w-full inline-flex outline-none justify-center rounded-md border border-transparent bg-gray-300 hover:bg-gray-400 px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 transition-colors disabled:bg-gray-500 disabled:text-white"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full inline-flex outline-none justify-center rounded-md border border-transparent bg-blue-500 hover:bg-blue-600 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors disabled:bg-gray-500"
                                        >
                                            {isLoading ? "Please wait..." : (defaultItem ? "Update" : "Add")}
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}