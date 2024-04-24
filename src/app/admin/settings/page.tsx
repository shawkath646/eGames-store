import Image from "next/image";
import GalleryImageUploader from "./GalleryImageUploader";
import getSiteData from "@/actions/database/getSiteData";
import bannerImageUpload from "@/actions/database/admin/settings/bannerImageUpload";
import { IoSettings } from "react-icons/io5";
import ImageRemoveButton from "./imageRemoveButton";

export default async function Page() {

    const siteData = await getSiteData();

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
                        <GalleryImageUploader onImageLoad={bannerImageUpload} acceptMultiple />
                    </div>
                </section>

                <section className="mt-10">
                    <h2 className="font-medium text-2xl mb-5 text-indigo-500 py-2 px-3 rounded bg-indigo-500/10">Payment Method</h2>
                </section>
            </div>
        </main>

    );
}