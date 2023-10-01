import { OpenAPIV3 } from "openapi-types";
import { ConnectorDefinition, ConnectorResource } from "../connector";
import { Spec, Visibility } from "../types";
import { Nullable } from "../types";
import { Operation } from "../operation";

export type PipelineMode = "MODE_UNSPECIFIED" | "MODE_SYNC" | "MODE_ASYNC";

export type PipelineReleaseState =
  | "STATE_UNSPECIFIED"
  | "STATE_ACTIVE"
  | "STATE_INACTIVE"
  | "STATE_ERROR"
  | "STATE_DELETED";

export type PipelineRecipe = {
  version: string;
  components: PipelineComponent[];
};

export type RawPipelineRecipe = {
  version: string;
  components: RawPipelineComponent[];
};

export type RawPipelineComponent = {
  id: string;
  resource_name: string;
  configuration: Record<string, any>;
  definition_name: string;
};

export type PipelineReleaseWatchState = {
  state: PipelineReleaseState;
  progress: number;
};

export type PipelineComponentType =
  | "COMPONENT_TYPE_UNSPECIFIED"
  | "COMPONENT_TYPE_CONNECTOR_AI"
  | "COMPONENT_TYPE_CONNECTOR_DATA"
  | "COMPONENT_TYPE_CONNECTOR_BLOCKCHAIN"
  | "COMPONENT_TYPE_OPERATOR";

export type PipelineReleasesWatchState = Record<
  string,
  PipelineReleaseWatchState
>;

export type Pipeline = {
  name: string;
  uid: string;
  id: string;
  description: string;
  user: string;
  create_time: string;
  update_time: string;
  recipe: PipelineRecipe;
  openapi_schema: OpenAPIV3.Document;
  owner: string;
};

export type OperatorDefinition = {
  name: string;
  uid: string;
  id: string;
  title: string;
  documentation_url: string;
  icon: string;
  spec: Spec;
  tombstone: boolean;
  public: boolean;
  custom: boolean;
  icon_url: string;
};

export type PipelineRelease = {
  name: string;
  uid: string;
  id: string;
  description: string;
  recipe: PipelineRecipe;
  create_time: string;
  update_time: string;
  visibility: Visibility;
  openapi_schema: OpenAPIV3.Document;
};

export type PipelineTrace = {
  success: boolean;
  inputs: Record<string, any>[];
  outputs: Record<string, any>[];
  error: Record<string, any>;
  compute_time_in_seconds: number;
};

export type PipelineTriggerMetadata = {
  traces: Record<string, PipelineTrace>;
};

export type PipelineStartComponent = {
  id: "start";
  resource_name: string;
  resource: Nullable<ConnectorResource>;
  type: PipelineComponentType;
  definition_name: string;
  operator_definition: Nullable<OperatorDefinition>;
  configuration: Record<string, Record<string, StartOperatorInput>>;
};

export type PipelineEndComponent = {
  id: "end";
  resource_name: string;
  resource: Nullable<ConnectorResource>;
  type: PipelineComponentType;
  definition_name: string;
  operator_definition: Nullable<OperatorDefinition>;
  configuration: Record<string, Record<string, any>>;
};

export type PipelineConnectorComponent = {
  id: string;
  resource_name: string;
  resource: Nullable<ConnectorResource>;
  type: PipelineComponentType;
  definition_name: string;
  connector_definition: Nullable<ConnectorDefinition>;
  configuration: Record<string, any>;
};

export type PipelineComponent =
  | PipelineStartComponent
  | PipelineEndComponent
  | PipelineConnectorComponent;

export type StartOperatorBody = Record<string, StartOperatorInput>;

export type StartOperatorInputBodyValue = Record<string, any>;

export type StartOperatorInput = {
  title: string;
  type: StartOperatorInputType;
};

export type StartOperatorInputType =
  | StartOperatorInputSingularType
  | StartOperatorInputArrayType;

export type StartOperatorInputSingularType =
  | "text"
  | "number"
  | "boolean"
  | "audio"
  | "image";

export type StartOperatorInputArrayType =
  | "text_array"
  | "number_array"
  | "boolean_array"
  | "audio_array"
  | "image_array";

export type TriggerUserPipelinePayload = {
  inputs: Record<string, any>[];
};

export type TriggerUserPipelineResponse = {
  outputs: Record<string, any>[];
  metadata: PipelineTriggerMetadata;
};

export type TriggerAsyncUserPipelinePayload = {
  inputs: Record<string, any>[];
};

export type TriggerAsyncUserPipelineResponse = {
  operation: Operation;
};

export type SetDefaultUserPipelineReleaseResponse = {
  release: PipelineRelease;
};

export type RestoreUserPipelineReleaseResponse = {
  release: PipelineRelease;
};

export type TriggerUserPipelineReleasePayload = {
  inputs: Record<string, any>[];
};

export type TriggerUserPipelineReleaseResponse = {
  outputs: Record<string, any>[];
  metadata: PipelineTriggerMetadata;
};

export type TriggerAsyncUserPipelineReleasePayload = {
  inputs: Record<string, any>[];
};

export type TriggerAsyncUserPipelineReleaseResponse = {
  operation: Operation;
};

export type CreateUserPipelinePayload = {
  id: string;
  description?: string;
  recipe: RawPipelineRecipe;
};

export type CreatePipelineResponse = {
  pipeline: Pipeline;
};

export type UpdateUserPipelinePayload = {
  name: string;
  description?: string;
  recipe: RawPipelineRecipe;
};

export type UpdateUserPipelineResponse = {
  pipeline: Pipeline;
};

export type RenameUserPipelinePayload = {
  name: string;
  new_pipeline_id: string;
};

export type RenameUserPipelineResponse = {
  pipeline: Pipeline;
};

export type CreateUserPipelineReleasePayload = {
  id: string;
  description?: string;
  recipe: RawPipelineRecipe;
};

export type CreateUserPipelineReleaseResponse = {
  release: PipelineRelease;
};

export type UpdateUserPipelineReleasePayload = {
  description?: string;
  recipe: RawPipelineRecipe;
};

export type UpdateUserPipelineReleaseResponse = {
  release: PipelineRelease;
};

export type ListPipelinesResponse = {
  pipelines: Pipeline[];
  next_page_token: string;
  total_size: number;
};

export type ListUserPipelinesResponse = {
  pipelines: Pipeline[];
  next_page_token: string;
  total_size: number;
};

export type GetUserPipelineResponse = {
  pipeline: Pipeline;
};

export type ListPipelineReleasesResponse = {
  releases: PipelineRelease[];
  next_page_token: string;
  total_size: number;
};

export type GetUserPipelineReleaseResponse = {
  release: PipelineRelease;
};

export type WatchUserPipelineReleaseResponse = {
  state: PipelineReleaseWatchState;
};
