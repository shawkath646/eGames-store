"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/config/firebase.config";
import uploadFile from "@/actions/database/uploadFile";
import { PackageItemType } from "@/types/types";

const addPackage = async (categoryType: string, docId: string, packageItem: PackageItemType) => {

    const base64ImagePattern = /^data:image\/(png|jpeg|jpg|gif);base64,(.+)$/;
    if (base64ImagePattern.test(packageItem.icon)) {
        const { downloadURL } = await uploadFile(packageItem.icon, `icon-${packageItem.id}`);
        packageItem.icon = downloadURL;
    };

    await db.collection(categoryType).doc(docId).collection("packages").doc(packageItem.id).set(packageItem);
    revalidatePath("/admin/settings");
    return true;
};

export default addPackage;