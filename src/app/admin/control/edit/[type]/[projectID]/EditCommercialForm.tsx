"use client";

import TextEditor from "~/components/TextEditor";
import { useCallback, useRef, useState } from "react";
import Dropzone from "~/components/Dropzone";
import { Row } from "~/types/db";
import { useRouter } from "next/navigation";
import AddImageToS3 from "../../../create/[type]/s3Upload";

export default function EditFilmForm(project: Row) {
  const [editorContent, setEditorContent] = useState<string>("");
  const [images, setImages] = useState<(File | Blob)[]>([]);
  const [imageHolder, setImageHolder] = useState<(string | ArrayBuffer)[]>([]);
  const [savingAsDraft, setSavingAsDraft] = useState<boolean>(true);
  const [submitButtonLoading, setSubmitButtonLoading] =
    useState<boolean>(false);
  const [deleteButtonLoading, setDeleteButtonLoading] =
    useState<boolean>(false);

  const router = useRouter();

  const postCheckboxRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const handleImageDrop = useCallback((acceptedFiles: Blob[]) => {
    acceptedFiles.forEach((file: Blob) => {
      setImages((prevImages) => [...prevImages, file]);
      const reader = new FileReader();
      reader.onload = () => {
        const str = reader.result;
        if (str) setImageHolder((prevHeldImages) => [...prevHeldImages, str]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const savingStateToggle = () => {
    setSavingAsDraft(!savingAsDraft);
  };

  const editCommercialPage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitButtonLoading(true);
    if (titleRef.current && linkRef.current) {
      // Use Array.prototype.map() to create an array of promises
      const uploadPromises = images.map((image) =>
        AddImageToS3(image, titleRef.current!.value, "commercial")
      );

      // Use Promise.all() to wait for all promises to resolve
      const keys = await Promise.all(uploadPromises);

      // Join all keys into a single string with commas
      const attachmentString = keys.join(",");

      const data = {
        title:
          project.Title !== titleRef.current.value
            ? titleRef.current.value
            : null,
        blurb: project.Title !== editorContent ? editorContent : null,
        embedded_link:
          project.Embedded_Link !== linkRef.current.value
            ? linkRef.current.value
            : null,
        attachments:
          project.Attachments !== attachmentString ? attachmentString : null,
        published: !savingAsDraft,
      };
      await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/project-manipulation`,
        { method: "PATCH", body: JSON.stringify(data) }
      );
    }
    setSubmitButtonLoading(false);
  };

  const deletePost = async () => {
    setDeleteButtonLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/database/delete-by-id`, {
      method: "POST",
      body: JSON.stringify({ id: project.id }),
    });
    router.back();
    router.refresh();
    setDeleteButtonLoading(false);
  };

  return (
    <div className="py-8 overflow-scroll">
      <div className="text-2xl text-center">Edit A Commercial Post</div>
      <div className="flex justify-end">
        <button
          type="submit"
          onClick={deletePost}
          className={`${
            !deleteButtonLoading
              ? "w-40 border-red-500 bg-red-400 hover:bg-red-500"
              : "w-36 border-zinc-500 bg-zinc-400 hover:bg-zinc-500"
          } rounded border mr-12 text-white shadow-md transform active:scale-90 transition-all duration-300 ease-in-out px-4 py-2`}
        >
          {!deleteButtonLoading ? "Delete Post" : "Loading..."}
        </button>
      </div>
      <div className="flex justify-center">
        <form
          onSubmit={editCommercialPage}
          className="flex flex-col align-middle justify-evenly w-1/2"
        >
          <div className="input-group mx-auto">
            <input
              ref={titleRef}
              type="text"
              className="bg-transparent w-[500px] underlinedInput"
              name="title"
              required
              placeholder=" "
            />
            <span className="bar"></span>
            <label className="underlinedInputLabel">Title</label>
          </div>
          <div className="py-4">
            <div className="text-center font-light text-lg">
              Enter Blurb below (optional)
            </div>
            <div className="pt-4 prose lg:prose-lg ProseMirror">
              <TextEditor updateContent={setEditorContent} />
            </div>
          </div>
          <div className="input-group mx-auto">
            <input
              ref={linkRef}
              type="text"
              className="bg-transparent w-[500px] underlinedInput"
              name="link"
              placeholder=" "
            />
            <span className="bar"></span>
            <label className="underlinedInputLabel">
              Link to embed (optional)
            </label>
          </div>
          <div className="flex flex-col">
            <div className="text-center text-lg pt-4 -mb-2 font-light">
              Awards / other images
            </div>
            <div className="mx-auto flex">
              {images.map((image, index) => (
                // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
                <img
                  key={index}
                  src={imageHolder[index] as string}
                  className="w-36 h-36 my-auto mx-4"
                />
              ))}
              <Dropzone
                onDrop={handleImageDrop}
                acceptedFiles={"image/jpg, image/jpeg, image/png"}
              />
            </div>
          </div>
          <div className="flex justify-evenly pt-4">
            <div className="flex my-auto">
              <input
                type="checkbox"
                className="my-auto"
                checked={!savingAsDraft}
                ref={postCheckboxRef}
                onClick={savingStateToggle}
                readOnly
              />
              <div className="my-auto px-2 text-sm font-normal">
                Check to Post
              </div>
            </div>
            <button
              type={submitButtonLoading ? "button" : "submit"}
              disabled={submitButtonLoading}
              className={`${
                submitButtonLoading
                  ? "w-32 bg-zinc-500"
                  : !savingAsDraft
                  ? "w-32 border-emerald-500 bg-emerald-400 hover:bg-emerald-500"
                  : "w-36 border-blue-500 bg-blue-400 hover:bg-blue-500 "
              } rounded border text-white shadow-md transform active:scale-90 transition-all duration-300 ease-in-out px-4 py-2`}
            >
              {submitButtonLoading
                ? "Loading..."
                : !savingAsDraft
                ? "Post!"
                : "Save as Draft"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
