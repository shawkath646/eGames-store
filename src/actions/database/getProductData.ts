import { cache } from "react";
import { db } from "@/config/firebase.config";
import { PackageItemType, ItemType } from "@/types/types";


const getProductData = cache(async(productType: string, productId: string) => {
    
    const productRef = await db.collection(productType).doc(productId).get();
    if (!productRef.exists) return null;
    const packages = await productRef.ref.collection("packages").get();

    return {
        product: productRef.data() as ItemType,
        packages: packages.docs.map(doc => doc.data() as PackageItemType)
    }
});

export default getProductData;