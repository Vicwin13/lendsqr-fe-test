import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

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
  const user = data.find((u: any) => String(u.id) === String(id));

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}
