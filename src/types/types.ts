export interface TimestampFieldValue {
    _seconds: number;
    _nanoseconds: number;
}

export interface ItemType {
    id: string;
    name: string;
    icon: string;
    description: string;
    website: string;
}

export interface UserDataType {
    id: string;
    email: string;
    fullName: string;
    joinedOn: Date;
    password?: string;
    role: string;
    totalSpent: number;
    image: string;
}

export interface CreateUserType {
    email: string;
    picture: string;
    name?: string | null;
}

export interface NotificationItemType {
    id: string;
    title: string;
    description: string;
    timestamp: Date;
    isRead: boolean;
}

export interface PackagesType {
    price: number;
    title: string;
    icon: string;
    id: string;
}

export interface OrderItemType {
    id: string;
    title: string;
    timestamp: Date;
    price: number;
    paymentMethod: string;
    accountLast4Digit: string;
    transactionId: string;
    packageId: string;
    productType: string;
    docId: string;
    status: "pending" | "recieved" | "cancelled" | "completed";
    orderBy: string;
}

export interface PlaceOrderType {
    productType: string;
    packageId: string;
    docId: string;
    paymentMethod: string;
    accountLast4Digit: string;
    transactionId: string;
    productName: string;
}

export interface OrderResponseType {
    status: boolean;
    pageStatus?: string;
    formStatus?: {
        accountLast4Digit: string;
        transactionId: string;
    }
}

export interface FetchedNotificationQuery {
    notifications: NotificationItemType[];
    unreadNotificationNumber: number;
}