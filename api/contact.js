export default async function handler(req, res) {
  // ✅ Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight request (for CORS with OPTIONS method)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ✅ Handle POST request
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwObRz4lfBUn4G7tcE_hcmcU-2zXTsxj7aQbGWgZWgiQGNnxsr_8Dslwn6NAOJjpVW8_Q/exec",
      {
        method: "POST",
        body: req.body,
        headers: {
          "Content-Type":
            req.headers["content-type"] || "application/x-www-form-urlencoded",
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
