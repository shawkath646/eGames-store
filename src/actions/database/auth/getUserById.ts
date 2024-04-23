import { cache } from "react";
import { db } from "@/config/firebase.config";
import { UserDataType } from "@/types/types";
import timeStampToDate from "@/utils/timestampToDate";

const getUserById = cache(async (userId: string) => {
    const userDoc = await db.collection("users").doc(userId).get();
    const userData = userDoc.data() as UserDataType;
    userData.joinedOn = timeStampToDate(userData.joinedOn);
    return userData;
});

export default getUserById;