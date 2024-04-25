import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import getProductData from "@/actions/database/getProductData";
import { PropsType } from "@/types/types";
import { CiShoppingTag } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { IoAlertCircle } from "react-icons/io5";
import { IoLogoBuffer } from "react-icons/io5";
import darkBackground from "@/assets/dark-background.jpg";

export async function generateMetadata(
    { searchParams }: PropsType,
): Promise<Metadata> {

    let productType = searchParams.type, productId = searchParams.productId;;

    if (Array.isArray(productType)) productType = productType[0];
    if (Array.isArray(productId)) productId = productId[0];

    if (!productType || !productId) return {
        title: "Product not found"
    }

    const productData = await getProductData(productType, productId);

    return {
        title: productData?.product.name
    }
}

export default async function Page({ searchParams }: PropsType) {

    let productType = searchParams.type, productId = searchParams.productId;;

    if (Array.isArray(productType)) productType = productType[0];
    if (Array.isArray(productId)) productId = productId[0];

    if (!productType || !productId) redirect("/not-found");

    const productData = await getProductData(productType, productId);
    if (!productData) redirect("/not-found");

    const { packages, product } = productData;

    return (
        <main style={{ backgroundImage: `url(${darkBackground.src})` }} className="w-full text-white bg-gray-900 bg-cover bg-center bg-fixed">
            <div className="container mx-auto pt-28 pb-20 lg:pb-40 lg:pt-48 gap-5 px-5 lg:px-0">
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="flex justify-center space-x-8 max-w-xl">
                        <div className="bg-gray-800 rounded h-[80px] w-[80px] flex-shrink-0">
                            {product.icon ? (
                                <Image src={product.icon} alt={`${product.name} icon`} height={80} width={80} className="rounded" />
                            ) : (
                                <IoLogoBuffer size={60} className="text-gray-500 h-[70px] w-[70px] mx-auto mt-1" />
                            )}
                        </div>
                        <div>
                            <p className="font-semibold text-3xl mb-3">{product.name}</p>
                            <p className="text-gray-500 text-sm line-clamp-4 mb-3">{product.description}</p>
                            {!!product.website && (
                                <Link href={product.website} target="_blank" className="py-2 px-8 bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg">Visit website</Link>
                            )}
                        </div>
                    </div>
                    <div className="max-w-xl bg-gray-900 p-5 rounded-lg">
                        <h2 className="text-xl font-medium text-blue-500 mb-2">Requirements:</h2>
                        <p className="text-sm">{product.requirement}</p>
                    </div>
                </section>
                <section className="mt-20">
                    <p className="font-semibold text-3xl mb-8">Available packages</p>
                    {!!packages.length ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
                            {packages.map((item, index) => (
                                <article key={index} className="flex flex-col items-center justify-center bg-gray-900 border rounded-lg border-gray-700 hover:shadow-lg transition duration-300 py-3">
                                    {item.icon ? (
                                        <Image src={item.icon} alt="packages icon" height={110} width={110} />
                                    ) : (
                                        <CiShoppingTag size={60} className="text-gray-600" />
                                    )}
                                    <p className="font-semibold text-2xl mt-5">{item.title} - ৳{item.price}</p>
                                    <h3 className="text-xl font-medium mt-3 mb-1">You will get:</h3>
                                    <p className="text-gray-400 text-sm break-words px-3">{item.description}</p>
                                    <Link href={`/order?productType=${productType}&productName=${productData.product.name}&docId=${product.id}&packageId=${item.id}`} className="mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 flex space-x-2 items-center">
                                        <p>Order Now</p>
                                        <FiShoppingCart size={24} />
                                    </Link>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center space-x-3 text-gray-300 py-14 bg-black/40 rounded">
                            <p className="font-medium text-xl">No package added</p>
                            <IoAlertCircle size={24} />
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}