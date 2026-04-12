"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";

import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

export const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 transition-colors hover:border-sky-300 hover:bg-sky-50/40"
    >
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt="uploaded image"
          className="max-h-[320px] rounded-lg object-cover"
        />
      ) : (
        <>
          <FaCloudUploadAlt className="size-16 text-sky-600" />
          <div className="space-y-1 text-center text-slate-600">
            <p className="text-sm">
              <span className="font-semibold text-sky-700">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-slate-500">
              SVG, PNG, JPG or GIF (max 800x400)
            </p>
          </div>
        </>
      )}
    </div>
  );
};
