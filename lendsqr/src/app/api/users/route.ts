import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://mocki.io/v1/e3c2819d-0a46-4928-9863-a2a578bee518 ", {
    cache: "no-store",
  });

  const data = await res.json();
  return NextResponse.json(data);
}
