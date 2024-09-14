// pages/api/donate/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

const lsqyConfig = {
  API_KEY:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiIzYmI3N2QyNjAyMGE0ZGQ3MWIzZjFjZDJkMjBjZDA2MjRjMzAyZmUzMjhkZjQxMjQ4OTI1NzJmZGM4ZTkxNWUyNWVmYWU2N2JmZGEyNmQ4OCIsImlhdCI6MTcyNjMyMDc5MS4zNDQxMTIsIm5iZiI6MTcyNjMyMDc5MS4zNDQxMTUsImV4cCI6MjA0MTg1MzU5MS4zMDMwMDIsInN1YiI6IjMyMTU1NTgiLCJzY29wZXMiOltdfQ.mTRYL_BkZLddutnxJhgrfaTTzNcy5Z9g7KUgpK7cLSY0AZwJ-oRiP7nM3GyVBNozShD2BunZ4KLZWq0IUtyRAMwxTTfwEhPW0AxmhdaAiRsLPS6Odfdhii5-ZI1voEHFpG6bs1eC-NhI4GyuaH58DFp3yRtWupH6NqE0BRtF8IwbPa0yCiSI6OeUHBbfBb4IS1hvT0xf-PTagEKpjSAMF5C2isQOrtRYj8KvYVN673C7TpYPhycRhMV9O2kuUT0DFVHOxtuC58WrNSuWVZp_l--KBcAEQeS9XfCenwnoplDS-cPj0LL61daGYDGpDMGeAMnyRr7SHd3btz_VU0eKCUmzFbw-qEAMlBc9ug4bt8t9ecYSg45jxa0SIaYXJwhP1arKjVNC1wtSv8LsrErViTSaPNdbgzfa62VTqm8zNpT-4GAb9H1CKIq47xbXD4m740pOxDitwb6U1KYwgKRkNajlvMRILw34gduTdUBXYm1qM2yjPgrk_MApYUCPLzEp",
  URL: "https://api.lemonsqueezy.com/v1",
};

export const headers = {
  Accept: "application/vnd.api+json",
  "Content-Type": "application/vnd.api+json",
  Authorization: `Bearer ${lsqyConfig.API_KEY}`,
};

interface DonationRequest {
  amount: number;
}

export async function POST(request: Request, res: Response) {
  const { amount }: DonationRequest = await request.json();
  const PRODUCT_ID = "521993"; // Replace with your actual product ID

  console.log("Sending request to Lemon Squeezy API...");
  console.log("Request Headers:", headers);
  console.log("Request Body:", {
    data: {
      type: "checkouts",
      attributes: {
        product_id: PRODUCT_ID,
        amount: amount,
        currency: "USD",
      },
    },
  });

  try {
    const response = await axios.post(
      `${lsqyConfig.URL}/checkouts`,
      {
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              custom: {
                user_id: "123",
              },
            },
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: "123241",
              },
            },
            variant: {
              data: {
                type: "variants",
                id: PRODUCT_ID,
              },
            },
          },
        },
      },
      { headers }
    );
    console.log(response.data);
    return NextResponse.json(response.data.data.attributes.url, {
      status: 200,
    });
  } catch (error: any) {
    console.error("Error creating checkout:", error.response?.data || error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
