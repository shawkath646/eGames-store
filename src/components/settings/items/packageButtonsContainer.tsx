"use client";
import { useState, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import PackageDialogBox from "./packageDialogBox";
import removePackage from "@/actions/database/admin/settings/items/removePackage";
import { PackageItemType } from "@/types/types";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


export default function PackageButtonsContainer({ categoryType, docId, packageItem } : { categoryType: string; docId: string; packageItem: PackageItemType }) {

    const [isModalOpen, setModalOpen] = useState(false);
    const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);

    return (
        <>
            <div className="flex items-center justify-center space-x-3 rounded">
                <button type="button" onClick={() => setModalOpen(true)} className="text-blue-500 hover:text-blue-600 transition-colors p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg">
                    <FaPencilAlt size={24} />
                </button>
                <button type="button" onClick={() => setRemoveModalOpen(true)} className="text-red-500 hover:text-red-600 transition-colors p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg">
                    <MdDelete size={24} />
                </button>
            </div>
            <PackageDialogBox categoryType={categoryType} docId={docId} isModalOpen={isModalOpen} setModalOpen={setModalOpen} defaultItem={packageItem} />
            <Transition appear show={isRemoveModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setRemoveModalOpen(false)}>
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
                                        className="text-lg font-medium leading-6 text-red-500"
                                    >
                                        Confirm Delete
                                    </Dialog.Title>
                                    <p className="text-sm text-gray-500 mt-2">This action will remove the payment method along with all associated account numbers, and it cannot be undone.</p>

                                    <button
                                        type="button"
                                        className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                        onClick={async () => {
                                            await removePackage(categoryType, docId, packageItem.id);
                                            setRemoveModalOpen(false);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}