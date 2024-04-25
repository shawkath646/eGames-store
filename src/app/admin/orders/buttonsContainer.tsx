"use client";
"use client";
import { useState, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import cancelOrder from "@/actions/database/admin/orders/cancelOrder";
import completeOrder from "@/actions/database/admin/orders/completeOrder";

export default function ButtonsContainer({ status, orderId }: { status: string; orderId: string }) {

    const [isModalOpen, setModalOpen] = useState(false);
    const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);

    return (
        <>
            <div className="flex justify-between items-center space-x-3">
                {(status === "received") && (
                    <button type="button" onClick={() => setRemoveModalOpen(true)} className="bg-red-500 hover:bg-red-600 text-white w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors font-medium">Cancel</button>
                )}
                {(status === "received" || status === "cancelled") && (
                    <button type="button" onClick={() => setModalOpen(true)} className="bg-green-500 hover:bg-green-600 text-white w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors font-medium">Complete</button>
                )}
            </div>
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
                                        Cancel Order
                                    </Dialog.Title>
                                    <p className="text-sm text-gray-500 mt-2">This action will remove the payment method along with all associated account numbers, and it cannot be undone.</p>

                                    <button
                                        type="button"
                                        className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                        onClick={async () => {
                                            await cancelOrder(orderId);
                                            setRemoveModalOpen(false);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setModalOpen(false)}>
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
                                        className="text-lg font-medium leading-6 text-blue-500"
                                    >
                                        Recieve Payment
                                    </Dialog.Title>
                                    <p className="text-sm text-gray-500 mt-2">This action will remove the payment method along with all associated account numbers, and it cannot be undone.</p>

                                    <button
                                        type="button"
                                        className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={async () => {
                                            await completeOrder(orderId);
                                            setModalOpen(false);
                                        }}
                                    >
                                        Complete Order
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