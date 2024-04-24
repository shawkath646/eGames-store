"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/config/firebase.config";
import deleteFileByName from "../../deleteFileByName";

const bannerImageRemove = async (imageId: string) => {
    await deleteFileByName(`banner-${imageId}`);
    await db.collection("siteData").doc(process.env.SITEDATA_DOC_ID as string).collection("bannerImages").doc(imageId).delete();
    revalidatePath("/admin/settings");
    return true;
};

export default bannerImageRemove;