import { NextResponse } from "next/server";
import db from "@/store/db.json";

export async function GET() {
  return NextResponse.json(db);
}
