"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`${
          pathname == "/" ? "text-white" : "text-black"
        } fixed w-full z-50`}
      >
        <div className="flex justify-between px-12 py-6 md:px-16 md:py-8">
          <Link
            href={"/"}
            className="flex text-3xl tracking-wide font-semibold"
          >
            ABIGAIL WEINICK
          </Link>
          <div className="hidden flex-row justify-end md:flex">
            <Link
              href={"/"}
              className={`${
                pathname == "/" || pathname.split("/")[1] == "film"
                  ? "underline underline-offset-4"
                  : pathname == "/"
                  ? "hover-underline-animation-white"
                  : "hover-underline-animation-black"
              } mx-2 px-2 my-auto`}
            >
              Film
            </Link>
            <Link
              href={"/photography"}
              className={`${
                pathname == "/photography" ||
                pathname.split("/")[1] == "photography"
                  ? "underline underline-offset-4"
                  : pathname == "/"
                  ? "hover-underline-animation-white"
                  : "hover-underline-animation-black"
              } mx-2 px-2 my-auto`}
            >
              Photography
            </Link>
            <Link
              href={"/commercial"}
              className={`${
                pathname == "/commercial" ||
                pathname.split("/")[1] == "commercial"
                  ? "underline underline-offset-4"
                  : pathname == "/"
                  ? "hover-underline-animation-white"
                  : "hover-underline-animation-black"
              } mx-2 px-2 my-auto`}
            >
              Commercial Work
            </Link>
            <Link
              href={"/about"}
              className={`${
                pathname == "/about" || pathname.split("/")[1] == "about"
                  ? "underline underline-offset-4"
                  : pathname == "/"
                  ? "hover-underline-animation-white"
                  : "hover-underline-animation-black"
              } mx-2 px-2 my-auto`}
            >
              About
            </Link>
          </div>
          <div className="flex justify-end md:hidden"></div>
        </div>
      </div>
    </>
  );
}
