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

## Usage Examples:

```
// node.js
const instillAI = require("@instill-ai/typescript-sdk");

// next.js
import { Pipeline, listPipelinesQuery } from "@instill-ai/typescript-sdk";

```

### config

- `.env`
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



## API Reference

### Pipelines

| function                                  | params                                                        | 
| :-------------------                      | :---------------------------------------:                     | 
| listPipelinesQuery                        | pageSize, nextPageToken, accessToken                          | 
| listUserPipelinesQuery                    | pageSize, nextPageToken, accessToken, userName                | 
| getUserPipelineQuery                      | pipelineName, accessToken                                     | 
| ListUserPipelineReleasesQuery             | userName, pipelineName, pageSize, nextPageToken, accessToken  | 
| getUserPipelineReleaseQuery               | pipelineReleaseName, accessToken                              | 
| watchUserPipelineReleaseQuery             | pipelineReleaseName, accessToken                              |  
| createUserPipelineMutation                | userName, payload, accessToken                                | 
| updateUserPipelineMutation                | payload, accessToken                                          | 
| deleteUserPipelineMutation                | pipelineName, accessToken                                     | 
| renameUserPipelineMutation                | payload, accessToken                                          | 
| createUserPipelineReleaseMutation         | pipelineName, payload, accessToken                            | 
| updateUserPipelineReleaseMutation         | pipelineReleaseName, payload, accessToken                     | 
| deleteUserPipelineReleaseMutation         | pipelineReleaseName, accessToken                              | 
| triggerUserPipelineAction                 | pipelineName, payload, accessToken, returnTraces              | 
| triggerAsyncUserPipelineAction            | pipelineName, payload, accessToken, returnTraces              | 
| setDefaultUserPipelineReleaseMutation     | pipelineReleaseName, accessToken                              | 
| restoreUserPipelineReleaseMutation        | pipelineReleaseName, accessToken                              | 
| triggerUserPipelineReleaseAction          | pipelineReleaseName, payload, accessToken, returnTraces       | 
| triggerAsyncUserPipelineReleaseAction     | pipelineReleaseName, payload, accessToken, returnTraces       | 

### Connector

| function                                  | params                                                        | 
| :-------------------                      | :-----------------------------------------------------------: | 
| listConnectorResourcesQuery               | userName, pageSize, nextPageToken, accessToken, filter        | 
| listUserConnectorResourcesQuery           | pageSize, nextPageToken, accessToken, filter                  | 
| listConnectorDefinitionsQuery             | connectorDefinitionName, accessToken                          | 
| getConnectorDefinitionQuery               | connectorDefinitionName, accessToken                          | 
| getUserConnectorResourceQuery             | connectorDefinitionName, accessToken                          | 
| watchUserConnectorResource                | userName, payload, accessToken                                | 
| createUserConnectorResourceMutation       | connectorDefinitionName, accessToken                          | 
| deleteUserConnectorResourceMutation       | payload, accessToken                                          | 
| updateUserConnectorResourceMutation       | payload, accessToken                                          | 
| renameUserConnectorResource               | payload, accessToken                                          | 
| testUserConnectorResourceConnectionAction | connectorDefinitionName, accessToken                          | 
| connectUserConnectorResourceAction        | connectorDefinitionName, accessToken                          | 
| disconnectUserConnectorResourceAction     | connectorDefinitionName, accessToken                          | 

### Metric

| function                                  | params                                                        | 
| :-------------------                      | :------------------:                                          | 
| listPipelineTriggerRecordsQuery           | pageSize, nextPageToken, accessToken, filter                  | 
| listTriggeredPipelineQuery                | pageSize, nextPageToken, accessToken, filter                  | 
| listTriggeredPipelineChartQuery           | pageSize, nextPageToken, accessToken, filter                  | 

modelDefinitionName, accessToken,
### Model

| function                                  | params                                                        | 
| :-------------------                      | :------------------:                                          | 
| getModelDefinitionQuery                   | modelDefinitionName, accessToken                              | 
| listModelDefinitionsQuery                 | pageSize, nextPageToken, accessToken                          | 
| getUserModelQuery                         | modelName, accessToken                                        | 
| listModelsQuery                           | pageSize, nextPageToken, accessToken                          | 
| listUserModelsQuery                       | userName, pageSize, nextPageToken, accessToken                | 
| getUserModelReadmeQuery                   | modelName, accessToken                                        | 
| watchUserModel                            | modelName, accessToken                                        | 
| createUserModelMutation                   | userName, payload, accessToken                                | 
| updateModelMutation                       | payload, accessToken                                          | 
| deleteUserModelMutation                   | modelName, accessToken                                        | 
| deployUserModelAction                     | modelName, accessToken                                        | 
| undeployUserModeleAction                  | modelName, accessToken                                        | 

### Operation

| function                                  | params                                                        | 
| :-------------------                      | :-----------------------------------------------------------: | 
| getOperationQuery                         | operationName, accessToken                                    | 
| checkUntilOperationIsDoen                 | operationName, accessToken                                    | 

### Mgmt

| function                                  | params                                                        | 
| :-------------------                      | :------------------:                                          | 
| getUserQuery                              | accessToken                                                   | 
| checkUserIdExist                          | id, accessToken                                               | 
| getApiTokenQuery                          | tokenName, accessToken                                        | 
| listApiTokensQuery                        | pageSize, nextPageToken, accessToken                          | 
| updateUserMutation                        | payload, accessToken                                          | 
| createApiTokenMutation                    | payload, accessToken                                          | 
| deleteApiTokenMutation                    | tokenName, accessToken                                        | 

## Error Handling:

Explains common errors and ways to resolve them.

## Integration Guide:
### Next APP
- [next-app](./examples/next-app/)
### Node APP
- [node-app](./examples/node-app/)

Guidance on how to incorporate the SDK into other applications.

## Contribution Guidelines:

Please refer to the [Contributing Guidelines](./.github/CONTRIBUTING.md) for more details.

## Release Notes:
[Release](./CHANGELOG.md)

## Genrate proto-ts

- run `./generate_proto.sh`
- it will genrate protobuf into `dist/protogen-ts`

## Support:

Contact details for help and support resources. This list isn't exhaustive but covers major aspects usually included in most SDK design documents.