"use client";
import { useEffect, useState } from "react";

const WebhookDataDisplay = () => {
  const [webhookData, setWebhookData] = useState<any>(null);

  const fetchWebhookData = async () => {
    try {
      const response = await fetch("/api/webhook/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch webhook data");
      }

      const data = await response.json();
      setWebhookData(data);
    } catch (error) {
      console.error("Error fetching webhook data:", error);
    }
  };

  useEffect(() => {
    fetchWebhookData();
  }, []);

  return (
    <div>
      <h1>Webhook Data</h1>
      <pre>{JSON.stringify(webhookData, null, 2)}</pre>
    </div>
  );
};

export default WebhookDataDisplay;
