"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "~/env.mjs";

export async function checkAuth() {
  const token = cookies().get("token");
  let returnValue;
  if (token) {
    jwt.verify(token.value, env.JWT_SECRET_KEY, (err, value) => {
      if (err) {
        returnValue = 401;
        redirect("/admin");
      } else if ((value as JwtPayload).data === env.JWT_ENCODED_VALUE) {
        returnValue = 202;
      }
    });
  } else {
    returnValue = 401;
  }
  return returnValue;
}

export async function CookieDestruction() {
  cookies().set({
    name: "token",
    value: "",
    expires: new Date("2016-10-05"),
    maxAge: 0,
    path: "/admin",
    httpOnly: true,
    sameSite: "strict",
  });
  redirect("/admin");
}
