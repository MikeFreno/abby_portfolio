import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="h-screen w-screen px-8">
      <div className="h-full flex flex-row justify-evenly">
        <div className="flex flex-col justify-center my-auto h-2/3 pl-12 md:pl-16">
          <div className="text-3xl font-semibold pb-8 tracking-wider">
            Abigail Weinick
          </div>
          <p className="w-3/4 pb-8">
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
        <div className="my-auto pr-12">
          <Image
            src={"/Abby_self_mirror.jpg"}
            alt="abby-in-mirror"
            height={600}
            width={1000}
          />
        </div>
      </div>
    </div>
  );
}
