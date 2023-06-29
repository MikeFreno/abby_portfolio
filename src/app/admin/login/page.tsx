import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "~/env.mjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function AdminLoginPage() {
  const getAuth = await checkAuth();

  async function adminLogin(data: FormData) {
    "use server";

    const userName = data.get("username")?.toString();
    const password = data.get("password")?.toString();
    const rememberMeValue = data.get("rememberMe"); //'on' or 'off'
    if (userName == env.ADMIN_USERNAME && password == env.ADMIN_PASSWORD) {
      const accessToken = jwt.sign(
        rememberMeValue == "on"
          ? {
              exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 14,
              data: env.JWT_ENCODED_VALUE,
            }
          : { data: env.JWT_ENCODED_VALUE },
        env.JWT_SECRET_KEY
      );
      rememberMeValue == "on"
        ? cookies().set({
            name: "token",
            value: accessToken,
            maxAge: 60 * 60 * 24 * 14,
            path: "/admin",
            httpOnly: true,
            sameSite: "strict",
          })
        : cookies().set({
            name: "token",
            value: accessToken,
            path: "/admin",
            httpOnly: true,
            sameSite: "strict",
          });
      redirect("/admin/control");
    }
  }

  return (
    <>
      <div>
        <div className="text-3xl text-center pt-[15vh]">Admin Login</div>
        <div className="flex justify-center">
          <form
            action={adminLogin}
            className="flex flex-col justify-evenly pt-4"
          >
            <div className="input-group">
              <input
                type="text"
                required
                className="bg-transparent underlinedInput"
                name="username"
                placeholder=" "
              />
              <span className="bar"></span>
              <label className="underlinedInputLabel">Username</label>
            </div>
            <div className="input-group">
              <input
                type="password"
                required
                className="bg-transparent underlinedInput"
                name="password"
                placeholder=" "
              />
              <span className="bar"></span>
              <label className="underlinedInputLabel">Password</label>
            </div>
            <div className="flex pt-4">
              <input type="checkbox" className="my-auto" name="rememberMe" />
              <div className="my-auto px-2 text-sm font-normal">
                Remember Me
              </div>
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
    jwt.verify(token.value, env.JWT_SECRET_KEY, (err, value) => {
      if (err) {
        returnValue = 401;
      } else if ((value as JwtPayload).data === env.JWT_ENCODED_VALUE) {
        returnValue = 202;
        redirect("/admin/control");
      }
    });
  } else {
    returnValue = 401;
  }
  return returnValue;
}
