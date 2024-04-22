import { cache } from "react";
import { db } from "@/config/firebase.config";
import { ItemType } from "@/types/types";

const getSubscriptionItems = cache(async() => {
    const subscriptionsSnapshot = await db.collection("subscriptions").get();
    return subscriptionsSnapshot.docs.map(doc => doc.data() as ItemType);
});

export default getSubscriptionItems;