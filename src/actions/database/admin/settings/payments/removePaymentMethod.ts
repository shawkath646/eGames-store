"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/config/firebase.config";
import deleteFileByName from "@/actions/database/deleteFileByName";

const removePaymentMethod = async (methodId: string) => {
    await deleteFileByName(`icon-${methodId}`);
    await db.collection("siteData").doc(process.env.SITEDATA_DOC_ID as string).collection("paymentMethods").doc(methodId).delete();
    revalidatePath("/admin/settings");
    return true;
};

export default removePaymentMethod;