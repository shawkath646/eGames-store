import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/firebase.config";
import jwt from "jsonwebtoken";
import timeStampToDate from "@/utils/timestampToDate";
import { NotificationItemType } from "@/types/types";

export async function GET(request: NextRequest) {

    const authorizationToken = request.headers.get("authorization");
    if (!authorizationToken) return NextResponse.json({ error: "Authorization header not found!" }, { status: 400 });
    const isTokenValid = jwt.verify(authorizationToken.split("Bearer ")[1], process.env.SHAS_APP_SECRET as string);
    if (!isTokenValid) return NextResponse.json({ error: "Invalid authorization header found!" }, { status: 400 });

    const userId = request.nextUrl.searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "User id not found!" }, { status: 400 });
    
    const unreadNotifications = await db.collection("users").doc(userId).collection("notifications").where("isRead", "==", false).get();
    const notificationsQuery = await db.collection("users").doc(userId).collection("notifications").orderBy("timestamp", "desc").limit(3).get();

    const notifications = notificationsQuery.docs.map((doc) => {
        const notificationItem = doc.data() as NotificationItemType;
        notificationItem.timestamp = timeStampToDate(notificationItem.timestamp);
        return notificationItem;
    });

    return NextResponse.json({
        notifications,
        unreadNotificationNumber: unreadNotifications.size
    }, { status: 200 });
};