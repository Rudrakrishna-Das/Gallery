import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
const bcrypt = require("bcryptjs");
export async function POST(req, res) {
  const data = await req.json();
  if (data.userName.trim().length < 2) {
    return NextResponse.json(
      { message: "Username minimum 2 characters long." },
      { status: 403 }
    );
  }
  if (data.email.trim().length === 0) {
    return NextResponse.json(
      { message: "Email cannot be empty" },
      { status: 403 }
    );
  }
  if (data.password.trim().length < 8) {
    return NextResponse.json(
      { message: "Password must be 8 characters long" },
      { status: 403 }
    );
  }
  const { rows, rowCount } = await sql`select * from users`;
  if (rowCount > 0) {
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].email === data.email) {
        return NextResponse.json(
          { message: "User alredy exist", isOk: false },
          { status: 403 }
        );
      }
    }
  }
  const hash = bcrypt.hashSync(data.password, 10);
  await sql`insert into users values(${rowCount + 1},${data.userName},${
    data.email
  },${hash})`;
  return NextResponse.json({ isOk: true }, { status: 200 });
}
