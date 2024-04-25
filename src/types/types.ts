type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

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
    requirement: string;
}

export interface UserDataType {
    id: string;
    email: string;
    fullName: string;
    joinedOn: Date;
    password?: string;
    role: string;
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

export interface PackageItemType {
    price: number;
    title: string;
    icon: string;
    id: string;
    description: string;
}

export interface OrderItemType {
    id: string;
    title: string;
    timestamp: Date;
    price: number;
    paymentMethod: string;
    accountLast4Digit?: string;
    transactionId?: string;
    voucherCode?: string;
    packageId: string;
    productType: string;
    docId: string;
    status: "pending" | "received" | "cancelled" | "completed" | "rejected";
    details: string;
    orderBy: string;
}

export interface OrderBoxFormType {
    productType: string;
    packageId: string;
    docId: string;
    paymentMethod: string;
    accountLast4Digit?: string;
    transactionId?: string;
    voucherCode?: string;
    productName: string;
    details: string;
}

export interface FetchedNotificationQuery {
    notifications: NotificationItemType[];
    unreadNotificationNumber: number;
}

export interface SignInFormType {
    emailAddress: string;
    password: string;
    showPassword: boolean;
}

export interface PaymentMethodItemType {
    id: string;
    name: string;
    icon: string;
    accounts: string[];
}

export interface VoucherItemType {
    code: string;
    id: string;
    isUsed: boolean;
    timestamp: Date;
    validUntil: Date;
    value: number;
    createdBy: string;
}

export interface ImageObjectType {
    id: string;
    src: string;
    height: number;
    width: number;
}
