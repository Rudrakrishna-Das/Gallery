import { formatImageData, imageGroupId, validateUser } from "@/helper/helper";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  const token = cookies().get("token");

  if (!token) {
    return NextResponse.json({ ok: false, message: "Unauthorized" });
  }
  const user = validateUser(token.value);
  if (!user) {
    return NextResponse.json({ ok: false, message: "Login first" });
  }
  const { rows } = await sql`select * from images where uid = ${user.id}`;
  const allImagesData = formatImageData(rows);

  return NextResponse.json({ ok: true, data: allImagesData });
};
