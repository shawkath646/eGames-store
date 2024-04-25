import type { Metadata } from "next";
import { redirect } from "next/navigation";
import OrderBox from "./orderBox";
import getPackageItem from "@/actions/database/order/getPackageItem";
import getSiteData from "@/actions/database/getSiteData";
import { PropsType } from "@/types/types";

export const metadata: Metadata = {
    title: "Place order"
};

export default async function Page({ searchParams }: PropsType) {

    let productType = searchParams.productType, packageId = searchParams.packageId, docId = searchParams.docId, productName = searchParams.productName;

    if (Array.isArray(productType)) productType = productType[0];
    if (Array.isArray(packageId)) packageId = packageId[0];
    if (Array.isArray(docId)) docId = docId[0];
    if (Array.isArray(productName)) productName = productName[0];

    if (!productType || !packageId || !docId || !productName) redirect("/not-found");

    const siteData = await getSiteData();
    const packageItem = await getPackageItem({ productType, packageId, docId });

    return <OrderBox packageItem={packageItem} productName={productName} productType={productType} packageId={packageId} docId={docId} paymentMethods={siteData.paymentMethods} />;
}