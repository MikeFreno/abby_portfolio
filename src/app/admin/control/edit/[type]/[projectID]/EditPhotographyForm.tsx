"use client";

import TextEditor from "~/components/TextEditor";
import { useCallback, useEffect, useRef, useState } from "react";
import Dropzone from "~/components/Dropzone";
import { Photography } from "~/types/db";
import AddImageToS3 from "../../../create/[type]/s3Upload";
import { useRouter } from "next/navigation";
import { env } from "~/env.mjs";
import XCircle from "~/icons/XCircle";
import CheckCircle from "~/icons/CheckCircle";

export default function EditPhotographyForm(post: Photography) {
  const [editorContent, setEditorContent] = useState<string>("");
  const [images, setImages] = useState<(File | Blob)[]>([]);
  const [imageHolder, setImageHolder] = useState<(string | ArrayBuffer)[]>([]);
  const [newImageHolder, setNewImageHolder] = useState<
    (string | ArrayBuffer)[]
  >([]);
  const [coverImage, setCoverImage] = useState<string | null>(post.cover_image);
  const [coverImageIsNew, setCoverImageIsNew] = useState<boolean>(false);

  const [savingAsDraft, setSavingAsDraft] = useState<boolean>(true);
  const [submitButtonLoading, setSubmitButtonLoading] =
    useState<boolean>(false);
  const [deleteButtonLoading, setDeleteButtonLoading] =
    useState<boolean>(false);

  const router = useRouter();

  const postCheckboxRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (post.images) {
      const imgStringArr = post.images.split("\\,");
      setImageHolder(imgStringArr);
    }
  }, [post]);

  const handleImageDrop = useCallback((acceptedFiles: Blob[]) => {
    acceptedFiles.forEach((file: Blob) => {
      setImages((prevImages) => [...prevImages, file]);
      const reader = new FileReader();
      reader.onload = () => {
        const str = reader.result;
        if (str)
          setNewImageHolder((prevHeldImages) => [
            ...prevHeldImages,
            str as string,
          ]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const coverImageSetter = (imageName: string, isNew: boolean) => {
    setCoverImage(imageName);
    setCoverImageIsNew(isNew);
  };

  const savingStateToggle = () => {
    setSavingAsDraft(!savingAsDraft);
  };

  const editPhotographyPage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitButtonLoading(true);
    if (titleRef.current) {
      // Use Array.prototype.map() to create an array of promises
      const uploadPromises = images.map((image) =>
        AddImageToS3(
          image,
          titleRef.current!.value.replace(" ", "_"),
          "photography",
        ),
      );

      // Use Promise.all() to wait for all promises to resolve
      let keys = await Promise.all(uploadPromises);
      imageHolder.forEach((image) => keys.push(image as string));

      const data = {
        id: post.id,
        title: titleRef.current.value.replace(" ", "_"),
        blurb: editorContent,
        images: keys,
        cover_image: coverImage?.replaceAll("+", "_").replaceAll(" ", "_"),
        published: !savingAsDraft,
        coverImageIsNew: coverImageIsNew,
      };
      await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/photography/update`,
        { method: "PATCH", body: JSON.stringify(data) },
      );
      router.push(`/admin/control/flow-control/${post.id}`);
    }
    setSubmitButtonLoading(false);
  };

  const deletePost = async () => {
    setDeleteButtonLoading(true);
    await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/photography/delete/${post.id}`,
      {
        method: "DELETE",
      },
    );
    router.back();
    router.refresh();
    setDeleteButtonLoading(false);
  };

  const removeImage = async (index: number, key: string) => {
    const imgStringArr = post.images!.split("\\,");
    const newString = imgStringArr.filter((str) => str !== key).join("\\,");
    await fetch("/api/s3/deleteImage", {
      method: "POST",
      body: JSON.stringify({
        key: key,
        newAttachmentString: newString,
        id: post.id,
      }),
    });
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
      <div className="text-2xl text-center">Edit Photography Post</div>
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
          onSubmit={editPhotographyPage}
          className="flex flex-col align-middle justify-evenly w-1/2"
        >
          <div className="input-group mx-auto">
            <input
              ref={titleRef}
              type="text"
              className="bg-transparent w-[500px] underlinedInput"
              defaultValue={post.title.replaceAll("_", " ")}
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
              <TextEditor
                updateContent={setEditorContent}
                preSet={post.blurb ? post.blurb : " "}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-center">
              <Dropzone
                onDrop={handleImageDrop}
                acceptedFiles={"image/jpg, image/jpeg, image/png"}
              />
            </div>
            <div className="text-center text-xl mb-4">
              You can click on the center of an image to set it as the cover
              photo (portrait works best)
            </div>
            <div className="grid grid-cols-6 gap-4 -mx-24">
              {imageHolder.map((key, index) => (
                <div key={index}>
                  {key == coverImage ? (
                    <div className="absolute bg-emerald-400 rounded-full translate-x-16 translate-y-14">
                      <CheckCircle
                        height={36}
                        width={36}
                        strokeWidth={1.5}
                        stroke={"#27272a"}
                      />
                    </div>
                  ) : null}
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
                    onClick={() => coverImageSetter(key as string, false)}
                  />
                </div>
              ))}
              <div className="border-r mx-auto border-black" />
              {images.map((image, index) => (
                <div key={index}>
                  {image.name == coverImage ? (
                    <div className="inset-0 absolute bg-emerald-400 rounded-full translate-x-16 translate-y-14">
                      <CheckCircle
                        height={36}
                        width={36}
                        strokeWidth={1.5}
                        stroke={"#27272a"}
                      />
                    </div>
                  ) : null}
                  <button
                    type="button"
                    className="absolute ml-4 pb-[120px] hover:bg-white hover:bg-opacity-80"
                    onClick={(event) => {
                      event.stopPropagation();
                      removeNewImage(index);
                    }}
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
                    onClick={() => coverImageSetter(image.name, true)}
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
                ref={postCheckboxRef}
                onClick={savingStateToggle}
                defaultValue={post.published.toString()}
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
            href={`/photography/${titleRef.current?.value.replaceAll(
              " ",
              "_",
            )}`}
            className="py-4 text-lg px-6 transform mx-auto text-white w-fit my-2 opacity-90 hover:opacity-100 z-10 bg-blue-300 p-1 hover:bg-blue-400 active:scale-90 transition-all ease-in-out duration-300 rounded-md"
          >
            Go To Album
          </a>
        </form>
      </div>
    </div>
  );
}
