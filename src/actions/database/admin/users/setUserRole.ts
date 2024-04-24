"use server";
import { revalidatePath } from 'next/cache'
import { db } from "@/config/firebase.config";

const setUserRole = async (userId: string, role: string) => {
    const userDoc = await db.collection("users").doc(userId).get();
    if (!userDoc.exists) return false;

    await userDoc.ref.set({ role }, { merge: true });
    revalidatePath("/admin/users");
    return true;
};

export default setUserRole;