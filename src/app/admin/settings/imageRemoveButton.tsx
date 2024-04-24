"use client";
import bannerImageRemove from "@/actions/database/admin/settings/bannerImageRemove";

export default function ImageRemoveButton({ imageId }: { imageId: string; }) {
    return (
        <button type="button" onClick={() => bannerImageRemove(imageId)} className="border border-red-500 text-red-500 w-full inline-flex py-0.5 justify-center text-sm hover:bg-red-500/20 hover:text-red-600 hover:border-red-600 transition-all rounded font-medium">Remove</button>
    );
}
