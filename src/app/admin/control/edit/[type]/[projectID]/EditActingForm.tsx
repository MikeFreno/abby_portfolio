"use client";

import TextEditor from "~/components/TextEditor";
import { useCallback, useRef, useState } from "react";
import Dropzone from "~/components/Dropzone";
import { Acting } from "~/types/db";
import { useRouter } from "next/navigation";
import AddImageToS3 from "../../../create/[type]/s3Upload";
import XCircle from "~/icons/XCircle";
import { env } from "~/env.mjs";

export default function EditActingForm(post: Acting) {
  const [editorContent, setEditorContent] = useState<string>("");
  const [images, setImages] = useState<(File | Blob)[]>([]);
  const [imageHolder, setImageHolder] = useState<(string | ArrayBuffer)[]>([]);
  const [newImageHolder, setNewImageHolder] = useState<
    (string | ArrayBuffer)[]
  >([]);
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
        if (str)
          setNewImageHolder((prevHeldImages) => [...prevHeldImages, str]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const savingStateToggle = () => {
    setSavingAsDraft(!savingAsDraft);
  };

  const editActingPage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitButtonLoading(true);
    if (titleRef.current && linkRef.current) {
      // Use Array.prototype.map() to create an array of promises
      const uploadPromises = images.map((image) =>
        AddImageToS3(
          image,
          titleRef.current!.value.replaceAll(" ", "_"),
          "acting",
        ),
      );

      // Use Promise.all() to wait for all promises to resolve
      let keys = await Promise.all(uploadPromises);

      imageHolder.forEach((image) => keys.push(image as string));

      const data = {
        id: post.id,
        title:
          post.title !== titleRef.current.value.replaceAll(" ", "_")
            ? titleRef.current.value.replaceAll(" ", "_")
            : null,
        blurb: post.blurb !== editorContent ? editorContent : null,
        embedded_link:
          post.link !== linkRef.current.value ? linkRef.current.value : null,
        attachments: keys,
        published: !savingAsDraft,
      };
      await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/acting/update`,
        { method: "PATCH", body: JSON.stringify(data) },
      );
      router.push(`/acting`);
    }
    setSubmitButtonLoading(false);
  };

  const deletePost = async () => {
    setDeleteButtonLoading(true);
    await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/acting/delete/${post.id}`,
      {
        method: "DELETE",
      },
    );
    router.back();
    router.refresh();
    setDeleteButtonLoading(false);
  };
  const removeImage = async (index: number, key: string) => {
    const imgStringArr = post.attachments!.split("\\,");
    const newString = imgStringArr.filter((str) => str !== key).join("\\,");
    const res = await fetch("/api/s3/deleteImage", {
      method: "POST",
      body: JSON.stringify({
        key: key,
        newAttachmentString: newString,
        id: post.id,
      }),
    });
    console.log(res.json());
    setImages((prevImages) =>
      prevImages.filter((_, i) => i !== index - imageHolder.length),
    );
    setImageHolder((prevHeldImages) =>
      prevHeldImages.filter((_, i) => i !== index),
    );
  };

  const removeNewImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setNewImageHolder((prevHeldImages) =>
      prevHeldImages.filter((_, i) => i !== index),
    );
  };

  return (
    <div className="py-8 overflow-scroll">
      <div className="text-2xl text-center">Edit An Acting Post</div>
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
          onSubmit={editActingPage}
          className="flex flex-col align-middle justify-evenly w-1/2"
        >
          <div className="input-group mx-auto">
            <input
              ref={titleRef}
              type="text"
              className="bg-transparent w-[500px] underlinedInput"
              name="title"
              defaultValue={post.title.replaceAll("_", " ")}
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
              <TextEditor
                updateContent={setEditorContent}
                preSet={post.blurb}
              />
            </div>
          </div>
          <div className="input-group mx-auto">
            <input
              ref={linkRef}
              type="text"
              className="bg-transparent w-[500px] underlinedInput"
              name="link"
              defaultValue={post.link ? post.link : ""}
              placeholder={" "}
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
            <div className="flex justify-center">
              <Dropzone
                onDrop={handleImageDrop}
                acceptedFiles={"image/jpg, image/jpeg, image/png"}
              />
            </div>
            <div className="grid grid-cols-6 gap-4 -mx-24">
              {imageHolder.map((key, index) => (
                <div key={index}>
                  <button
                    type="button"
                    className="absolute ml-4 pb-[120px] hover:bg-white hover:bg-opacity-80"
                    onClick={() => removeImage(index, key as string)}
                  >
                    <XCircle
                      height={24}
                      width={24}
                      stroke={"black"}
                      strokeWidth={1}
                    />
                  </button>
                  {/* eslint-disable-next-line @next/next/no-img-element,
                    jsx-a11y/alt-text */}
                  <img
                    src={env.NEXT_PUBLIC_AWS_BUCKET_STRING + key}
                    className="w-36 h-36 my-auto mx-4"
                  />
                </div>
              ))}
              <div className="border-r mx-auto border-black" />
              {images.map((image, index) => (
                <div key={index}>
                  <button
                    type="button"
                    className="absolute ml-4 pb-[120px] hover:bg-white hover:bg-opacity-80"
                    onClick={() => removeNewImage(index)}
                  >
                    <XCircle
                      height={24}
                      width={24}
                      stroke={"black"}
                      strokeWidth={1}
                    />
                  </button>
                  {/* eslint-disable-next-line @next/next/no-img-element,
                    jsx-a11y/alt-text */}
                  <img
                    src={newImageHolder[index] as string}
                    className="w-36 h-36 my-auto mx-4"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-evenly pt-4">
            <div className="flex my-auto">
              <input
                type="checkbox"
                className="my-auto"
                checked={!savingAsDraft}
                defaultValue={post.published.toString()}
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
          <a
            href={`/acting/${titleRef.current?.value.replaceAll(" ", "_")}`}
            className="py-4 text-lg px-6 transform mx-auto text-white w-fit my-2 opacity-90 hover:opacity-100 z-10 bg-blue-300 p-1 hover:bg-blue-400 active:scale-90 transition-all ease-in-out duration-300 rounded-md"
          >
            Go To Post
          </a>
        </form>
      </div>
    </div>
  );
}
