"use client";
import { useState, useEffect, Fragment, Dispatch, SetStateAction } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ImagePicker from "@/app/admin/settings/imagePicker";
import { v4 as uuidv4 } from 'uuid';
import addPackage from "@/actions/database/admin/settings/items/addPackage";
import { PackageItemType } from "@/types/types";


export default function PackageDialogBox({ isModalOpen, setModalOpen, defaultItem, categoryType, docId }: { isModalOpen: boolean; setModalOpen: Dispatch<SetStateAction<boolean>>; defaultItem?: PackageItemType, categoryType: string; docId: string }) {

    const [isLoading, setLoading] = useState(false);

    const { control, register, handleSubmit, reset, formState: { errors } } = useForm<PackageItemType>({
        resolver: yupResolver(
            yup.object().shape({
                title: yup.string().required("Name is required field").min(3, "Name must be at least 10 characters").max(32, "Account number cannot exceed 32 characters"),
                icon: yup.string().defined(),
                id: yup.string().required("ID is required field"),
                description: yup.string().required("Description is a required field").min(10, "Description must be at least 10 characters").max(500, "Description cannot exceed 500 characters"),
                price: yup.number().required("Price is required field")
            })
        )
    });

    useEffect(() => {
        reset({
            icon: defaultItem?.icon || "",
            id: defaultItem?.id || uuidv4(),
            title: defaultItem?.title || "",
            description: defaultItem?.description || "",
            price: defaultItem?.price || 0
        })
    }, [isModalOpen, defaultItem]);

    const onSubmit: SubmitHandler<PackageItemType> = async (data) => {
        setLoading(true);
        addPackage(categoryType, docId, data)
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
                                    {defaultItem ? "Update" : "Add"} Item
                                </Dialog.Title>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-4">
                                        <label htmlFor="title" className="block font-medium mb-1 text-sm text-blue-500">Title:</label>
                                        <input type="text" {...register("title")} aria-invalid={!!errors.title} className="text-black border border-blue-500 rounded-md px-2 py-1 focus:outline-none focus:border-blue-700 aria-invalid:border-red-500 transition-colors w-full" />
                                        <p className="text-red-500 text-sm mt-1">{errors.title?.message}</p>
                                    </div>
                                    <Controller
                                        name="icon"
                                        control={control}
                                        render={({ field }) => <ImagePicker label="Select Icon" currentImage={field.value} onImageSelect={field.onChange} />}
                                    />
                                    <div className="mb-4">
                                        <label htmlFor="description" className="block font-medium mb-1 text-sm text-blue-500">Description:</label>
                                        <textarea {...register("description")} rows={5} aria-invalid={!!errors.description} className="text-black border border-blue-500 rounded-md px-2 py-1 focus:outline-none focus:border-blue-700 aria-invalid:border-red-500 transition-colors w-full resize-none" />
                                        <p className="text-red-500 text-sm mt-1">{errors.description?.message}</p>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="price" className="block font-medium mb-1 text-sm text-blue-500">Price:</label>
                                        <input type="number" {...register("price")} aria-invalid={!!errors.price} className="text-black border border-blue-500 rounded-md px-2 py-1 focus:outline-none focus:border-blue-700 aria-invalid:border-red-500 transition-colors w-full" />
                                        <p className="text-red-500 text-sm mt-1">{errors.price?.message}</p>
                                    </div>
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