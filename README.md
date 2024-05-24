# Overview

Typescript SDK for Instill AI products

[![Unix Build Status](https://img.shields.io/github/actions/workflow/status/instill-ai/typescript-sdk/test.yml?branch=main&label=linux)](https://github.com/instill-ai/typescript-sdk/actions)
[![NPM License](https://img.shields.io/npm/l/instill-sdk.svg)](https://www.npmjs.com/package/instill-sdk)
[![NPM Version](https://img.shields.io/npm/v/instill-sdk.svg)](https://www.npmjs.com/package/instill-sdk)
[![NPM Downloads](https://img.shields.io/npm/dm/instill-sdk.svg?color=orange)](https://www.npmjs.com/package/instill-sdk)

> [!IMPORTANT]  
> **This SDK tool is under heavy development!!**  
> Currently there has yet to be a stable version release, please feel free to open any issue regarding this SDK in our [community](https://github.com/instill-ai/community/issues) repo

## Setup

### Requirements

- Node 16+
- npm 7+ | pnpm 6+ | yarn 1+

### installation

```
npm i instill-sdk
```

```
yarn add instill-sdk
```

```
pnpm add instill-sdk
```

## Usage:

```
// node.js
const InstillClient = require("instill-sdk").default;

// next.js
import InstillClient from "instill-sdk";

```

### config

```
baseUrl: string
appVersion: string
apiToken: string
```

## Example app templetes

### local

```
import { useEffect, useState } from "react";
import InstillClient, {
  Nullable,
  User,
} from "instill-sdk";

export default function TypescriptSdkDemo() {
  const [user, setUser] = useState<User[]>([]);

  const client = new InstillClient(
    "http://localhost:8080",
    "v1beta",
    "<your_api_token>" // get console API token from `http://localhost:3000/settings`
  );

  useEffect(() => {
    client.Auth.getUserQuery(({ userName: "users/admin" }))
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
} from "instill-sdk";

export default function TypescriptSdkDemo() {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [user, setUser] = useState<User[]>([]);

  const client = new InstillClient(
    "https://api.instill.tech",
    "v1beta",
    "<your_api_token>" // console API token
  );

  useEffect(() => {
    client.Auth.getUserQuery({ userName: "users/admin" })
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

### create Pipeline

```

userName : check your userName: https://console.instill.tech/settings

client.PipelineClient.createUserPipelineMutation("<userName>",
  {
    "id": "overseas-blue-lobster",
    "recipe": {
      "version": "v1beta",
      "components": [
        {
          "id": "start",
          "resource_name": "",
          "configuration": {
            "metadata": {
              "text": {
                "instillFormat": "string",
                "type": "string",
                "title": "text"
              }
            }
          },
          "definition_name": "operator-definitions/op-start"
        },
        {
          "id": "end",
          "resource_name": "",
          "configuration": {
            "metadata": {
              "output": {
                "title": "output"
              }
            },
            "input": {
              "output": "{ai_1.output.texts}"
            }
          },
          "definition_name": "operator-definitions/op-end"
        },
        {
          "id": "ai_1",
          "resource_name": "users/namananand-instill-ai/connector-resources/ai2",
          "configuration": {
            "task": "TASK_TEXT_GENERATION",
            "input": {
              "prompt": "{start.text}",
              "model": "gpt-3.5-turbo"
            }
          },
          "definition_name": "connector-definitions/ai-openai"
        }
      ]
    }
  }
).then((response) => {
  console.log(response.data)
})
.catch(error => {
  console.log(error)
})

```

| function                              |                       params                        |
| :------------------------------------ | :-------------------------------------------------: |
| listPipelinesQuery                    |      pageSize, nextPageToken, enablePagination      |
| listUserPipelinesQuery                | pageSize, nextPageToken, userName, enablePagination |
| getUserPipelineQuery                  |                    pipelineName                     |
| ListUserPipelineReleasesQuery         |   userName, pipelineName, pageSize, nextPageToken   |
| getUserPipelineReleaseQuery           |                 pipelineReleaseName                 |
| watchUserPipelineReleaseQuery         |                 pipelineReleaseName                 |
| createUserPipelineMutation            |                  userName, payload                  |
| updateUserPipelineMutation            |                       payload                       |
| deleteUserPipelineMutation            |                    pipelineName                     |
| renameUserPipelineMutation            |                       payload                       |
| createUserPipelineReleaseMutation     |                pipelineName, payload                |
| updateUserPipelineReleaseMutation     |            pipelineReleaseName, payload             |
| deleteUserPipelineReleaseMutation     |                 pipelineReleaseName                 |
| triggerUserPipelineAction             |   pipelineName, payload, returnTraces, shareCode    |
| triggerAsyncUserPipelineAction        |         pipelineName, payload, returnTraces         |
| setDefaultUserPipelineReleaseMutation |                 pipelineReleaseName                 |
| restoreUserPipelineReleaseMutation    |                 pipelineReleaseName                 |
| triggerUserPipelineReleaseAction      |     pipelineReleaseName, payload, returnTraces      |
| triggerAsyncUserPipelineReleaseAction |     pipelineReleaseName, payload, returnTraces      |

### Connector

### Create new connector

```
userName : check your userName: https://console.instill.tech/settings

query.ConnectorClient.createUserConnectorMutation("<userName>",
  {
    "id": "open-ai-model-1",
    "connector_definition_name": "connector-definitions/ai-openai",
    "configuration": {
      "organization": "my-org",
      "api_key": "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"
    }
  }
).then((response) => {
  console.log(response.data)
})
.catch(error => {
  console.log(error)
})
```

| function                          |                  params                   |
| :-------------------------------- | :---------------------------------------: |
| listConnectorsQuery               |      pageSize, nextPageToken, filter      |
| listUserConnectorsQuery           | userName, pageSize, nextPageToken, filter |
| listConnectorDefinitionsQuery     |          connectorDefinitionName          |
| getConnectorDefinitionQuery       |          connectorDefinitionName          |
| getUserConnectorQuery             |               connectorName               |
| watchUserConnector                |               connectorName               |
| createUserConnectorMutation       |            entityName, payload            |
| deleteUserConnectorMutation       |               connectorName               |
| updateUserConnectorMutation       |                  payload                  |
| renameUserConnector               |                  payload                  |
| testUserConnectorConnectionAction |               connectorName               |
| connectUserConnectorAction        |               connectorName               |
| disconnectUserConnectorAction     |               connectorName               |

### Metric

| function                        |             params              |
| :------------------------------ | :-----------------------------: |
| listPipelineTriggerRecordsQuery | pageSize, nextPageToken, filter |
| listTriggeredPipelineQuery      | pageSize, nextPageToken, filter |
| listTriggeredPipelineChartQuery | pageSize, nextPageToken, filter |

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

### Oraganization

| function                             |             params              |
| :----------------------------------- | :-----------------------------: |
| getOrganizationMembershipQuery       |     organizationID, userID      |
| getOrganizationQuery                 |         organizationID          |
| getUserMembershipQuery               |     organizationID, userID      |
| getUserMembershipsQuery              |             userID              |
| listOrganizationsQuery               | pageSize, nextPageToken, filter |
| createOrganizationMutation           |             payload             |
| deleteOrganizationMutation           |        organizationName         |
| deleteUserMembershipMutation         |     organizationID, userID      |
| updateOrganizationMembershipMutation |             payload             |
| updateOrganizationMutation           |             payload             |
| updateUserMembershipMutation         |             payload             |

### Mgmt

### create API token

```

client.AuthClient.createApiTokenMutation({
  "id": "aa",
  "ttl": -1
}).then((response) => {
  console.log(response.data)
})
.catch(error => {
  console.log(error)
})

```

| function                        |         params          |
| :------------------------------ | :---------------------: |
| getUserQuery                    |        userName         |
| getAuthenticatedUserQuery       |                         |
| checkUserIdExist                |           id            |
| getApiTokenQuery                |        tokenName        |
| listApiTokensQuery              | pageSize, nextPageToken |
| updateAuthenticatedUserMutation |         payload         |
| createApiTokenMutation          |         payload         |
| deleteApiTokenMutation          |        tokenName        |
| checkNamespace                  |           id            |

## Contribution Guidelines:

Please refer to the [Contributing Guidelines](./.github/CONTRIBUTING.md) for more details.

## Release Notes:

[Release](./CHANGELOG.md)

## Genrate proto-ts

- run `./generate_proto.sh`
- it will genrate protobuf into `dist/protogen-ts`

## Support:

Contact details for help and support resources. This list isn't exhaustive but covers major aspects usually included in most SDK design documents.
