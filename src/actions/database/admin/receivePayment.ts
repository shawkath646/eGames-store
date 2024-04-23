"use server";
import { revalidatePath } from "next/cache";
import moment from "moment";
import { db } from "@/config/firebase.config";
import setNotification from "@/actions/database/notification/setNotification";
import { OrderItemType } from "@/types/types";

const receivePayment = async (orderId: string) => {
    const docRef = await db.collection("orders").doc(orderId).get();
    if (!docRef.exists) return false;
    const orderItem = docRef.data() as OrderItemType;

    await setNotification({
        userId: orderItem.orderBy,
        title: "Order received",
        description: `We have received your order for ${orderItem.title} at ৳${orderItem.price} placed on ${moment(orderItem.timestamp).format('MMMM Do YYYY, h:mm:ss a')}. Please be patient until we complete your order.`,
    });

    await docRef.ref.set({
        status: "received"
    }, { merge: true });

    revalidatePath("/admin/payments");
    return true;
};

export default receivePayment;