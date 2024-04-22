import { redirect } from "next/navigation";
import OrderBox from "./orderBox";
import getProductPackage from "@/actions/database/order/getProductPackage";

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

    let productType = searchParams.productType, packageId = searchParams.packageId, docId = searchParams.docId, productName = searchParams.productName;

    if (Array.isArray(productType)) productType = productType[0];
    if (Array.isArray(packageId)) packageId = packageId[0];
    if (Array.isArray(docId)) docId = docId[0];
    if (Array.isArray(productName)) productName = productName[0];

    if (!productType || !packageId || !docId || !productName) redirect("/not-found");

    const packageData = await getProductPackage({ productType, packageId, docId });

    return <OrderBox packageData={packageData} productName={productName} productType={productType} packageId={packageId} docId={docId} />;
}