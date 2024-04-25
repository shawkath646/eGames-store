"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/config/firebase.config";
import uploadFile from "@/actions/database/uploadFile";
import { PaymentMethodItemType } from "@/types/types";

const addPaymentMethodItem = async (item: PaymentMethodItemType) => {

    const base64ImagePattern = /^data:image\/(png|jpeg|jpg|gif);base64,(.+)$/;
    if (base64ImagePattern.test(item.icon)) {
        const { downloadURL } = await uploadFile(item.icon, `icon-${item.id}`);
        item.icon = downloadURL;
    }
    
    await db.collection("siteData").doc(process.env.SITEDATA_DOC_ID as string).collection("paymentMethods").doc(item.id).set(item);
    revalidatePath("/admin/settings")
    return true;
};

export default addPaymentMethodItem;