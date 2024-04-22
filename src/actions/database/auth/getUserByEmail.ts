import { cache } from "react";
import { db } from "@/config/firebase.config";
import timeStampToDate from "@/utils/timestampToDate";
import { UserDataType } from "@/types/types";

const getUserByEmail = cache(async(userEmail: string) => {
    const docRef = await db.collection("users").where("email", "==", userEmail).get();
    if (docRef.empty) return null;
    const userData = docRef.docs[0].data() as UserDataType;
    userData.joinedOn = timeStampToDate(userData.joinedOn);
    return userData;
});

export default getUserByEmail;