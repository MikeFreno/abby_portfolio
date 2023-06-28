"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
