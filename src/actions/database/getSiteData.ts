import { cache } from "react";
import { db } from "@/config/firebase.config";
import { SiteDataType } from "@/types/types";


const getSiteData = cache(async () => {
    const docRef = await db.collection("siteData").doc("82e47608-9d24-4733-8d6f-628dffb22af5").get();
    return docRef.data() as SiteDataType;
});

export default getSiteData;