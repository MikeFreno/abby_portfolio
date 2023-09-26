"use client";

import { useEffect, useState } from "react";
import { FlowEntry, Row } from "~/types/db";
import Image from "next/image";
import { env } from "~/env.mjs";
import ArrowIcon from "~/icons/Arrow";

export default function FlowClient(props: { post: Row }) {
  const [flow, setFlow] = useState<{ [row: number]: FlowEntry }>();
  const [firstLoadFinished, setFirstLoadFinished] = useState<boolean>(false);

  function createFlowState() {
    if (props.post.PhotographyFlow) {
      const flow = JSON.parse(props.post.PhotographyFlow) as {
        [key: number]: FlowEntry;
      };
      setFlow(flow);
    } else {
      if (props.post.Attachments) {
        // render default flowState
        let localAttachments = props.post.Attachments.split(",");
        let necessaryRows = Math.ceil(localAttachments.length / 3);

        for (let n = 0; n < necessaryRows; n++) {
          setFlow((prevState) => ({
            ...prevState,
            [n]: {
              cols: localAttachments.slice(n * 3, n * 3 + 3),
              spacer: -1,
            },
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
    //console.log("called up on row " + row + " column " + col);
    //target is ((row - 1), col)
    if (row > 0) {
      let newFlow = { ...flow! };
      let targetRowArr = [...newFlow[row - 1].cols];
      let sourceRowArr = [...newFlow[row].cols];
      targetRowArr.splice(col, 0, sourceRowArr[col]);
      sourceRowArr.splice(col, 1);
      newFlow[row - 1].cols = targetRowArr;
      newFlow[row].cols = sourceRowArr;
      setFlow(newFlow);
    }
  }
  function moveImageLeft(row: number, col: number) {
    //console.log("called left on row " + row + " column " + col);
    //target is (row, (col - 1))
    let newFlow = { ...flow! };
    let newArr = [...newFlow[row].cols];
    const temp = newArr[col];
    newArr[col] = newArr[col - 1];
    newArr[col - 1] = temp;
    newFlow[row].cols = newArr;
    setFlow(newFlow);
  }
  function moveImageRight(row: number, col: number) {
    //console.log("called right on row " + row + " column " + col);
    //target is (row, (col + 1))
    let newFlow = { ...flow! };
    let newArr = [...newFlow[row].cols];
    const temp = newArr[col];
    newArr[col] = newArr[col + 1];
    newArr[col + 1] = temp;
    newFlow[row].cols = newArr;
    setFlow(newFlow);
  }
  function moveImageDown(row: number, col: number) {
    //console.log("called down on row " + row + " column " + col);
    //target is ((row + 1), col)
    if (row < Object.keys(flow!).length - 1) {
      let newFlow = { ...flow! };
      let targetRowArr = [...newFlow[row + 1].cols];
      let sourceRowArr = [...newFlow[row].cols];
      targetRowArr.splice(col, 0, sourceRowArr[col]);
      sourceRowArr.splice(col, 1);
      newFlow[row + 1].cols = targetRowArr;
      newFlow[row].cols = sourceRowArr;
      setFlow(newFlow);
    }
  }

  while (!firstLoadFinished) {
    return (
      <div className="py-4 px-8">
        <div className="text-zinc-800 text-3xl tracking-wider text-center pb-8">
          {props.post.Title} Photography Flow
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
      <div className="py-4 px-8">
        <div className="text-zinc-800 text-3xl tracking-wider text-center pb-8">
          {props.post.Title} Photography Flow
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
              {values.cols.map((leaf) => (
                <div key={leaf} className="w-1/3 my-auto px-2 py-4">
                  {+row > 0 ? (
                    <div className="relative flex items-center">
                      <button
                        id="up-arrow"
                        onClick={() =>
                          moveImageUp(+row, values.cols.indexOf(leaf))
                        }
                        className="absolute top-1 transform opacity-50 hover:opacity-100 -translate-x-1/2 left-1/2 z-10 bg-emerald-300 p-1 hover:bg-emerald-400 active:scale-90 transition-all ease-in-out duration-300 rounded-md"
                      >
                        <div className="rotate-180">
                          <ArrowIcon
                            width={24}
                            height={24}
                            strokeWidth={1}
                            stroke={"black"}
                          />
                        </div>
                      </button>
                    </div>
                  ) : null}
                  <div className="relative flex items-center">
                    {values.cols.indexOf(leaf) > 0 ? (
                      <button
                        id="left-arrow"
                        onClick={() =>
                          moveImageLeft(+row, values.cols.indexOf(leaf))
                        }
                        className="absolute left-1 transform opacity-50 hover:opacity-100 -translate-y-1/2 top-1/2 bg-emerald-300 p-1 hover:bg-emerald-400 active:scale-90 transition-all ease-in-out duration-300 rounded-md"
                      >
                        <div className="rotate-90">
                          <ArrowIcon
                            width={24}
                            height={24}
                            strokeWidth={1}
                            stroke={"black"}
                          />
                        </div>
                      </button>
                    ) : null}
                    <img
                      alt={"image_" + row + "_" + values.cols.indexOf(leaf)}
                      src={env.NEXT_PUBLIC_AWS_BUCKET_STRING + leaf}
                      className="h-48 w-full"
                    />
                    {values.cols.indexOf(leaf) < values.cols.length - 1 ? (
                      <button
                        id="right-arrow"
                        onClick={() =>
                          moveImageRight(+row, values.cols.indexOf(leaf))
                        }
                        className="absolute right-1 transform opacity-50 hover:opacity-100 -translate-y-1/2 top-1/2 bg-emerald-300 p-1 hover:bg-emerald-400 active:scale-90 transition-all ease-in-out duration-300 rounded-md"
                      >
                        <div className="-rotate-90">
                          <ArrowIcon
                            width={24}
                            height={24}
                            strokeWidth={1}
                            stroke={"black"}
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
                          moveImageDown(+row, values.cols.indexOf(leaf))
                        }
                        className="absolute bottom-1 transform opacity-50 hover:opacity-100 -translate-x-1/2 left-1/2 z-10 bg-emerald-300 p-1 hover:bg-emerald-400 active:scale-90 transition-all ease-in-out duration-300 rounded-md"
                      >
                        <ArrowIcon
                          width={24}
                          height={24}
                          strokeWidth={1}
                          stroke={"black"}
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
    );
  } else
    return (
      <div className="py-4 px-8">
        <div className="text-zinc-800 text-3xl tracking-wider text-center pb-8">
          {props.post.Title} Photography Flow
        </div>
        <div>Fatal error loading data</div>
      </div>
    );
}
