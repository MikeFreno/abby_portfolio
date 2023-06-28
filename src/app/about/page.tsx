import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="h-screen w-screen px-4 md:px-8">
      <div className="h-full flex">
        <div className="flex flex-col justify-center my-auto h-2/3 pl-6 sm:pl-12 md:pl-16 pr-8 w-1/2 md:w-3/4">
          <div className="text-3xl font-semibold pb-8 tracking-wider whitespace-nowrap">
            Abigail Weinick
          </div>
          <p className="pb-8">
            Abby is an award-winning artist based in Brooklyn, New York with a
            background in writing, directing, and photography. Originally from
            Readington, New Jersey, Abby graduated from Mason Gross at Rutgers
            University with a B.F.A. in Digital Filmmaking. Currently, she is
            working as a Production Assistant at Saturday Night Live.
          </p>
          <div>
            <div className="font-semibold pb-4">CONTACT</div>{" "}
            <div>abigailweinick@gmail.com</div>
          </div>
        </div>
        <div className="flex justify-end w-full sm:pr-4 md:pr-8">
          <div className="block my-auto">
            <Image
              src={"/Abby_self_mirror.jpg"}
              alt="abby-in-mirror"
              height={600}
              width={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
