import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  // Get the session token from the cookies
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("session_token");

  if (!sessionToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ sessionToken: sessionToken.value });
}
