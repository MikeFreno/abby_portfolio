import Footer from "../Footer";
import Navbar from "../Navbar";

export const metadata = {
  title: "Photography | Abigail Weinick",
  description: "Photography Albums",
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
