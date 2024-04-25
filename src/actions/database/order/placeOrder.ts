"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import setNotification from "@/actions/database/notification/setNotification";
import timeStampToDate from "@/utils/timestampToDate";
import { OrderItemType, OrderBoxFormType, PackageItemType, VoucherItemType } from "@/types/types";


const placeOrder = async (orderData: OrderBoxFormType) => {

    const session = await auth();
    if (!session?.user.id) return {
        status: false,
    };

    let orderStatus: OrderItemType["status"] = "pending";

    const packageDoc = await db.collection(orderData.productType).doc(orderData.docId).collection("packages").doc(orderData.packageId).get();
    const packageData = packageDoc.data() as PackageItemType;

    if (orderData.transactionId) {
        const transictionIdQuery = await db.collection("orders").where("transactionId", "==", orderData.transactionId).get();
        if (!transictionIdQuery.empty) return {
            status: false,
            transactionId: "Transaction id already used in another order."
        };

        await setNotification({
            title: "Order Placed",
            description: `An order has been placed for ৳${packageData.price} paid via ${orderData.paymentMethod} for ${orderData.productName} - ${packageData.title}. It is in queue. You will be notified once an admin takes care of your order. Happy shopping!`
        });
    }

    if (orderData.voucherCode) {
        const voucherSnapshot = await db.collection("activeVouchers").where("code", "==", orderData.voucherCode).get();
        if (voucherSnapshot.empty) return {
            status: false,
            voucherCode: "Invalid voucher code provided."
        };

        const voucherData = voucherSnapshot.docs[0].data() as VoucherItemType;

        if (voucherData.isUsed) return {
            status: false,
            voucherCode: "Voucher is already used."
        };

        voucherData.validUntil = timeStampToDate(voucherData.validUntil);

        if (new Date > voucherData.validUntil) return {
            status: false,
            voucherCode: "Voucher is expired."
        };

        if (voucherData.value < packageData.price) return {
            status: false,
            voucherCode: "Voucher value is less than package price."
        };

        await voucherSnapshot.docs[0].ref.set({ isUsed: true }, { merge: true });
        orderStatus = "received";
        await setNotification({
            title: "Order received",
            description: `We have received your order for ${packageData.title} for ৳${packageData.price} placed on ${moment().format('MMMM Do YYYY, h:mm:ss a')}. Please be patient until we complete your order.`,
        });
    };

    const orderObject: OrderItemType = {
        ...orderData,
        id: uuidv4(),
        orderBy: session.user.id,
        price: packageData.price,
        timestamp: new Date,
        status: orderStatus,
        title: orderData.productName + " - " + packageData.title
    };

    await db.collection("orders").doc(orderObject.id).set(orderObject);

    return {
        status: true,
    };
};

export default placeOrder;