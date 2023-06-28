"use client";

import TextEditor from "~/components/TextEditor";
import { useCallback, useRef, useState } from "react";
import Dropzone from "~/components/Dropzone";

export default function CreateMovieForm() {
  const [editorContent, setEditorContent] = useState<string>("");
  const [images, setImages] = useState<(File | Blob)[]>([]);
  const [imageHolder, setImageHolder] = useState<string | ArrayBuffer | null>(
    null
  );

  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const handleImageDrop = useCallback((acceptedFiles: Blob[]) => {
    acceptedFiles.forEach((file: Blob) => {
      setImages((prevImages) => [...prevImages, file]);
      const ext = file.type.split("/")[1];
      // if (ext) {
      //   setImageExt(ext);
      // } else {
      //   throw new Error("file extension not found");
      // }
      const reader = new FileReader();
      reader.onload = () => {
        const str = reader.result;
        setImageHolder(str);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const createMoviePage = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen py-8">
      <div className="text-2xl text-center">Create A Movie Post</div>
      <div className="flex justify-center">
        <form
          onSubmit={createMoviePage}
          className="flex flex-col align-middle justify-evenly w-1/2"
        >
          <div className="input-group">
            <input
              ref={titleRef}
              type="text"
              className="bg-transparent w-[500px]"
              name="title"
              placeholder=" "
            />
            <span className="bar"></span>
            <label>Title</label>
          </div>
          <div className="pt-4">
            <TextEditor updateContent={setEditorContent} />
          </div>

          <div className="input-group">
            <input
              ref={linkRef}
              type="text"
              className="bg-transparent w-[500px]"
              name="link"
              placeholder=" "
            />
            <span className="bar"></span>
            <label>Link to embed</label>
          </div>
          {images.map((image) => (
            <Dropzone
              key={images.indexOf(image)}
              onDrop={handleImageDrop}
              acceptedFiles={"image/jpg, image/jpeg, image/png"}
              fileHolder={image}
            />
          ))}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="rounded border text-white shadow-md border-emerald-500 bg-emerald-400 hover:bg-emerald-500 active:scale-90 transition-all duration-300 ease-in-out px-4 py-2"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
