import React from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({ onDrop, accept, fileHolder }: any) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
  });
  return (
    <div
      className={`z-10 my-4 flex ${
        fileHolder === null ? "border" : ""
      } border-dashed border-zinc-700 bg-transparent shadow-xl dark:border-zinc-100`}
      {...getRootProps()}
    >
      <label
        htmlFor="upload"
        className="flex h-48 w-48 cursor-pointer items-center justify-center"
      >
        <input className="dropzone-input" {...getInputProps()} />
        {fileHolder !== null && !isDragActive ? (
          <div>
            {!fileHolder ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <span id="drop" className="text-md text-black">
                  Upload Image
                  <br />
                  <span className="text-sm flex justify-center">
                    Click or drag
                  </span>
                </span>
              </>
            ) : fileHolder ? (
              <img
                src={fileHolder}
                className="h-32 w-32 rounded-full"
                alt="upload"
              />
            ) : null}
          </div>
        ) : isDragActive ? (
          <div className="-mt-12">Drop File!</div>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 fill-transparent stroke-zinc-700 dark:stroke-zinc-400"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span
              id="drop"
              className="text-md text-zinc-700 dark:text-zinc-400"
            >
              Upload Image
              <br />
              <span className="text-sm">Click or drag</span>
            </span>
          </>
        )}
      </label>
    </div>
  );
};

export default Dropzone;
