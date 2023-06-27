import QuickSelectControls from "./QuickSelectControls";

export default function NonRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <QuickSelectControls />
      {children}
    </section>
  );
}
