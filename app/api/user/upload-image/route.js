import { createImageId, validateUser } from "@/helper/helper";
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
  const keys = Object.keys(data);
  if (keys.length < 2) {
    return NextResponse.json({
      ok: false,
      message: "Please upload a image and write your image genere first",
    });
  }
  if (data.genere.trim().length < 3) {
    return NextResponse.json({
      ok: false,
      message: "Please write correct genere",
    });
  }
  const imageId = createImageId();
  await sql`insert into images values(${user.id},${imageId},${data.genere},${data.image})`;
  return NextResponse.json({ ok: true });
};
