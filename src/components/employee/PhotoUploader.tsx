
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { FormLabel } from "@/components/ui/form";

interface PhotoUploaderProps {
  photoPreview: string | null;
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhotoUploader = ({ photoPreview, onPhotoChange }: PhotoUploaderProps) => {
  return (
    <div className="w-full md:w-1/3">
      <FormLabel className="block mb-2">Employee Photo</FormLabel>
      <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center">
        <div className="w-40 h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          {photoPreview ? (
            <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-400 flex flex-col items-center">
              <Upload className="h-10 w-10 mb-2" />
              <span>No photo</span>
            </div>
          )}
        </div>
        <input
          type="file"
          id="photo"
          accept="image/*"
          onChange={onPhotoChange}
          className="hidden"
        />
        <label
          htmlFor="photo"
          className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-sm text-gray-700 inline-flex items-center"
        >
          <Upload className="h-4 w-4 mr-2" />
          Browse Photo
        </label>
      </div>
    </div>
  );
};

export default PhotoUploader;
