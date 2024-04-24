"use server";
import { revalidatePath } from "next/cache";
import moment from "moment";
import { db } from "@/config/firebase.config";
import setNotification from "@/actions/database/notification/setNotification";
import { OrderItemType } from "@/types/types";

const cancelOrder = async (orderId: string) => {
    const docRef = await db.collection("orders").doc(orderId).get();
    if (!docRef.exists) return false;
    const orderItem = docRef.data() as OrderItemType;

    await setNotification({
        userId: orderItem.orderBy,
        title: "Order cancelled",
        description: `We regret to inform you that your placed order on ${moment(orderItem.timestamp).format('MMMM Do YYYY, h:mm:ss a')} for ${orderItem.title} at ৳${orderItem.price} has been canceled due to invalid details provided about your account. You will shortly receive a refund. Next time, please provide us with enough information. If you need further assistance, please contact us.`,
    });

    await docRef.ref.set({
        status: "cancelled"
    }, { merge: true });

    revalidatePath("/admin/orders");
    return true;
};

export default cancelOrder;