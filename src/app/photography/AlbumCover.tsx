"use client";
import Link from "next/link";
import { env } from "~/env.mjs";
import { Row } from "~/types/db";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AlbumCover(project: Row) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [hovering, setHovering] = useState<boolean>(false);
  const [targetHeight, setTargetHeight] = useState<number | null>(null);
  const [targetWidth, setTargetWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (imageRef.current) {
        setTargetHeight(imageRef.current.clientHeight);
        setTargetWidth(imageRef.current.clientWidth);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative mx-auto">
      <Link
        href={`/photography/${project.Title}`}
        className="absolute inset-0 z-50 flex items-center justify-center bg-opacity-30 bg-white hover:bg-opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          top: 0,
          left: 0,
          height: targetHeight ? `${targetHeight}px` : "100%",
          width: targetWidth ? `${targetWidth}px` : "320px",
        }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div className="flex h-full flex-col justify-center">
          <div className="text-center text-4xl tracking-wider font-bold">
            {!hovering ? project.Title.toUpperCase() : null}
          </div>
        </div>
      </Link>
      <Image
        ref={imageRef}
        src={
          project.Attachments?.split(",")[0]
            ? env.NEXT_PUBLIC_AWS_BUCKET_STRING +
              project.Attachments?.split(",")[0]
            : "/placeholder.jpg"
        }
        alt={project.Title + " cover"}
        width={320}
        height={320}
      />
    </div>
  );
}
