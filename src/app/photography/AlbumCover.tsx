"use client";
import Link from "next/link";
import { env } from "~/env.mjs";
import { Photography } from "~/types/db";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AlbumCover(project: Photography) {
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
    <div className="relative mx-auto my-8 bg-emerald-50">
      <Link
        href={`/photography/${project.title}`}
        className="absolute inset-0 flex items-center justify-center bg-opacity-30 bg-white hover:bg-opacity-0 transition-all duration-500 ease-in-out"
        style={{
          top: 0,
          left: 0,
          height: targetHeight ? `${targetHeight}px` : "100%",
          width: targetWidth ? `${targetWidth}px` : "480px",
        }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div className="flex h-full flex-col justify-center">
          <div className="text-center text-4xl tracking-wider font-bold">
            {!hovering
              ? project.title.replaceAll("_", " ").toUpperCase()
              : null}
          </div>
        </div>
      </Link>
      <Image
        ref={imageRef}
        src={
          project.cover_image
            ? env.NEXT_PUBLIC_AWS_BUCKET_STRING +
              project.cover_image.replaceAll('"', "")
            : project.images?.split("\\,")[0]
            ? env.NEXT_PUBLIC_AWS_BUCKET_STRING +
              project.images?.split("\\,")[0]
            : "/placeholder.jpg"
        }
        alt={project.title + " cover"}
        width={480}
        height={480}
      />
    </div>
  );
}
