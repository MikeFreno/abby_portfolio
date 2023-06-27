import "~/styles/globals.css";

import { Playfair_Display, Raleway } from "next/font/google";
import Navbar from "./Navbar";

const playfair = Playfair_Display({ subsets: ["latin"] });

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
    <html lang="en" className="scroll-smooth scroll-y-disabled">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={playfair.className}>{children}</body>
    </html>
  );
}
