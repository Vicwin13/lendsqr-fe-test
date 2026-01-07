import { NextResponse } from "next/server";
import db from "@/store/db.json";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = db.find((u: any) => String(u.id) === String(id));

    console.log("This is the params", id)
  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}
