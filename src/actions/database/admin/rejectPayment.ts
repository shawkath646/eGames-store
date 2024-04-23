"use server";
import { revalidatePath } from "next/cache";
import moment from "moment";
import { db } from "@/config/firebase.config";
import setNotification from "@/actions/database/notification/setNotification";
import { OrderItemType } from "@/types/types";

const rejectPayment = async (orderId: string) => {
    const docRef = await db.collection("orders").doc(orderId).get();
    if (!docRef.exists) return false;
    const orderItem = docRef.data() as OrderItemType;

    await setNotification({
        userId: orderItem.orderBy,
        title: "Order rejected",
        description: `We regret to inform you that your placed order on ${moment(orderItem.timestamp).format('MMMM Do YYYY, h:mm:ss a')} for ${orderItem.title} at ৳${orderItem.price} has been rejected due to invalid payment information provided. If you believe this to be our mistake, please contact us and provide accurate information.`,
    });

    await docRef.ref.set({
        status: "rejected"
    }, { merge: true });

    revalidatePath("/admin/payments");
    return true;
};

export default rejectPayment;