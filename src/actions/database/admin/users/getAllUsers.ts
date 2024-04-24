import { cache } from "react";
import { db } from "@/config/firebase.config";
import { UserDataType } from "@/types/types";
import timeStampToDate from "@/utils/timestampToDate";


const getAllUsers = cache(async () => {
    const usersSnapshot = await db.collection("users").orderBy("joinedOn", "desc").get();
    return usersSnapshot.docs.map((doc) => {
        const userItem = doc.data() as UserDataType;
        userItem.joinedOn = timeStampToDate(userItem.joinedOn);
        return userItem;
    });
});

export default getAllUsers;