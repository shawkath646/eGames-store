import { cache } from "react";
import { db } from "@/config/firebase.config";
import { ItemType } from "@/types/types";

const getVoucherItems = cache(async() => {
    const vouchersSnapshot = await db.collection("vouchers").get();
    return vouchersSnapshot.docs.map(doc => doc.data() as ItemType);
});

export default getVoucherItems;