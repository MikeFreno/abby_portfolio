"use client";

import Link from "next/link";
import { useState } from "react";

export default function RootPage() {
  const [currentBGImage, setCurrentBGImage] =
    useState<string>("HotTearsMakeup.jpg");
  return (
    <>
      <link rel="preload" as="image" href="/Abby_self_mirror.jpg" />
      <link rel="preload" as="image" href="/DirtLipstick.jpg" />
      <link rel="preload" as="image" href="/HotTearsMakeup.jpg" />
      <link rel="preload" as="image" href="/Mike_and_abby.jpg" />
      <link rel="preload" as="image" href="/Mike_tongue_out.jpg" />
      <div
        className={`h-screen w-screen scroll-y-disabled text-white bg-cover bg-fixed bg-center bg-no-repeat page-fade-in transition-all ease-in-out duration-700`}
        style={{ backgroundImage: `url('${currentBGImage}')` }}
      >
        <div className="h-full flex justify-center">
          <div
            className="flex flex-col justify-evenly pt-[15vh] pb-[10vh] text-center"
            onMouseLeave={() => setCurrentBGImage("HotTearsMakeup.jpg")}
          >
            <div>
              <Link
                href={"/film/grins"}
                onMouseOver={() => setCurrentBGImage("Mike_and_abby.jpg")}
                className="text-6xl transition-all duration-500 ease-in-out hover:tracking-wider"
              >
                GRINS
              </Link>
            </div>
            <div>
              <Link
                href={"/film/hottears"}
                onMouseOver={() => setCurrentBGImage("TempHotTears.jpg")}
                className="text-6xl transition-all duration-500 ease-in-out hover:tracking-wider"
              >
                HOT TEARS
              </Link>
            </div>
            <div>
              <Link
                href={"/film/dirt"}
                onMouseOver={() => setCurrentBGImage("DirtLipstick.jpg")}
                className="text-6xl transition-all duration-500 ease-in-out hover:tracking-wider"
              >
                DIRT
              </Link>
            </div>
            <div>
              <Link
                href={"/film/craigslist"}
                onMouseOver={() => setCurrentBGImage("Mike_tongue_out.jpg")}
                className="text-6xl transition-all duration-500 ease-in-out hover:tracking-wider"
              >
                CRAIGSLIST
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
