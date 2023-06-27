"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ChevronDown from "~/icons/ChevronDown";
import MenuBars from "~/icons/MenuBars";

export default function QuickSelectControls() {
  const [showingMenu, setShowingMenu] = useState<boolean>(true);

  const [movieControlsShowing, setMovieControlsShowing] =
    useState<boolean>(false);
  const [photographyControlsShowing, setPhotographyControlsShowing] =
    useState<boolean>(false);
  const [commercialControlsShowing, setCommercialControlsShowing] =
    useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const toggleMovieControls = () => {
    setMovieControlsShowing(!movieControlsShowing);
  };
  const togglePhotographyControls = () => {
    setPhotographyControlsShowing(!photographyControlsShowing);
  };

  const toggleCommercialControls = () => {
    setCommercialControlsShowing(!commercialControlsShowing);
  };

  const menuToggle = () => {
    setShowingMenu(!showingMenu);
  };
  useEffect(() => {
    if (showingMenu) {
      document.getElementById("LineA")?.classList.add("LineA");
      document.getElementById("LineB")?.classList.add("LineB");
    } else {
      document.getElementById("LineA")?.classList.remove("LineA");
      document.getElementById("LineB")?.classList.remove("LineB");
    }
  }, [showingMenu]);

  return (
    <>
      <button
        onClick={menuToggle}
        className={`z-50 mt-2 ml-2 flex justify-end fixed my-auto`}
        ref={closeRef}
      >
        <MenuBars stroke={"black"} />
      </button>
      <div
        ref={menuRef}
        className={`${
          showingMenu ? "" : "-translate-x-full"
        } transition-all duration-700 ease-in-out fixed top-0 left-0 h-screen bg-emerald-200`}
      >
        <div className="text-center text-3xl underline pt-8">Quick Select</div>
        <div className="flex flex-col mx-8">
          <button
            className="text-start mt-16 transition-all duration-500 ease-in-out hover-underline-animation-black"
            onClick={toggleMovieControls}
          >
            <div className="flex justify-between">
              <div>Movie Section Controls</div>
              <div
                className={`${
                  movieControlsShowing ? "" : "-rotate-90"
                } my-auto transition-all duration-300 ease-in-out transform`}
              >
                <ChevronDown
                  height={20}
                  width={20}
                  stroke={"black"}
                  strokeWidth={1}
                />
              </div>
            </div>
          </button>
          {movieControlsShowing ? (
            <div className="h-fit fade-in flex flex-col pl-4 pt-4">
              <Link
                href={"/admin/control/create/movie"}
                className="my-2 w-fit"
                onClick={() => setMovieControlsShowing(false)}
              >
                <div className="hover-underline-animation-black">
                  Create New
                </div>
              </Link>
              <Link
                href={"/admin/control/drafts/movie"}
                className="my-2 w-fit"
                onClick={() => setMovieControlsShowing(false)}
              >
                <div className="hover-underline-animation-black">Drafts</div>
              </Link>
              <Link
                href={"/admin/control/edit/movie"}
                className="my-2 w-fit"
                onClick={() => setMovieControlsShowing(false)}
              >
                <div className="hover-underline-animation-black">Edit</div>
              </Link>
            </div>
          ) : null}
          <button
            className="text-start mt-16 transition-all duration-500 ease-in-out transform hover-underline-animation-black"
            onClick={togglePhotographyControls}
          >
            <div className="flex justify-between">
              <div className="pr-6">Photography Section Controls</div>
              <div
                className={`${
                  photographyControlsShowing ? "" : "-rotate-90"
                } my-auto transition-all duration-300 ease-in-out transform`}
              >
                <ChevronDown
                  height={20}
                  width={20}
                  stroke={"black"}
                  strokeWidth={1}
                />
              </div>
            </div>
          </button>
          {photographyControlsShowing ? (
            <div className="h-fit fade-in">
              <div className="h-fit fade-in flex flex-col pl-4 pt-4">
                <Link
                  href={"/admin/control/create/photography"}
                  className="my-2 w-fit"
                  onClick={() => setPhotographyControlsShowing(false)}
                >
                  <div className="hover-underline-animation-black">
                    Create New
                  </div>
                </Link>
                <Link
                  href={"/admin/control/drafts/photography"}
                  className="my-2 w-fit"
                  onClick={() => setPhotographyControlsShowing(false)}
                >
                  <div className="hover-underline-animation-black">Drafts</div>
                </Link>
                <Link
                  href={"/admin/control/edit/photography"}
                  className="my-2 w-fit"
                  onClick={() => setPhotographyControlsShowing(false)}
                >
                  <div className="hover-underline-animation-black">Edit</div>
                </Link>
              </div>
            </div>
          ) : null}
          <button
            className="text-start mt-16 transition-all duration-500 ease-in-out transform hover-underline-animation-black"
            onClick={toggleCommercialControls}
          >
            <div className="flex justify-between">
              <div className="pr-6">Commercial Section Controls</div>
              <div
                className={`${
                  commercialControlsShowing ? "" : "-rotate-90"
                } my-auto transition-all duration-300 ease-in-out transform`}
              >
                <ChevronDown
                  height={20}
                  width={20}
                  stroke={"black"}
                  strokeWidth={1}
                />
              </div>
            </div>
          </button>
          {commercialControlsShowing ? (
            <div className="h-fit fade-in flex flex-col pl-4 pt-4">
              <Link
                href={"/admin/control/create/commercial"}
                className="my-2 w-fit"
                onClick={() => setCommercialControlsShowing(false)}
              >
                <div className="hover-underline-animation-black">
                  Create New
                </div>
              </Link>
              <Link
                href={"/admin/control/drafts/commercial"}
                className="my-2 w-fit"
                onClick={() => setCommercialControlsShowing(false)}
              >
                <div className="hover-underline-animation-black">Drafts</div>
              </Link>
              <Link
                href={"/admin/control/edit/commercial"}
                className="my-2 w-fit"
                onClick={() => setCommercialControlsShowing(false)}
              >
                <div className="hover-underline-animation-black">Edit</div>
              </Link>
            </div>
          ) : null}
        </div>
        <div className={`fixed bottom-12 left-12`}>
          <Link
            href={"/"}
            className="mx-auto text-xl hover-underline-animation-black"
          >
            Go to home
          </Link>
        </div>
      </div>
    </>
  );
}
