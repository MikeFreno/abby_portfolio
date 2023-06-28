"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MenuBars from "~/icons/MenuBars";
import useOnClickOutside from "~/components/ClickOutsideHook";

export default function Navbar() {
  const pathname = usePathname();
  const [showingMobileMenu, setShowingMobileMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const filmDropDownRef = useRef<HTMLDivElement>(null);
  const filmButtonRef = useRef<HTMLButtonElement>(null);

  const [filmDropDownShowing, setFilmDropDownShowing] =
    useState<boolean>(false);

  const toggleMobileMenu = () => {
    setShowingMobileMenu(!showingMobileMenu);
  };

  useOnClickOutside([menuRef, toggleRef], () => {
    setShowingMobileMenu(false);
  });

  useOnClickOutside([filmDropDownRef, filmButtonRef], () => {
    setFilmDropDownShowing(false);
  });

  useEffect(() => {
    if (showingMobileMenu) {
      document.getElementById("LineA")?.classList.add("LineA");
      document.getElementById("LineB")?.classList.add("LineB");
    } else {
      document.getElementById("LineA")?.classList.remove("LineA");
      document.getElementById("LineB")?.classList.remove("LineB");
    }
  }, [showingMobileMenu]);

  const toggleFilmDropDown = () => {
    setFilmDropDownShowing(!filmDropDownShowing);
  };

  return (
    <>
      <div
        className={`${
          pathname == "/" ? "text-white" : "text-black"
        } fixed w-full z-50`}
      >
        <div className="flex justify-between px-12 py-6 md:px-16 md:py-8">
          <a
            href={"/"}
            className="flex text-3xl tracking-wide font-semibold mx-auto md:m-0"
          >
            ABIGAIL WEINICK
          </a>
          <div className="hidden flex-row justify-end md:flex">
            <div className="my-auto p-2 rounded-t">
              <button
                ref={filmButtonRef}
                onClick={toggleFilmDropDown}
                className={`${
                  pathname == "/" || pathname.split("/")[1] == "film"
                    ? "underline underline-offset-4"
                    : pathname == "/"
                    ? "hover-underline-animation-white"
                    : "hover-underline-animation-black"
                } mx-2 px-2 my-auto z-50`}
              >
                Film
              </button>
              <div
                ref={filmDropDownRef}
                className={`${
                  filmDropDownShowing
                    ? ""
                    : "scale-0 origin-top-right -translate-y-6"
                } ${
                  pathname == "/"
                    ? "border border-white text-white bg-opacity-20"
                    : "text-black"
                } flex flex-col py-2 px-4 shadow-2xl bg-white -ml-14 mt-1 rounded fixed transition-all duration-500 ease-in-out`}
              >
                <Link
                  href={"/film/grins"}
                  className="flex justify-end w-full py-2 pl-2"
                >
                  <div
                    className={`${
                      pathname == "/"
                        ? "hover-underline-animation-white"
                        : "hover-underline-animation-black"
                    } my-auto text-right`}
                  >
                    Grins
                  </div>
                </Link>
                <Link
                  href={"/film/hottears"}
                  className="flex justify-end w-full py-2 pl-2"
                >
                  <div
                    className={`${
                      pathname == "/"
                        ? "hover-underline-animation-white"
                        : "hover-underline-animation-black"
                    } my-auto text-right`}
                  >
                    Hot Tears
                  </div>
                </Link>
                <Link
                  href={"/film/dirt"}
                  className="flex justify-end w-full py-2 pl-2"
                >
                  <div
                    className={`${
                      pathname == "/"
                        ? "hover-underline-animation-white"
                        : "hover-underline-animation-black"
                    } my-auto text-right`}
                  >
                    Dirt
                  </div>
                </Link>
                <Link
                  href={"/film/craigslist"}
                  className="flex justify-end w-full py-2 pl-2"
                >
                  <div
                    className={`${
                      pathname == "/"
                        ? "hover-underline-animation-white"
                        : "hover-underline-animation-black"
                    } my-auto text-right`}
                  >
                    Craigslist
                  </div>
                </Link>
              </div>
            </div>
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
          <button
            ref={toggleRef}
            onClick={toggleMobileMenu}
            className="flex justify-end my-auto md:hidden z-50"
          >
            <MenuBars
              stroke={pathname == "/" && !showingMobileMenu ? "white" : "black"}
            />
          </button>
        </div>
        <div
          ref={menuRef}
          className={`${
            showingMobileMenu ? "navShadow" : "translate-x-full"
          } absolute top-0 right-0 h-screen w-3/5 md:hidden bg-zinc-50 transition-all duration-500 ease-in-out`}
        >
          <div className="flex flex-col h-1/2 pt-[10vh] text-black">
            <Link
              href={"/"}
              className={`${
                pathname == "/" || pathname.split("/")[1] == "film"
                  ? "underline underline-offset-4"
                  : "hover-underline-animation-black"
              } mx-auto px-2 my-auto`}
            >
              Film
            </Link>
            <Link
              href={"/photography"}
              className={`${
                pathname == "/photography" ||
                pathname.split("/")[1] == "photography"
                  ? "underline underline-offset-4"
                  : "hover-underline-animation-black"
              } mx-auto px-2 my-auto`}
            >
              Photography
            </Link>
            <Link
              href={"/commercial"}
              className={`${
                pathname == "/commercial" ||
                pathname.split("/")[1] == "commercial"
                  ? "underline underline-offset-4"
                  : "hover-underline-animation-black"
              } mx-auto px-2 my-auto`}
            >
              Commercial Work
            </Link>
            <Link
              href={"/about"}
              className={`${
                pathname == "/about" || pathname.split("/")[1] == "about"
                  ? "underline underline-offset-4"
                  : "hover-underline-animation-black"
              } mx-auto px-2 my-auto`}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
