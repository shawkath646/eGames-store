import { cache } from "react";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import timeStampToDate from "@/utils/timestampToDate";
import { NotificationItemType } from "@/types/types";


const getNotifications = cache(async() => {

    const session = await auth();
    if (!session?.user.id) return [];

    const notificationsSnapshot = await db.collection("users").doc(session.user.id).collection("notifications").orderBy("timestamp", "desc").get();
    return notificationsSnapshot.docs.map((doc) => {
        const notification = doc.data() as NotificationItemType;
        notification.timestamp = timeStampToDate(notification.timestamp);
        return notification;
    })
});

export default getNotifications;