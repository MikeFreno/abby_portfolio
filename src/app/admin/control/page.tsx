import Link from "next/link";
import { checkAuth } from "./actions";

export default async function AdminMainPage() {
  return (
    <div className="min-h-screen w-full">
      <div className="text-center">All Drafts</div>
    </div>
  );
}
