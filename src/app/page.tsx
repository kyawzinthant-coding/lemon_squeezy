"use client";
import { useState } from "react";
import WebhookDataDisplay from "./WebHookDataDisplay";

const lsqyConfig = {
  API_KEY:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiIzYmI3N2QyNjAyMGE0ZGQ3MWIzZjFjZDJkMjBjZDA2MjRjMzAyZmUzMjhkZjQxMjQ4OTI1NzJmZGM4ZTkxNWUyNWVmYWU2N2JmZGEyNmQ4OCIsImlhdCI6MTcyNjMyMDc5MS4zNDQxMTIsIm5iZiI6MTcyNjMyMDc5MS4zNDQxMTUsImV4cCI6MjA0MTg1MzU5MS4zMDMwMDIsInN1YiI6IjMyMTU1NTgiLCJzY29wZXMiOltdfQ.mTRYL_BkZLddutnxJhgrfaTTzNcy5Z9g7KUgpK7cLSY0AZwJ-oRiP7nM3GyVBNozShD2BunZ4KLZWq0IUtyRAMwxTTfwEhPW0AxmhdaAiRsLPS6Odfdhii5-ZI1voEHFpG6bs1eC-NhI4GyuaH58DFp3yRtWupH6NqE0BRtF8IwbPa0yCiSI6OeUHBbfBb4IS1hvT0xf-PTagEKpjSAMF5C2isQOrtRYj8KvYVN673C7TpYPhycRhMV9O2kuUT0DFVHOxtuC58WrNSuWVZp_l--KBcAEQeS9XfCenwnoplDS-cPj0LL61daGYDGpDMGeAMnyRr7SHd3btz_VU0eKCUmzFbw-qEAMlBc9ug4bt8t9ecYSg45jxa0SIaYXJwhP1arKjVNC1wtSv8LsrErViTSaPNdbgzfa62VTqm8zNpT-4GAb9H1CKIq47xbXD4m740pOxDitwb6U1KYwgKRkNajlvMRILw34gduTdUBXYm1qM2yjPgrk_MApYUCPLzEp",
  URL: "https://api.lemonsqueezy.com/v1",
};

const headers = {
  Accept: "application/vnd.api+json",
  "Content-Type": "application/vnd.api+json",
  Authorization: `Bearer ${lsqyConfig.API_KEY}`,
};

const Home = () => {
  const [amount, setAmount] = useState<number>();

  const handleDonate = async () => {
    try {
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      window.open(data, "_blank"); // Open the checkout URL in a new tab
    } catch (error) {
      console.error("Error during donation:", error);
    }
  };
  return (
    <div>
      <h1>Donate</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button onClick={handleDonate}>Donate</button>

      <WebhookDataDisplay />
    </div>
  );
};

export default Home;
