"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/config/firebase.config";
import getPackages from "./getPackages";
import removePackage from "./removePackage";

const removeItem = async (categoryType: string, itemId: string) => {
    const packages = await getPackages(categoryType, itemId);
    packages.forEach(async (packageItem) => await removePackage(categoryType, itemId, packageItem.id));
    await db.collection(categoryType).doc(itemId).delete();
    revalidatePath("/admin/settings");
    return true;
};

export default removeItem;