## Config and installation

### installation

```
npm i @instill-ai/typescript-sdk
```
```
yarn add @instill-ai/typescript-sdk
```
```
pnpm add @instill-ai/typescript-sdk
```

### config

- make sure you have vdp up running, to run vdp check this [vdp](https://github.com/instill-ai/vdp)
- verify `.env`

```
API_VERSION=v1alpha
INSTILL_AI_USER_COOKIE_NAME=instill-ai-user
APP_EDITION=local-ce:dev
API_GATEWAY_URL=http://localhost:8080
SELF_SIGNED_CERTIFICATION=false
DISABLE_CREATE_UPDATE_DELETE_RESOURCE=false
LIST_PAGE_SIZE=6
USAGE_COLLECTION_ENABLED=true
SET_SECURE_COOKIE=false
AMPLITUDE_KEY=9823fa6e3ff904bec67a8fc90db82fb9
APP_BASE_URL=http://localhost:3000
MGMT_BACKEND_BASE_URL=http://localhost:8084
PIPELINE_BACKEND_BASE_URL=http://localhost:8081
CONNECTOR_BACKEND_BASE_URL=http://localhost:8082
MODEL_BACKEND_BASE_URL=http://localhost:8083
```

### Now You are ready.

```
// setup express project

const express = require("express");
const instillAI = require("@instill-ai/typescript-sdk");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

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
```
