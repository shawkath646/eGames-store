import { cache } from "react";
import { db } from "@/config/firebase.config";
import { PackagesType } from "@/types/types";

const getProductPackage = cache(async({ productType, docId, packageId }: { productType: string; docId: string; packageId: string }) => {
    const docRef = await db.collection(productType).doc(docId).collection("packages").doc(packageId).get();
    return docRef.data() as PackagesType;
});

export default getProductPackage;