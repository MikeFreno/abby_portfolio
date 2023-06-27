import Footer from "../Footer";

export default function NonRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
      <Footer />
    </section>
  );
}
