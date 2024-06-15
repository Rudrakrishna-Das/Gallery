import { createPassword, createUserId } from "@/helper/helper";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
const bcrypt = require("bcryptjs");

export const POST = async (req, res) => {
  const data = await req.json();

  const { rowCount, rows } =
    await sql`select * from users where email = ${data.email}`;

  if (rowCount === 0) {
    const id = createUserId();
    const pass = createPassword();
    const hash = bcrypt.hashSync(pass, 10);
    await sql`insert into users values(${id},${data.userName},${data.email},${hash})`;
    const token = sign({ id: id }, process.env.SECRET_KEY);

    cookies().set("token", token);
    return NextResponse.json(
      {
        data: data,
        isOk: true,
      },
      { status: 200 }
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
};
