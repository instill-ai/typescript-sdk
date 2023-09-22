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
- see the changes done in `_document.tsx` and `next.env.mjs`

### Now You are ready.

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
