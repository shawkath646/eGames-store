"use server";
import { revalidatePath } from "next/cache";
import moment from "moment";
import { db } from "@/config/firebase.config";
import setNotification from "@/actions/database/notification/setNotification";
import { OrderItemType } from "@/types/types";

const completeOrder = async (orderId: string) => {
    const docRef = await db.collection("orders").doc(orderId).get();
    if (!docRef.exists) return false;
    const orderItem = docRef.data() as OrderItemType;

    await setNotification({
        userId: orderItem.orderBy,
        title: "Order completed",
        description: `We are pleased to inform you that your order for ${orderItem.title} placed on ${moment(orderItem.timestamp).format('MMMM Do YYYY, h:mm:ss a')} at ৳${orderItem.price} has been successfully completed. Thank you for your purchase! If you have any questions or need further assistance, feel free to contact us. We hope to serve you again soon.`,
    });

    await docRef.ref.set({
        status: "completed"
    }, { merge: true });

    revalidatePath("/admin/orders");
    return true;
};

export default completeOrder;