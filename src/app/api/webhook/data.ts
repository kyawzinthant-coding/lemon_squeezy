import { NextResponse } from "next/server";

let storedWebhookData: any = null;

export async function POST(req: Request) {
  return NextResponse.json({ data: storedWebhookData || "No data available" });
}

export async function webhookHandler(req: Request) {
  const body = await req.json();
  storedWebhookData = body;
}
