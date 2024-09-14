// // pages/api/get-user-id.ts
// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// export async function GET(req: NextRequest) {
//   const token = await getToken({ req, secret: JWT_SECRET });

//   if (!token) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const userId = token.userId;
//   return NextResponse.json({ userId });
// }

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("session_token");
  const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

  if (!cookie) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const decoded = jwt.verify(cookie.value, JWT_SECRET) as { userId: string };
    const userId = decoded.userId;
    return NextResponse.json({ userId });
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
