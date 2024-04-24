"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/config/firebase.config";
import uploadFile from "../../uploadFile";
import { ImageObjectType } from "@/types/types";

const bannerImageUpload = async (imageObject: ImageObjectType) => {
    
    const { downloadURL } = await uploadFile(imageObject.src, `banner-${imageObject.id}`);
    imageObject.src = downloadURL;

    await db.collection("siteData").doc(process.env.SITEDATA_DOC_ID as string).collection("bannerImages").doc(imageObject.id).set(imageObject);
    revalidatePath("/admin/settings");
    return true;
};

export default bannerImageUpload;