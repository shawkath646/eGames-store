"use client";
import cancelOrder from "@/actions/database/admin/orders/cancelOrder";
import completeOrder from "@/actions/database/admin/orders/completeOrder";

export default function ButtonsContainer({ status, orderId }: { status: string; orderId: string }) {
    return (
        <div className="flex justify-between items-center space-x-3">
            {(status === "received") && (
                <button type="button" onClick={() => cancelOrder(orderId)} className="bg-red-500 hover:bg-red-600 text-white w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors font-medium">Cancel</button>
            )}
            {(status === "received" || status === "cancelled") && (
                <button type="button" onClick={() => completeOrder(orderId)} className="bg-green-500 hover:bg-green-600 text-white w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors font-medium">Complete</button>
            )}
        </div>
    );
}