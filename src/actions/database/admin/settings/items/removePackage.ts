"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/config/firebase.config";
import deleteFileByName from "@/actions/database/deleteFileByName";

const removePackage = async (categoryType: string, docId: string, packageId: string) => {
    await deleteFileByName(`icon-${packageId}`);
    await db.collection(categoryType).doc(docId).collection("packages").doc(packageId).delete();
    revalidatePath("/admin/settings");
    return true;
};

export default removePackage;