import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const { validateUser } = require("../../../../helper/helper");
export const POST = async (req, res) => {
  const token = cookies().get("token");
  if (!token) {
    return NextResponse.json({ ok: false, message: "Please Login first" });
  }

  const user = validateUser(token.value);
  if (!user) {
    return NextResponse.json({ ok: false, message: "Please Login first" });
  }
  const data = await req.json();
  const objectEmpty = JSON.stringify(data) === "{}";
  if (objectEmpty) {
    return NextResponse.json({ ok: false, message: "Nothing to Change" });
  }
  if (data.hasOwnProperty("userName")) {
    if (data.userName.trim().length < 2) {
      return NextResponse.json({
        ok: false,
        message: "Username min 2 characters long",
      });
    }
  }
  if (data.hasOwnProperty("email")) {
    if (data.email.trim().length < 0) {
      return NextResponse.json({ ok: false, message: "Email cannot be empty" });
    }
  }
  if (data.hasOwnProperty("password")) {
    if (data.password.trim().length < 8) {
      return NextResponse.json({
        ok: false,
        message: "Password min 8 characters long",
      });
    }
  }

  const { rows, rowCount } =
    await sql`select * from users where userid = ${user.id}`;
  const hashedPassword = ''
  if(data)
 const newUser = await sql`update users set username = ${data.userName ? data.userName : rows[0].username} email = ${data.userName ? data.userName : rows[0].username}`

};
