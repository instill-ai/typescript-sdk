const express = require("express");
const instillAI = require("@instill-ai/typescript-sdk");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

// Define a route for listing pipelines using the SDK
app.get("/list-pipelines", async (req, res) => {
  try {
    const data = await instillAI.listPipelinesQuery({
      pageSize: 6,
      nextPageToken: null,
      accessToken: null, // Use the environment variable
    });
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
