import crypto from "crypto";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function POST(req: Request) {
  try {
    const clonedReq = req.clone();
    const eventType = req.headers.get("X-Event-Name");
    const body = await req.json();

    const secret = "secretsecret";
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(
      hmac.update(await clonedReq.text()).digest("hex"),
      "utf8"
    );
    const signature = Buffer.from(req.headers.get("X-Signature") || "", "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error("Invalid signature.");
    }

    // Logic according to event
    if (eventType === "order_created") {
      const userId = body.meta.custom_data.user_id;
      const isSuccessful = body.data.attributes.status === "paid";

      if (isSuccessful) {
        const sessionToken = createSessionToken(userId, body.data.attributes);

        setSessionTokenCookie(sessionToken);

        console.log("Session Token Created:", sessionToken);
      }
    }

    return NextResponse.json(
      { message: "Webhook received", body },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// Function to create a session token
const createSessionToken = (userId: string, additionalData: any) => {
  const token = jwt.sign({ userId, additionalData }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export const setSessionTokenCookie = (token: string) => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days expiration

  // Set the cookie
  const response = NextResponse.next();
  response.cookies.set("session_token", token, {
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
  return response;
};
