import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://mocki.io/v1/6711c42c-4272-4848-a2f8-d586326c4bfd", {
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
