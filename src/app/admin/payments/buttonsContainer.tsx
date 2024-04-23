"use client";
import receivePayment from "@/actions/database/admin/receivePayment";
import rejectPayment from "@/actions/database/admin/rejectPayment";

export default function ButtonsContainer({ status, orderId }: { status: string; orderId: string }) {
    return (
        <div className="flex justify-between items-center space-x-3">
            {(status === "pending" || status === "received") && (
                <button type="button" onClick={() => rejectPayment(orderId)} className="bg-red-500 hover:bg-red-600 text-white w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors font-medium">Reject</button>
            )}
            {(status === "pending" || status === "rejected") && (
                <button type="button" onClick={() => receivePayment(orderId)} className="bg-green-500 hover:bg-green-600 text-white w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors font-medium">Receive</button>
            )}
        </div>
    );
}