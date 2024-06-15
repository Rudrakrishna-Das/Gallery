const { formatImageData } = require("@/helper/helper");
const { sql } = require("@vercel/postgres");
const { NextResponse } = require("next/server");
const { unstable_noStore } = require("next/cache");

export const POST = async (req, res) => {
  unstable_noStore();
  try {
    const data = await req.json();
    let allImageData = "";
    if (data.genere.trim().length === 0) {
      const { rows } = await sql`SELECT * FROM images`;
      allImageData = formatImageData(rows);
    } else {
      const { rows } =
        await sql`SELECT * FROM images where genere = ${data.genere.trim()}`;
      allImageData = formatImageData(rows);
    }
    return NextResponse.json({ ok: true, data: allImageData });
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ ok: false, error: "Failed to fetch images" });
  }
};
