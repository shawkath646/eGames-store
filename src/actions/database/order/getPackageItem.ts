import { cache } from "react";
import { db } from "@/config/firebase.config";
import { PackageItemType } from "@/types/types";

const getPackageItem = cache(async({ productType, docId, packageId }: { productType: string; docId: string; packageId: string }) => {
    const docRef = await db.collection(productType).doc(docId).collection("packages").doc(packageId).get();
    return docRef.data() as PackageItemType;
});

export default getPackageItem;