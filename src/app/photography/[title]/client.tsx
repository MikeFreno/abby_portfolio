"use client";

import { useEffect, useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { env } from "~/env.mjs";
import { Photography } from "~/types/db";

export default function PhotographyAlbum(props: {
  album: Photography;
  flow: { [key: number]: string[] };
}) {
  const { album, flow } = props;
  const [attachmentArray, setAttachmentArray] = useState<{ src: string }[]>([]);
  const [showingLightbox, setShowingLightbox] = useState<boolean>(false);
  const clickedImageRef = useRef<number>(0);

  useEffect(() => {
    let localAttachments = album.images?.split("\\,");
    let srced: { src: string }[] = [];
    localAttachments?.forEach((attachment) =>
      srced.push({ src: env.NEXT_PUBLIC_AWS_BUCKET_STRING + attachment }),
    );
    setAttachmentArray(srced);
  }, [album.images]);

  function openLightbox(imageSrc: string) {
    const idx = attachmentArray.findIndex(
      (attachment) =>
        attachment.src == env.NEXT_PUBLIC_AWS_BUCKET_STRING + imageSrc,
    );
    clickedImageRef.current = idx;
    setShowingLightbox(true);
  }

  return (
    <>
      <div className="">
        <div
          className={`${
            album.blurb ? "pt-24" : "py-24"
          } text-center tracking-wide text-4xl`}
        >
          {album.title.replaceAll("_", " ")}
        </div>
        {album.blurb ? (
          <div
            className="pt-8 pb-24 text-center text-xl"
            dangerouslySetInnerHTML={{
              __html: album.blurb,
            }}
          />
        ) : null}
        <div className="px-12 py-4">
          {Object.entries(flow).map(([row, values]) => (
            <div key={row} className="flex justify-evenly">
              {values.map((leaf, idx) => (
                <div
                  key={idx}
                  className="flex px-4 py-2"
                  onClick={() => openLightbox(leaf)}
                >
                  <img
                    alt={`photo_${row}_${idx}`}
                    src={env.NEXT_PUBLIC_AWS_BUCKET_STRING + leaf}
                    className="my-auto"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Lightbox
        open={showingLightbox}
        close={() => setShowingLightbox(false)}
        slides={attachmentArray}
        index={clickedImageRef.current}
        plugins={[Zoom]}
      />
    </>
  );
}
