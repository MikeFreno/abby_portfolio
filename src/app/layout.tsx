import "~/styles/globals.css";

import { MuseoModerno, Raleway } from "next/font/google";
import Navbar from "./Navbar";

const museo = MuseoModerno({ subsets: ["latin"] });

export const metadata = {
  title: "Abigail Weinick",
  description: "filmmaker and photographer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={museo.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
