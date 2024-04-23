"use server";
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/config/firebase.config';
import { CreateUserType, UserDataType } from "@/types/types";


const createUser = async(userData: CreateUserType) => {

    const userObject: UserDataType = {
        role: "user",
        joinedOn: new Date,
        email: userData.email,
        fullName: userData.name || "Untracked user",
        id: uuidv4(),
        image: userData.picture
    };

    const docRef = await db.collection("users").doc(userObject.id).get();
    if (!docRef.exists) await db.collection("users").doc(userObject.id).set(userObject);
    
    return userObject;
};

export default createUser;