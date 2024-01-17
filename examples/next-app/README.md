## Config and installation

### installation

make sure you are on `/typescript-sdk/examples/next-app` folder

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

check http://localhost:3000/

```
import { useEffect, useState } from "react";
import InstillClient, {
  Nullable,
  Pipeline,
  User,
} from "@instill-ai/typescript-sdk";

export default function TypescriptSdkDemo() {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [user, setUser] = useState<User[]>([]);

  const client = new InstillClient(
    "https://api.instill.tech",
    "v1beta",
    "" // console API token
  );

  useEffect(() => {
    client.Auth.getUserQuery()
      .then((data: any) => {
        console.log("data", data);
        setUser(data);
      })
      .catch((error: any) => {
        console.log("error", error);
      });

    client.Pipeline.listPipelinesQuery({
      pageSize: null,
      nextPageToken: null,
    })
      .then((data: any) => {
        console.log("data", data);
        setPipelines(data);
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  }, []);

  return (
    <>
      <h1>User Data</h1>
      <pre style={{ backgroundColor: "white" }}>
        {JSON.stringify(user, null, 4)}
      </pre>

      <h1>Pipelines List</h1>
      <pre style={{ backgroundColor: "white" }}>
        {JSON.stringify(pipelines, null, 4)}
      </pre>
    </>
  );
}
```
