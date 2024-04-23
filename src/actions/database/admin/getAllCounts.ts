import { cache } from "react";
import { db } from "@/config/firebase.config";

const getAllCounts = cache(async() => {
    const paymentsCount = await db.collection("orders").where("status", "==", "pending").get();
    const ordersCount = await db.collection("orders").where("status", "==", "received").get();

    return {
        payments: paymentsCount.size,
        orders: ordersCount.size
    };
});

export default getAllCounts;