"use client";
import { useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import { IoCloudUploadOutline } from "react-icons/io5";
import { ImageObjectType } from "@/types/types";

export default function GalleryImagePicker({ onImageLoad, acceptMultiple }: { onImageLoad: (imageObject: ImageObjectType) => Promise<boolean | void>; acceptMultiple?: boolean }) {

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;
    
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.size > 3 * 1024 * 1024) continue;
    
            const reader = new FileReader();
            reader.readAsDataURL(file);
    
            reader.onload = async () => {
                const base64 = reader.result as string;
    
                const img = new Image();
                img.src = base64;
    
                img.onload = async () => {
                    const fileObject: ImageObjectType = {
                        id: uuidv4(),
                        height: img.height,
                        width: img.width,
                        src: base64
                    };
                    await onImageLoad(fileObject);
                };
            };
        }
    };
    

    return (
        <div>
            <button type="button" onClick={() => inputRef.current?.click()} className="w-[120px] h-[120px] flex flex-col justify-center items-center text-gray-500 border border-gray-500 hover:text-gray-700 hover:border-gray-700 transition-colors rounded-lg border-dashed outline-none">
                <IoCloudUploadOutline size={40} />
                <p className="font-medium text-sm">Upload picture</p>
            </button>
            <input type="file" ref={inputRef} onChange={handleFileChange} accept="image/*" multiple={acceptMultiple} hidden />
        </div>
    );
}