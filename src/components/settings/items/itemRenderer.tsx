import Link from "next/link";
import Image from "next/image";
import ItemButtonsContainer from "./itemButtonsContainer";
import AddPackageButton from "./addPackageButton";
import PackageButtonsContainer from "./packageButtonsContainer";
import getPackages from "@/actions/database/admin/settings/items/getPackages";
import { IconType } from "react-icons";
import { ItemType } from "@/types/types";
import { FaShoppingBag } from "react-icons/fa";


export default async function ItemRenderer({ categoryType, item, ItemAltIcon }: { categoryType: string; item: ItemType; ItemAltIcon: IconType }) {

    const packages = await getPackages(categoryType, item.id);

    return (
        <article className="rounded overflow-hidden shadow-lg bg-white p-4 grid grid-cols-1 xl:grid-cols-2 gap-8">
            <section>
                <div className="md:flex justify-between">
                    <div className="flex space-x-4">
                        {item.icon ? (
                            <Image src={item.icon} alt={`${item.name} icon`} height={75} width={75} className="h-[75px] w-[75px] rounded-lg" />
                        ) : (
                            <ItemAltIcon size={60} className="text-gray-600" />
                        )}
                        <div>
                            <p className="font-bold text-3xl mb-1">{item.name}</p>
                            {item.website && <Link href={item.website} target="_blank" className=" text-blue-500 hover:text-blue-600 transition-colors text-sm">{item.website}</Link>}
                        </div>
                    </div>
                    <ItemButtonsContainer item={item} categoryType={categoryType} />
                </div>
                <h2 className="text-xl font-medium text-blue-500 mt-5">Requirements:</h2>
                <p className="text-gray-700 mt-3 text-sm">{item.requirement}</p>
                <h2 className="text-xl font-medium text-blue-500 mt-5">Description:</h2>
                <p className="text-gray-700 mt-3 text-sm">{item.description}</p>
            </section>

            <section>
                <div className="flex items-center justify-between py-2 rounded bg-blue-500/10 text-blue-500 px-4 mb-6">
                    <h2 className="font-semibold text-xl">Packages</h2>
                    <AddPackageButton categoryType={categoryType} docId={item.id} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {packages.map((packageItem, index) => (
                        <article key={index} className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex space-x-6">
                                <div>
                                    {packageItem.icon ? (
                                        <Image src={packageItem.icon} alt={`${packageItem.title} icon`} height={75} width={75} className="h-[75px] w-[75px] rounded-full mx-auto" />
                                    ) : (
                                        <FaShoppingBag size={60} className="text-gray-600 mx-auto" />
                                    )}
                                    <p className="text-lg font-semibold text-gray-900 mt-4 text-center whitespace-nowrap">{packageItem.title}</p>
                                    <p className="text-lg font-semibold text-gray-900 mt-1 text-center whitespace-nowrap">৳{packageItem.price}</p>
                                </div>
                                <div>
                                    <p>User will get:</p>
                                    <p className="text-gray-700 text-sm mt-1 line-clamp-5">{packageItem.description}</p>
                                </div>
                            </div>
                            <PackageButtonsContainer categoryType={categoryType} docId={item.id} packageItem={packageItem} />
                        </article>
                    ))}
                </div>
            </section>

        </article>
    );
}