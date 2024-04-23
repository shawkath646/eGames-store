import { cache } from "react";
import { db } from "@/config/firebase.config";
import { PaymentMethodItem } from "@/types/types";

const getPaymentMethods = cache(async() => {
    const paymentMethodsSnapshot = await db.collection("paymentMethods").get();
    return paymentMethodsSnapshot.docs.map(doc => doc.data() as PaymentMethodItem);
});

export default getPaymentMethods;