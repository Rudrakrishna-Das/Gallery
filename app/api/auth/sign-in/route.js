import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

const bcrypt = require("bcryptjs");

export async function POST(req, res) {
  const data = await req.json();
  if (data.email.trim().length === 0) {
    return NextResponse.json(
      { message: "Email cannot be empty", isOk: false },
      { status: 403 }
    );
  }
  if (data.password.trim().length < 8) {
    return NextResponse.json(
      { message: "Password must be 8 characters long", isOk: false },
      { status: 403 }
    );
  }
  const { rowCount, rows } =
    await sql`select * from users where email = ${data.email}`;
  if (rowCount === 0) {
    return NextResponse.json(
      { message: "Pleace check your email", isOk: false },
      { status: 403 }
    );
  }
  const validPassword = bcrypt.compareSync(data.password, rows[0].password);
  if (!validPassword) {
    return NextResponse.json(
      { message: "Pleace check your password", isOk: false },
      { status: 403 }
    );
  }
  delete rows[0].password;
  const token = sign({ id: rows[0].userid }, process.env.SECRET_KEY);

  cookies().set("token", token);
  return NextResponse.json(
    {
      data: rows[0],
      isOk: true,
    },
    { status: 200 }
  );
}
