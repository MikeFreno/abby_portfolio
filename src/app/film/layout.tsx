import Footer from "../Footer";
import Navbar from "../Navbar";

export const metadata = {
  title: "Film | Abigail Weinick",
  description: "Films",
};

export default function NonRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      {children}
      <Footer />
    </section>
  );
}
