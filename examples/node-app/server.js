const express = require("express");
const InstillClient = require("@instill-ai/typescript-sdk").default; // If CommonJS style

const app = express();
const port = 5000;

const client = new InstillClient(
  "https://api.instill.tech",
  "v1alpha",
  "instill_sk_8uAG5VaqLDqtXEk3mFEBmMJXQSnTxmkz" // console API token
);

// Define a route for listing pipelines using the SDK
app.get("/", async (req, res) => {
  try {
    const data = await client.Auth.getUserQuery();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
