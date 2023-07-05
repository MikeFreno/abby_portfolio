import Image from "next/image";
export default function Loading() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center fade-in">
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="animate-spin">
            <Image
              src={"/circle-logo.jpg"}
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
