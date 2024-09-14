"use client";
import { useState } from "react";
import { headers } from "./api/donate/route";

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
    </div>
  );
};

export default Home;
