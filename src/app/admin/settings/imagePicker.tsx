"use client";
import Image from "next/image";
import { useRef } from "react";

export default function ImagePicker({ label = "Select picture", currentImage, onImageSelect }: { label?: string; currentImage: string; onImageSelect: (base64: string) => void }) {

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        if (file.size > 3 * 1024 * 1024) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64 = reader.result as string;
            onImageSelect(base64)
        };
    };

    return (
        <div className="mb-4">
            <label className="block font-medium mb-3 text-sm text-blue-500">{label}:</label>
            <div className="flex items-center space-x-2">
                {currentImage && (
                    <div className="rounded overflow-hidden">
                        <Image src={currentImage} alt={`${label} preview`} height={60} width={60} className="h-[60px] w-[60px]" />
                    </div>
                )}
                <button type="button" onClick={() => inputRef.current?.click()} className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                    {currentImage ? "Change" : "Add"}
                </button>
                {currentImage && (
                    <button type="button" onClick={() => onImageSelect("")} className="inline-block px-4 py-2 text-sm font-medium text-red-500 rounded-md bg-red-500/10 hover:bg-red-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2">
                        Remove
                    </button>
                )}
            </div>
            <input type="file" ref={inputRef} onChange={handleFileChange} accept="image/*" hidden />
        </div>
    );
}