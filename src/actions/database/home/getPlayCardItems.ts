import { cache } from "react";
import { db } from "@/config/firebase.config";
import { ItemType } from "@/types/types";

const getPlayCardItems = cache(async() => {
    const playCardsSnapshot = await db.collection("playCards").get();
    return playCardsSnapshot.docs.map(doc => doc.data() as ItemType);
});

export default getPlayCardItems;