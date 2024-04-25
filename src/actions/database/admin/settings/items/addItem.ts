"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/config/firebase.config";
import uploadFile from "@/actions/database/uploadFile";
import { ItemType } from "@/types/types";

const addItem = async (type: string, item: ItemType) => {
    const base64ImagePattern = /^data:image\/(png|jpeg|jpg|gif);base64,(.+)$/;
    if (base64ImagePattern.test(item.icon)) {
        const { downloadURL } = await uploadFile(item.icon, `icon-${item.id}`);
        item.icon = downloadURL;
    };

    await db.collection(type).doc(item.id).set(item);
    revalidatePath("/admin/settings")
    return true;
};

export default addItem;