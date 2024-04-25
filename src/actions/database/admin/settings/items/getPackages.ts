import { cache } from "react";
import { db } from "@/config/firebase.config";
import { PackageItemType } from "@/types/types";

const getPackages = cache(async (itemCategory: string, docId: string) => {
    const packagesSnapshot = await db.collection(itemCategory).doc(docId).collection("packages").get();
    return packagesSnapshot.docs.map(doc => doc.data() as PackageItemType);
});

export default getPackages;