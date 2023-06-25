import Footer from "../Footer";

export default function NonRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <link rel="preload" as="image" href="/Abby_self_mirror.jpg" />
      <link rel="preload" as="image" href="/DirtLipstick.jpg" />
      <link rel="preload" as="image" href="/HotTearsMakeup.jpg" />
      <link rel="preload" as="image" href="/Mike_and_abby.jpg" />
      <link rel="preload" as="image" href="/Mike_tongue_out.jpg" />
      {children}
      <Footer />
    </section>
  );
}
