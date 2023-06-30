"use client";

import TextEditor from "~/components/TextEditor";
import { useCallback, useRef, useState } from "react";
import Dropzone from "~/components/Dropzone";
import { Row } from "~/types/db";

export default function EditFilmForm(project: Row) {
  const [editorContent, setEditorContent] = useState<string>("");
  const [images, setImages] = useState<(File | Blob)[]>([]);
  const [imageHolder, setImageHolder] = useState<(string | ArrayBuffer)[]>([]);
  const [savingAsDraft, setSavingAsDraft] = useState<boolean>(true);
  const [submitButtonLoading, setSubmitButtonLoading] =
    useState<boolean>(false);

  const postCheckboxRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const handleImageDrop = useCallback((acceptedFiles: Blob[]) => {
    acceptedFiles.forEach((file: Blob) => {
      setImages((prevImages) => [...prevImages, file]);
      console.log(file.name);
      const ext = file.type.split("/")[1];
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

  const createFilmPage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitButtonLoading(true);
    if (titleRef.current && linkRef.current) {
      let attachmentString = "";
      images.forEach(async (image, index) => {
        if (index > 0) {
          attachmentString += ",";
        }
        const imgName = image.name;
        await AddImageToS3(image, titleRef.current!.value);
        attachmentString += `${titleRef.current!.value}/${imgName}`;
      });
      const data = {
        title: titleRef.current.value,
        blurb: editorContent,
        embedded_link: linkRef.current.value,
        attachments: attachmentString,
        published: !savingAsDraft,
        type: "film",
      };
      await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/project-manipulation`,
        { method: "POST", body: JSON.stringify(data) }
      );
    }
    setSubmitButtonLoading(false);
  };

  const AddImageToS3 = async (file: Blob | File, title: string) => {
    const getPreSignedResponse = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/s3/getPreSignedURL`,
      {
        method: "POST",
        body: JSON.stringify({
          type: "film",
          title: title,
          filename: file.name,
        }),
      }
    );

    const { uploadURL, key } =
      (await getPreSignedResponse.json()) as getPreSignedResponseData;

    //update server with image url
    await fetch(uploadURL, {
      method: "PUT",
      body: file as File,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Continue your code here
      })
      .catch((err) => {
        console.log(err);
      });

    return key;
  };

  return (
    <div className="py-8 overflow-scroll">
      <div className="text-2xl text-center">Edit A Film Post</div>
      <div className="flex justify-center">
        <form
          onSubmit={createFilmPage}
          className="flex flex-col align-middle justify-evenly w-1/2"
        >
          <div className="input-group mx-auto">
            <input
              ref={titleRef}
              type="text"
              className="bg-transparent w-[500px] underlinedInput"
              name="title"
              defaultValue={project.Title}
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
                preSet={project.Blurb}
              />
            </div>
          </div>
          <div className="input-group mx-auto">
            <input
              ref={linkRef}
              type="text"
              className="bg-transparent w-[500px] underlinedInput"
              name="link"
              defaultValue={project.Embedded_Link ? project.Embedded_Link : ""}
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
                defaultValue={project.Published}
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

interface getPreSignedResponseData {
  uploadURL: string;
  key: string;
}
