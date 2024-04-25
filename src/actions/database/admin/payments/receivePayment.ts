"use server";
import { revalidatePath } from "next/cache";
import moment from "moment";
import { db } from "@/config/firebase.config";
import setNotification from "@/actions/database/notification/setNotification";
import sendVoucher from "./sendVoucher";
import { OrderItemType } from "@/types/types";

const receivePayment = async (orderId: string) => {
    const docRef = await db.collection("orders").doc(orderId).get();
    if (!docRef.exists) return false;
    const orderItem = docRef.data() as OrderItemType;

    if (orderItem.productType === "vouchers") {
        await sendVoucher(orderItem.orderBy, orderItem.price);
        await setNotification({
            userId: orderItem.orderBy,
            title: "Order completed",
            description: `We are pleased to inform you that your order for ${orderItem.title} placed on ${moment(orderItem.timestamp).format('MMMM Do YYYY, h:mm:ss a')} at ৳${orderItem.price} has been successfully completed. Thank you for your purchase! If you have any questions or need further assistance, feel free to contact us. We hope to serve you again soon.`,
        });

        await docRef.ref.set({
            status: "completed"
        }, { merge: true });
    } else {
        await setNotification({
            userId: orderItem.orderBy,
            title: "Order received",
            description: `We have received your order for ${orderItem.title} at ৳${orderItem.price} placed on ${moment(orderItem.timestamp).format('MMMM Do YYYY, h:mm:ss a')}. Please be patient until we complete your order.`,
        });
    
        await docRef.ref.set({
            status: "received"
        }, { merge: true });
    }

    revalidatePath("/admin/payments");
    return true;
};

export default receivePayment;