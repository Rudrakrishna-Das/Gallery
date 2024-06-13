const { formatImageData } = require("@/helper/helper");
const { sql } = require("@vercel/postgres");
const { NextResponse } = require("next/server");
const { unstable_noStore } = require("next/cache");

export const GET = async (req, res) => {
  unstable_noStore();
  try {
    const { rows } = await sql`SELECT * FROM images`;
    const allImageData = formatImageData(rows);
    return NextResponse.json({ ok: true, data: allImageData });
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ ok: false, error: "Failed to fetch images" });
  }
};
