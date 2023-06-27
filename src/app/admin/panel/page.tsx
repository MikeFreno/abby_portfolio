import { cookies } from "next/headers";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { env } from "~/env.mjs";
import { redirect } from "next/navigation";

export default async function AdminMainPage() {
  const authStatus = await checkAuth();
  if (authStatus === 202) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center align-middle">
        <div className="fixed left-0 h-screen bg-emerald-200 w-64">
          <button>Movie Section Controls</button>
          <button>Photography Section Controls</button>
          <button>Commercial Section Controls</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-screen w-screen flex flex-col justify-center align-middle">
        <div className="text-center">Not authorized</div>
        <Link
          href={"/admin/login"}
          className="px-4 py-2 bg-emerald-400 mx-auto rounded-md"
        >
          Back to login
        </Link>
      </div>
    );
  }
}

async function checkAuth() {
  const token = cookies().get("token");
  let returnValue;
  if (token) {
    jwt.verify(token.value, env.JWT_SECRET_KEY, (err) => {
      if (err) {
        returnValue = 401;
        redirect("/admin");
      } else {
        returnValue = 202;
      }
    });
  } else {
    returnValue = 401;
  }
  return returnValue;
}
