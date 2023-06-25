"use client";

import Link from "next/link";
import { useState } from "react";

export default function RootPage() {
  const [currentBGImage, setCurrentBGImage] = useState<string>("default");

  return (
    <div
      className={`h-screen w-screen bg-cover bg-fixed bg-center bg-no-repeat page-fade-in transition-all ease-in-out duration-700`}
      style={{ backgroundImage: `url('${currentBGImage}')` }}
    >
      <div className="h-full flex justify-center">
        <div className="flex flex-col justify-evenly pt-[15vh] pb-[10vh] text-center">
          <div>
            <Link
              href={"/film/grins"}
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
              className="text-6xl transition-all duration-500 ease-in-out hover:tracking-wider"
            >
              CRAIGSLIST
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
