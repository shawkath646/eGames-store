import Image from "next/image";
import GalleryImagePicker from "./galleryImagePicker";
import ImageRemoveButton from "./imageRemoveButton";
import AddPaymentMethod from "@/components/settings/payments/addPaymentMethod";
import PaymentItemButtonContainer from "@/components/settings/payments/paymentItemButtonContainer";
import ItemRenderer from "@/components/settings/items/itemRenderer";
import AddItemButton from "@/components/settings/items/addItemButton";
import getSiteData from "@/actions/database/getSiteData";
import getGameItems from "@/actions/database/home/getGameItems";
import bannerImageUpload from "@/actions/database/admin/settings/bannerImageUpload";
import getPlayCardItems from "@/actions/database/home/getPlayCardItems";
import getSubscriptionItems from "@/actions/database/home/getSubscriptionItems";
import getVoucherItems from "@/actions/database/home/getVoucherItems";
import { FaGooglePlay } from "react-icons/fa";
import { IoLogoGameControllerB } from "react-icons/io";
import { IoSettings, IoAlertCircle, IoWallet } from "react-icons/io5";
import { MdLocalMovies } from "react-icons/md";
import { BsFillTicketPerforatedFill } from "react-icons/bs";



export default async function Page() {

    const siteData = await getSiteData();

    const itemsData = [
        {
            name: "Games",
            categoryType: "games",
            items: await getGameItems(),
            icon: IoLogoGameControllerB
        },
        {
            name: "Play Cards",
            categoryType: "playCards",
            items: await getPlayCardItems(),
            icon: FaGooglePlay
        },
        {
            name: "Subscriptions",
            categoryType: "subscriptions",
            items: await getSubscriptionItems(),
            icon: MdLocalMovies
        },
        {
            name: "Vouchers",
            categoryType: "vouchers",
            items: await getVoucherItems(),
            icon: BsFillTicketPerforatedFill
        },
    ];

    return (
        <main className="w-full bg-white text-black">
            <div className="min-h-[700px] container mx-auto pt-28 pb-20 px-5 lg:px-0">
                <div className="flex items-center justify-center space-x-3">
                    <IoSettings size={24} className="text-blue-500" />
                    <h1 className="text-3xl font-bold text-blue-500">Settings</h1>
                </div>

                <section className="mt-10">
                    <h2 className="font-medium text-2xl mb-5 text-indigo-500 py-2 px-3 rounded bg-indigo-500/10">Homepage Banner</h2>
                    <div className="flex flex-wrap gap-3">
                        {siteData.bannerImages.map((item, index) => (
                            <div key={index} className="space-y-2">
                                <Image src={item} alt={`Banner image ${index}`} height={120} width={120} className="h-[120px] w-[120px] rounded" />
                                <ImageRemoveButton imageId={item.id} />
                            </div>
                        ))}
                        <GalleryImagePicker onImageLoad={bannerImageUpload} acceptMultiple />
                    </div>
                </section>

                <section className="mt-10">
                    <div className="mb-5 text-indigo-500 py-2 px-3 rounded bg-indigo-500/10 flex justify-between items-center">
                        <h2 className="font-medium text-2xl">Payment Method</h2>
                        <AddPaymentMethod />
                    </div>
                    {!!siteData.paymentMethods.length ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {siteData.paymentMethods.map((item, index) => (
                                <article key={index} className="p-5 shadow-lg rounded bg-white">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            {item.icon ? (
                                                <Image src={item.icon} alt={`${item.name} icon`} height={40} width={40} className="h-[40px] w-[40px] rounded" />
                                            ) : (
                                                <IoWallet size={40} className="text-blue-500" />
                                            )}
                                            <p className="font-medium text-xl text-gray-800">{item.name}</p>
                                        </div>
                                        <PaymentItemButtonContainer item={item} />
                                    </div>
                                    <div className="mt-3">
                                        <h2 className="text-xl font-medium text-blue-500">Account Numbers:</h2>
                                        <ul className="list-disc list-inside mt-2 text-gray-700">
                                            {item.accounts.map((num, index) => <li key={index}>{num}</li>)}
                                        </ul>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="h-[300px] w-full flex items-center justify-center text-gray-800 space-x-3">
                            <p className="font-medium text-xl">No payment method found</p>
                            <IoAlertCircle size={24} />
                        </div>
                    )}
                </section>
                {itemsData.map((categoryItem, index) => (
                    <section key={index} className="mt-10">
                        <div className="mb-5 text-indigo-500 py-2 px-3 rounded bg-indigo-500/10 flex justify-between items-center">
                            <h2 className="font-medium text-2xl capitalize">{categoryItem.name}</h2>
                            <AddItemButton categoryType={categoryItem.categoryType} />
                        </div>
                        {!!categoryItem.items.length ? (
                            categoryItem.items.map((item, index) => <ItemRenderer key={index} categoryType={categoryItem.categoryType} item={item} ItemAltIcon={categoryItem.icon} />)
                        ) : (
                            <div className="h-[300px] w-full flex items-center justify-center text-gray-800 space-x-3">
                                <p className="font-medium text-xl">No {categoryItem.name} found</p>
                                <IoAlertCircle size={24} />
                            </div>
                        )}
                    </section>
                ))}
            </div>
        </main>

    );
}