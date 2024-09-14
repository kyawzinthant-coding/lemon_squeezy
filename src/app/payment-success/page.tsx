"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const PaymentSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchSessionToken = async () => {
      const response = await fetch("/api/get-session-token", {
        method: "GET",
        credentials: "include", // Include cookies in the request
      });

      console.log("Fetching session token...");
      console.log("Response status:", response.status);

      if (response.ok) {
        const { userId } = await response.json();
        console.log("userid", userId);
        // Store the session token in local storage or handle it as needed
        localStorage.setItem("session_token", userId);
        // Redirect to the home page
        router.push("/");
      } else {
        console.error("Failed to fetch session token");
      }
    };

    fetchSessionToken();
  }, [router]);

  return <div>Processing your payment...</div>;
};

export default PaymentSuccess;
