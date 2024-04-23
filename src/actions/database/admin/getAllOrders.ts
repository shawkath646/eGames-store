import { cache } from "react";
import { db } from "@/config/firebase.config";
import timeStampToDate from "@/utils/timestampToDate";
import { OrderItemType } from "@/types/types";

const getAllOrders = cache(async () => {
    const ordersSnapshot = await db.collection("orders").orderBy("timestamp", "desc").get();

    return ordersSnapshot.docs.map((doc) => {
        const orderItem = doc.data() as OrderItemType;
        orderItem.timestamp = timeStampToDate(orderItem.timestamp);
        return orderItem;
    });
});

export default getAllOrders;