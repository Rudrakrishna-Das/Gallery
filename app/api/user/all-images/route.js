import { formatImageData, imageGroupId, validateUser } from "@/helper/helper";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const token = cookies().get("token");

  if (!token) {
    return NextResponse.json({ ok: false, message: "Unauthorized" });
  }
  const user = validateUser(token.value);
  if (!user) {
    return NextResponse.json({ ok: false, message: "Login first" });
  }
  const data = await req.json();
  let allImagesData = "";
  if (data.genere.trim().length === 0) {
    const { rows } = await sql`select * from images where uid = ${user.id}`;
    allImagesData = formatImageData(rows);
  } else {
    const { rows } = await sql`select * from images where uid = ${
      user.id
    } and genere = ${data.genere.trim()}`;
    allImagesData = formatImageData(rows);
  }

  return NextResponse.json({ ok: true, data: allImagesData });
};
