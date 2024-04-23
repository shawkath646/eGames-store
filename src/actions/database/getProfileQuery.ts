import { cache } from "react";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import { OrderItemType } from "@/types/types";


const getProfileQuery = cache(async () => {

    let activeOrders = 0, totalSpent = 0, completedOrders = 0;

    const session = await auth();
    if (!session?.user.id) {
        return {
            activeOrders,
            totalSpent,
            completedOrders
        };
    }

    const ordersSnapshot = await db.collection("orders").where("orderBy", "==", session.user.id).get();
    const ordersData = ordersSnapshot.docs.map(doc => doc.data() as OrderItemType);

    ordersData.forEach(item => {
        if (item.status === "pending" || item.status === "received") {
            activeOrders++;
        }
        if (item.status === "completed") {
            completedOrders++;
            totalSpent += item.price;
        }
    });
    
    return {
        activeOrders,
        totalSpent,
        completedOrders
    };
});


export default getProfileQuery;