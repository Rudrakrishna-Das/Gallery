import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  const token = cookies().get("token");
  if (token) {
    cookies().delete("token");
  }
  return NextResponse.json({ ok: false });
};
