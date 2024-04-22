import { cache } from "react";
import { db } from "@/config/firebase.config";
import { ItemType } from "@/types/types";

const getGameItems = cache(async() => {
    const gamesSnapshot = await db.collection("games").get();
    return gamesSnapshot.docs.map(doc => doc.data() as ItemType);
});

export default getGameItems;