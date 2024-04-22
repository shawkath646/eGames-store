"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import { v4 as uuidv4 } from 'uuid';
import setNotification from "@/actions/database/notification/setNotification";
import { OrderResponseType, OrderItemType, PlaceOrderType, PackagesType } from "@/types/types";


const placeOrder = async (orderData: PlaceOrderType): Promise<OrderResponseType> => {

    if (!orderData.transactionId) return {
        status: false,
        formStatus: {
            accountLast4Digit: "",
            transactionId: "transaction id is required"
        }
    };

    if (!orderData.accountLast4Digit) return {
        status: false,
        formStatus: {
            accountLast4Digit: "Last 4 digit is required.",
            transactionId: ""
        }
    };

    const session = await auth();
    if (!session?.user.id) return {
        status: false,
        pageStatus: "Can't get user session! Please re-login to fix the issue."
    };

    const transictionIdQuery = await db.collection("orders").where("transactionId", "==", orderData.transactionId).get();
    if (!transictionIdQuery.empty) return {
        status: false,
        formStatus: {
            accountLast4Digit: "",
            transactionId: "Transaction id already used in another order."
        }
    };

    const packageDoc = await db.collection(orderData.productType).doc(orderData.docId).collection("packages").doc(orderData.packageId).get();
    const packageData = packageDoc.data() as PackagesType;

    const orderObject: OrderItemType = {
        ...orderData,
        id: uuidv4(),
        orderBy: session.user.id,
        price: packageData.price,
        timestamp: new Date,
        status: "pending",
        title: orderData.productName + " - " + packageData.title
    };

    await db.collection("orders").doc(orderObject.id).set(orderObject);
    await setNotification("Order Placed!", `An order has been placed for ৳${packageData.price} paid via ${orderData.paymentMethod} for ${orderData.productName} - ${packageData.title}. It is in queue. You will be notified once an admin takes care of your order. Happy shopping!`);

    return {
        status: true,
    };
};

export default placeOrder;