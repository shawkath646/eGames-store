import { cache } from "react";
import { db } from "@/config/firebase.config";
import { ImageObjectType, PaymentMethodItemType } from "@/types/types";

const getSiteData = cache(async () => {
    const docRef = await db.collection("siteData").doc(process.env.SITEDATA_DOC_ID as string).get();
    const bannerImagesSnapshot = await docRef.ref.collection("bannerImages").get();
    const bannerImages = bannerImagesSnapshot.docs.map(doc => doc.data() as ImageObjectType);

    const paymentMethodsSnapshot = await docRef.ref.collection("paymentMethods").get();
    const paymentMethods = paymentMethodsSnapshot.docs.map(doc => doc.data() as PaymentMethodItemType);

    return {
        bannerImages,
        paymentMethods
    }
});

export default getSiteData;