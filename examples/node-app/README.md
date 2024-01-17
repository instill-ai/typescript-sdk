## Config and installation

make sure you are on `/typescript-sdk/examples/node-app` folder

```
pnpm install
```
or

```
npm install
```

or

```
yarn install
```

### config

- make sure you have vdp up running, to run vdp check this [vdp](https://github.com/instill-ai/vdp)

### Now You are ready.

```
pnpm run dev
```

check http://localhost:5000

```
const express = require("express");
const InstillClient = require("instill-sdk").default; // If CommonJS style

const app = express();
const port = 5000;

const client = new InstillClient(
  "https://api.instill.tech",
  "v1beta",
  "" // console API token
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
```
