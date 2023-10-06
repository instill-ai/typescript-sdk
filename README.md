# Overview

Typescript SDK for Instill AI products

[![Unix Build Status](https://img.shields.io/github/actions/workflow/status/instill-ai/typescript-sdk/test.yml?branch=main&label=linux)](https://github.com/instill-ai/typescript-sdk/actions)
[![NPM License](https://img.shields.io/npm/l/@instill-ai/typescript-sdk.svg)](https://www.npmjs.com/package/@instill-ai/typescript-sdk)
[![NPM Version](https://img.shields.io/npm/v/@instill-ai/typescript-sdk.svg)](https://www.npmjs.com/package/@instill-ai/typescript-sdk)
[![NPM Downloads](https://img.shields.io/npm/dm/@instill-ai/typescript-sdk.svg?color=orange)](https://www.npmjs.com/package/@instill-ai/typescript-sdk)

> [!IMPORTANT]  
> **This SDK tool is under heavy development!!**  
> Currently there has yet to be a stable version release, please feel free to open any issue regarding this SDK in our [community](https://github.com/instill-ai/community/issues) repo

## Setup

### Requirements

- Node 16+
- npm 7+ | pnpm 6+ | yarn 1+

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

## Usage:

```
// node.js
const InstillClient = require("@instill-ai/typescript-sdk").default;

// next.js
import InstillClient from "@instill-ai/typescript-sdk";

```

### config

```
baseUrl: string
appVersion: string
apiToken: Nullable<string>
```

## Example app templetes

### local

```
import { useEffect, useState } from "react";
import InstillClient, {
  Nullable,
  User,
} from "@instill-ai/typescript-sdk";

export default function TypescriptSdkDemo() {
  const [user, setUser] = useState<User[]>([]);

  const client = new InstillClient(
    "http://localhost:8080",
    "v1alpha",
    "" // get console API token from `http://localhost:3000/settings`
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
  }, []);

  return (
    <>
      <h1>User Data</h1>
      <pre style={{ backgroundColor: "white" }}>
        {JSON.stringify(user, null, 4)}
      </pre>
    </>
  );
}
```

### With Token

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
    "v1alpha",
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

### Next APP

- [next-app](./examples/next-app/)

### Node APP

- [node-app](./examples/node-app/)

## API Reference

### Pipelines

| function                              |                     params                      |
| :------------------------------------ | :---------------------------------------------: |
| listPipelinesQuery                    |             pageSize, nextPageToken             |
| listUserPipelinesQuery                |        pageSize, nextPageToken, userName        |
| getUserPipelineQuery                  |                  pipelineName                   |
| ListUserPipelineReleasesQuery         | userName, pipelineName, pageSize, nextPageToken |
| getUserPipelineReleaseQuery           |               pipelineReleaseName               |
| watchUserPipelineReleaseQuery         |               pipelineReleaseName               |
| createUserPipelineMutation            |                userName, payload                |
| updateUserPipelineMutation            |                     payload                     |
| deleteUserPipelineMutation            |                  pipelineName                   |
| renameUserPipelineMutation            |                     payload                     |
| createUserPipelineReleaseMutation     |              pipelineName, payload              |
| updateUserPipelineReleaseMutation     |          pipelineReleaseName, payload           |
| deleteUserPipelineReleaseMutation     |               pipelineReleaseName               |
| triggerUserPipelineAction             |       pipelineName, payload, returnTraces       |
| triggerAsyncUserPipelineAction        |       pipelineName, payload, returnTraces       |
| setDefaultUserPipelineReleaseMutation |               pipelineReleaseName               |
| restoreUserPipelineReleaseMutation    |               pipelineReleaseName               |
| triggerUserPipelineReleaseAction      |   pipelineReleaseName, payload, returnTraces    |
| triggerAsyncUserPipelineReleaseAction |   pipelineReleaseName, payload, returnTraces    |

### Connector

| function                                  |                  params                   |
| :---------------------------------------- | :---------------------------------------: |
| listConnectorResourcesQuery               | userName, pageSize, nextPageToken, filter |
| listUserConnectorResourcesQuery           |      pageSize, nextPageToken, filter      |
| listConnectorDefinitionsQuery             |          connectorDefinitionName          |
| getConnectorDefinitionQuery               |          connectorDefinitionName          |
| getUserConnectorResourceQuery             |          connectorDefinitionName          |
| watchUserConnectorResource                |             userName, payload             |
| createUserConnectorResourceMutation       |          connectorDefinitionName          |
| deleteUserConnectorResourceMutation       |                  payload                  |
| updateUserConnectorResourceMutation       |                  payload                  |
| renameUserConnectorResource               |                  payload                  |
| testUserConnectorResourceConnectionAction |          connectorDefinitionName          |
| connectUserConnectorResourceAction        |          connectorDefinitionName          |
| disconnectUserConnectorResourceAction     |          connectorDefinitionName          |

### Metric

| function                        |             params              |
| :------------------------------ | :-----------------------------: |
| listPipelineTriggerRecordsQuery | pageSize, nextPageToken, filter |
| listTriggeredPipelineQuery      | pageSize, nextPageToken, filter |
| listTriggeredPipelineChartQuery | pageSize, nextPageToken, filter |

modelDefinitionName,

### Model

| function                  |              params               |
| :------------------------ | :-------------------------------: |
| getModelDefinitionQuery   |        modelDefinitionName        |
| listModelDefinitionsQuery |      pageSize, nextPageToken      |
| getUserModelQuery         |             modelName             |
| listModelsQuery           |      pageSize, nextPageToken      |
| listUserModelsQuery       | userName, pageSize, nextPageToken |
| getUserModelReadmeQuery   |             modelName             |
| watchUserModel            |             modelName             |
| createUserModelMutation   |         userName, payload         |
| updateModelMutation       |              payload              |
| deleteUserModelMutation   |             modelName             |
| deployUserModelAction     |             modelName             |
| undeployUserModeleAction  |             modelName             |

### Operation

| function                  |    params     |
| :------------------------ | :-----------: |
| getOperationQuery         | operationName |
| checkUntilOperationIsDoen | operationName |

### Mgmt

| function               |         params          |
| :--------------------- | :---------------------: |
| getUserQuery           |                 |
| checkUserIdExist       |           id            |
| getApiTokenQuery       |        tokenName        |
| listApiTokensQuery     | pageSize, nextPageToken |
| updateUserMutation     |         payload         |
| createApiTokenMutation |         payload         |
| deleteApiTokenMutation |        tokenName        |

## Contribution Guidelines:

Please refer to the [Contributing Guidelines](./.github/CONTRIBUTING.md) for more details.

## Release Notes:

[Release](./CHANGELOG.md)

## Genrate proto-ts

- run `./generate_proto.sh`
- it will genrate protobuf into `dist/protogen-ts`

## Support:

Contact details for help and support resources. This list isn't exhaustive but covers major aspects usually included in most SDK design documents.
