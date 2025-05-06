export const config = {
  api: {
    bodyParser: false, // We will manually parse the form data
  },
};

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const buffers = [];

    for await (const chunk of req) {
      buffers.push(chunk);
    }

    const bodyStr = Buffer.concat(buffers).toString();
    const searchParams = new URLSearchParams(bodyStr);

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwObRz4lfBUn4G7tcE_hcmcU-2zXTsxj7aQbGWgZWgiQGNnxsr_8Dslwn6NAOJjpVW8_Q/exec",
      {
        method: "POST",
        body: searchParams,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const resultText = await response.text();
    res.status(200).send(resultText);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Failed to submit form" });
  }
}
