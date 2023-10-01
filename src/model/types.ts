/* eslint-disable  @typescript-eslint/no-explicit-any */

import { Operation } from "../operation";
import { Pipeline } from "../pipeline";
import { Nullable, Visibility } from "../types";

export type ModelReleaseStage =
  | "RELEASE_STAGE_UNSPECIFIED"
  | "RELEASE_STAGE_ALPHA"
  | "RELEASE_STAGE_BETA"
  | "RELEASE_STAGE_GENERALLY_AVAILABLE"
  | "RELEASE_STAGE_CUSTOM";

/* -------------------------------------------------------------------------
 * Model Definition
 * -----------------------------------------------------------------------*/

export type ModelDefinition = {
  name: string;
  uid: string;
  id: string;
  title: string;
  documentation_url: string;
  icon: string;
  release_stage: ModelReleaseStage;
  model_spec: Record<string, any>;
  create_time: string;
  update_time: string;
};

/* -------------------------------------------------------------------------
 * Model
 * -----------------------------------------------------------------------*/

export type Model = {
  name: string;
  uid: string;
  id: string;
  description: string;
  model_definition: string;
  configuration: {
    [key: string]: any;
  };
  task: string;
  state: ModelState;
  visibility: Visibility;
  owner: string;
  create_time: string;
  update_time: string;
};

export type ModelState =
  | "STATE_ONLINE"
  | "STATE_OFFLINE"
  | "STATE_ERROR"
  | "STATE_UNSPECIFIED";

export type ModelReadme = {
  name: string;
  size: number;
  type: string;
  content: string;
  encoding: string;
};

export type ModelTask =
  | "TASK_CLASSIFICATION"
  | "TASK_DETECTION"
  | "TASK_KEYPOINT"
  | "TASK_OCR"
  | "TASK_INSTANCE_SEGMENTATION"
  | "TASK_SEMANTIC_SEGMENTATION"
  | "TASK_TEXT_GENERATION"
  | "TASK_TEXT_TO_IMAGE"
  | "TASK_IMAGE_TO_IMAGE"
  | "TASK_IMAGE_TO_TEXT";

export type ModelHubPreset = {
  id: string;
  description: string;
  task: string;
  model_definition: string;
  configuration: Record<string, string>;
};

export type ModelWatchState = {
  state: ModelState;
  progress: number;
};

export type ModelsWatchState = Record<string, ModelWatchState>;

export type ModelWithPipelines = Model & {
  pipelines: Pipeline[];
};

export type DeployUserModelResponse = {
  model_id: string;
};

export type UndeployUserModelResponse = {
  model_id: string;
};

export type CreateUserGithubModelConfiguration = {
  repository: string;
  tag: string;
};

export type CreateUserLocalModelConfiguration = {
  content: File;
};

export type CreateUserArtivcModelConfiguration = {
  url: string;
  tag: string;
  credential: Nullable<string>;
};

export type CreateUserHuggingFaceModelConfiguration = {
  repo_id: string;
};

export type CreateUserModelPayload =
  | CreateUserGitHubModelPayload
  | CreateUserLocalModelPayload
  | CreateUserHuggingFaceModelPayload
  | CreateUserArtiVCModelPayload;

export type CreateUserGitHubModelPayload = {
  id: string;
  model_definition: string;
  description?: string;
  type: "GitHub";
  configuration: CreateUserGithubModelConfiguration;
};

export type CreateUserLocalModelPayload = {
  id: string;
  model_definition: string;
  description?: string;
  type: "Local";
  configuration: CreateUserLocalModelConfiguration;
};

export type CreateUserHuggingFaceModelPayload = {
  id: string;
  model_definition: string;
  description?: string;
  type: "HuggingFace";
  configuration: CreateUserHuggingFaceModelConfiguration;
};

export type CreateUserArtiVCModelPayload = {
  id: string;
  model_definition: string;
  description?: string;
  type: "ArtiVC";
  configuration: CreateUserArtivcModelConfiguration;
};

export type CreateUserModelResponse = {
  operation: Operation;
};

export type UpdateUserModelPayload = {
  name: string;
  description?: string;
  configuration?: Record<string, any>;
};

export type UpdateUserModelResponse = {
  model: Model;
};

export type GetModelDefinitionResponse = {
  model_definition: ModelDefinition;
};

export type ListModelDefinitionsResponse = {
  model_definitions: ModelDefinition[];
  next_page_token: string;
  total_size: number;
};

export type GetUserModelResponse = {
  model: Model;
};

export type ListModelsResponse = {
  models: Model[];
  next_page_token: string;
  total_size: number;
};

export type ListUserModelsResponse = {
  models: Model[];
  next_page_token: string;
  total_size: number;
};

export type GetUserModelReadmeQueryResponse = {
  readme: ModelReadme;
};
