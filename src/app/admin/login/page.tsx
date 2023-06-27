import jwt from "jsonwebtoken";
import { env } from "~/env.mjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function AdminLoginPage() {
  const authStatus = await checkAuth();

  async function adminLogin(data: FormData) {
    "use server";
    const userName = data.get("username")?.toString();
    const password = data.get("password")?.toString();
    if (userName == env.ADMIN_USERNAME && password == env.ADMIN_PASSWORD) {
      const accessToken = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 14,
          data: userName,
        },
        env.JWT_SECRET_KEY
      );
      cookies().set({
        name: "token",
        value: accessToken,
        maxAge: 60 * 60 * 24 * 14,
        path: "/admin",
        httpOnly: true,
        sameSite: "strict",
      });
      redirect("/admin/panel");
    }
  }

  return (
    <>
      <div>
        <div className="text-3xl text-center pt-[15vh]">Admin Login</div>
        <div className="flex justify-center">
          <form
            action={() => {
              adminLogin;
              document
                .getElementById("error-message")
                ?.classList.remove("hidden");
            }}
            className="flex flex-col justify-evenly pt-4"
          >
            <div className="input-group">
              <input
                type="text"
                required
                className="bg-transparent"
                name="username"
              />
              <span className="bar"></span>
              <label>Username</label>
            </div>
            <div className="input-group">
              <input
                type="password"
                required
                className="bg-transparent"
                name="password"
              />
              <span className="bar"></span>
              <label>Password</label>
            </div>
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="rounded border text-white shadow-md border-emerald-500 bg-emerald-400 hover:bg-emerald-500 active:scale-90 transition-all duration-300 ease-in-out px-4 py-2"
              >
                Login
              </button>
            </div>
          </form>
          <div className="text-red-500 text-center hidden" id="error-message">
            Error
          </div>
        </div>
      </div>
    </>
  );
}

async function checkAuth() {
  const token = cookies().get("token");
  let returnValue;
  if (token) {
    jwt.verify(token.value, env.JWT_SECRET_KEY, (err) => {
      if (err) {
        returnValue = 401;
      } else {
        returnValue = 202;
        redirect("/admin/panel");
      }
    });
  } else {
    returnValue = 401;
  }
  return returnValue;
}
