import Link from "next/link";
import { checkAuth } from "./actions";
import QuickSelectControls from "./QuickSelectControls";

export const metadata = {
  title: "Admin | Abigail Weinick",
  description: "Admin Control",
};

export default async function NonRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authStatus = await checkAuth();
  if (authStatus !== 202) {
    return (
      <div className="fixed z-50 h-screen w-screen flex flex-col justify-center align-middle">
        <div className="text-center">Not authorized</div>
        <Link
          href={"/admin/login"}
          className="px-4 py-2 bg-emerald-400 mx-auto rounded-md"
        >
          Back to login
        </Link>
      </div>
    );
  } else {
    return (
      <section>
        <QuickSelectControls />
        {children}
      </section>
    );
  }
}
