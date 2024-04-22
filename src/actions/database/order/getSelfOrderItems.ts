import { cache } from "react";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import timeStampToDate from "@/utils/timestampToDate";
import { OrderItemType } from "@/types/types";


const getSelfOrderItems = cache(async() => {

    const session = await auth();
    if (!session?.user.id) return [];

    const ordersSnapshot = await db.collection("orders").where("orderBy", "==", session.user.id).orderBy("timestamp", "desc").get();
    return ordersSnapshot.docs.map((doc) => {
        const orderItem = doc.data() as OrderItemType;
        orderItem.timestamp = timeStampToDate(orderItem.timestamp);
        return orderItem;
    })
});

export default getSelfOrderItems;