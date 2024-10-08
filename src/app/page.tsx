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
  const [location, setLocation] = useState<String>();

  const handleDonate = async () => {
    try {
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ location }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      window.open(data, "_blank");
    } catch (error) {
      console.error("Error during donation:", error);
    }
  };
  return (
    <div>
      <h1>Donate</h1>

      <select
        onChange={(e) => setLocation(e.target.value)}
        name="location"
        id="location"
      >
        <option value="">Select Location</option>
        <option value="yangon"> Yangon</option>
        <option value="mandalay">Mandalay </option>
        <option value="pago">pago </option>
      </select>

      <button
        className="text-white w-[200px] h-[50px] bg-yellow-50"
        onClick={handleDonate}
      >
        Donate
      </button>
    </div>
  );
};

export default Home;
