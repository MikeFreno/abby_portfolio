"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { env } from "~/env.mjs";
import ArrowIcon from "~/icons/Arrow";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { Photography } from "~/types/db";

export default function FlowClient(props: { post: Photography }) {
  const [flow, setFlow] = useState<{ [row: number]: string[] }>();
  const [firstLoadFinished, setFirstLoadFinished] = useState<boolean>(false);
  const [attachmentArray, setAttachmentArray] = useState<{ src: string }[]>([]);
  const [showingLightbox, setShowingLightbox] = useState<boolean>(false);
  const clickedImageRef = useRef<number>(0);

  function createFlowState() {
    if (props.post.photography_flow) {
      const flow = JSON.parse(props.post.photography_flow) as {
        [key: number]: string[];
      };
      setFlow(flow);
    } else {
      if (props.post.images) {
        // render default flowState
        let localAttachments = props.post.images.split(",");
        let srced: { src: string }[] = [];
        localAttachments.forEach((attachment) =>
          srced.push({ src: env.NEXT_PUBLIC_AWS_BUCKET_STRING + attachment }),
        );
        setAttachmentArray(srced);

        let necessaryRows = Math.ceil(localAttachments.length / 3);

        for (let n = 0; n < necessaryRows; n++) {
          setFlow((prevState) => ({
            ...prevState,
            [n]: localAttachments.slice(n * 3, n * 3 + 3),
          }));
        }
      }
    }
  }

  useEffect(() => {
    createFlowState();
    setFirstLoadFinished(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function moveImageUp(row: number, col: number) {
    //target is ((row - 1), col)
    if (row > 0) {
      let newFlow = { ...flow! };
      let targetRowArr = [...newFlow[row - 1]];
      let sourceRowArr = [...newFlow[row]];
      targetRowArr.splice(col, 0, sourceRowArr[col]);
      sourceRowArr.splice(col, 1);
      newFlow[row - 1] = targetRowArr;
      newFlow[row] = sourceRowArr;
      setFlow(newFlow);
    }
  }
  function moveImageLeft(row: number, col: number) {
    //target is (row, (col - 1))
    let newFlow = { ...flow! };
    let newArr = [...newFlow[row]];
    const temp = newArr[col];
    newArr[col] = newArr[col - 1];
    newArr[col - 1] = temp;
    newFlow[row] = newArr;
    setFlow(newFlow);
  }
  function moveImageRight(row: number, col: number) {
    //target is (row, (col + 1))
    let newFlow = { ...flow! };
    let newArr = [...newFlow[row]];
    const temp = newArr[col];
    newArr[col] = newArr[col + 1];
    newArr[col + 1] = temp;
    newFlow[row] = newArr;
    setFlow(newFlow);
  }
  function moveImageDown(row: number, col: number) {
    //target is ((row + 1), col)
    if (row < Object.keys(flow!).length - 1) {
      let newFlow = { ...flow! };
      let targetRowArr = [...newFlow[row + 1]];
      let sourceRowArr = [...newFlow[row]];
      targetRowArr.splice(col, 0, sourceRowArr[col]);
      sourceRowArr.splice(col, 1);
      newFlow[row + 1] = targetRowArr;
      newFlow[row] = sourceRowArr;
      setFlow(newFlow);
    }
  }

  function openLightbox(imageSrc: string) {
    const idx = attachmentArray.findIndex(
      (attachment) =>
        attachment.src == env.NEXT_PUBLIC_AWS_BUCKET_STRING + imageSrc,
    );
    clickedImageRef.current = idx;
    setShowingLightbox(true);
  }

  while (!firstLoadFinished) {
    return (
      <div className="py-4 px-8">
        <div className="text-zinc-800 text-3xl tracking-wider text-center pb-8">
          {props.post.title} Photography Flow
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col">
            <div className="animate-spin">
              <Image
                src={"/circle-logo.png"}
                alt={"logo"}
                height={80}
                width={80}
              />
            </div>
            <div>Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (flow) {
    return (
      <>
        <div className="py-4 px-8">
          <div className="text-zinc-800 text-3xl tracking-wider text-center pb-8">
            {props.post.title} Photography Flow
          </div>
          <div
            id="flow control"
            className="p-4 w-full flex justify-center flex-col"
          >
            {Object.entries(flow).map(([row, values]) => (
              <div
                key={row}
                className="w-4/5 flex flex-row justify-evenly h-fit py-4 my-4 mx-auto bg-zinc-200 rounded"
              >
                {values.map((leaf) => (
                  <div key={leaf} className="w-1/3 my-auto px-2 py-4">
                    {+row > 0 ? (
                      <div className="relative flex items-center">
                        <button
                          id="up-arrow"
                          onClick={() =>
                            moveImageUp(+row, values.indexOf(leaf))
                          }
                          className="absolute top-2 transform opacity-50 hover:opacity-100 -translate-x-1/2 left-1/2 z-10 bg-emerald-300 p-1 hover:bg-emerald-400 active:scale-90 transition-all ease-in-out duration-300 rounded-md"
                        >
                          <div className="rotate-180">
                            <ArrowIcon
                              width={24}
                              height={24}
                              strokeWidth={2.5}
                              stroke={"#3f3f46"}
                            />
                          </div>
                        </button>
                      </div>
                    ) : null}
                    <div className="relative flex items-center">
                      {values.indexOf(leaf) > 0 ? (
                        <button
                          id="left-arrow"
                          onClick={() =>
                            moveImageLeft(+row, values.indexOf(leaf))
                          }
                          className="absolute left-4 transform opacity-50 hover:opacity-100 -translate-y-1/2 top-1/2 bg-emerald-300 p-1 hover:bg-emerald-400 active:scale-90 transition-all ease-in-out duration-300 rounded-md"
                        >
                          <div className="rotate-90">
                            <ArrowIcon
                              width={24}
                              height={24}
                              strokeWidth={2.5}
                              stroke={"#3f3f46"}
                            />
                          </div>
                        </button>
                      ) : null}
                      <div className="bg-zinc-50 rounded-sm w-full bg-opacity-50">
                        <img
                          alt={"image_" + row + "_" + values.indexOf(leaf)}
                          src={env.NEXT_PUBLIC_AWS_BUCKET_STRING + leaf}
                          className="h-48 mx-auto"
                          onClick={() => openLightbox(leaf)}
                        />
                      </div>
                      {values.indexOf(leaf) < values.length - 1 ? (
                        <button
                          id="right-arrow"
                          onClick={() =>
                            moveImageRight(+row, values.indexOf(leaf))
                          }
                          className="absolute right-4 transform opacity-50 hover:opacity-100 -translate-y-1/2 top-1/2 bg-emerald-300 p-1 hover:bg-emerald-400 active:scale-90 transition-all ease-in-out duration-300 rounded-md"
                        >
                          <div className="-rotate-90">
                            <ArrowIcon
                              width={24}
                              height={24}
                              strokeWidth={2.5}
                              stroke={"#3f3f46"}
                            />
                          </div>
                        </button>
                      ) : null}
                    </div>
                    {+row < Object.keys(flow).length - 1 ? (
                      <div className="relative flex items-center">
                        <button
                          id="down-arrow"
                          onClick={() =>
                            moveImageDown(+row, values.indexOf(leaf))
                          }
                          className="absolute bottom-2 transform opacity-50 hover:opacity-100 -translate-x-1/2 left-1/2 z-10 bg-emerald-300 p-1 hover:bg-emerald-400 active:scale-90 transition-all ease-in-out duration-300 rounded-md"
                        >
                          <ArrowIcon
                            width={24}
                            height={24}
                            strokeWidth={2.5}
                            stroke={"#3f3f46"}
                          />
                        </button>
                      </div>
                    ) : null}
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
  } else
    return (
      <div className="py-4 px-8">
        <div className="text-zinc-800 text-3xl tracking-wider text-center pb-8">
          {props.post.title} Photography Flow
        </div>
        <div>Fatal error loading data</div>
      </div>
    );
}
