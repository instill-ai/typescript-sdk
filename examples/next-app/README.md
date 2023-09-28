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

- see the changes done in `_document.tsx` and `next.env.mjs`

### Now You are ready.

```
pnpm run dev
```

check http://localhost:3000/

```
import { Pipeline, listPipelinesQuery } from "@instill-ai/typescript-sdk";

export default function TypescriptSdkDemo() {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  useEffect(() => {
    // Pipeline

    listPipelinesQuery({
      pageSize: 6,
      nextPageToken: null,
      accessToken: null,
    })
      .then((data) => {
        // response data
        console.log("data", data);
        setPipelines(data);
      })
      .catch((error) => {
        // error
        console.log("error", error);
      });
  }, []);

  return (
    <div>
      {JSON.stringify(pipelines)}
    </div>
  );
}
```
