import Navbar from "~/app/Navbar";

export const metadata = {
  title: "Login | Abigail Weinick",
  description: "Admin Login",
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
    </section>
  );
}
