import { AxiosInstance } from "axios";
import {
  GetModelDefinitionResponse,
  GetUserModelReadmeQueryResponse,
  GetUserModelResponse,
  ListModelDefinitionsResponse,
  ListModelsResponse,
  ListUserModelsResponse,
  Model,
  ModelDefinition,
  ModelWatchState,
} from "./types";
import { Nullable } from "../types";
import { getQueryString } from "../helper";

export async function getModelDefinitionQuery({
  axiosInstance,
  modelDefinitionName,
}: {
  axiosInstance: AxiosInstance;
  modelDefinitionName: string;
}) {
  try {
    const { data } = await axiosInstance.get<GetModelDefinitionResponse>(
      `/${modelDefinitionName}`
    );
    return Promise.resolve(data.model_definition);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function listModelDefinitionsQuery({
  axiosInstance,
  pageSize,
  nextPageToken,
}: {
  axiosInstance: AxiosInstance;
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
}) {
  try {
    const modelDefinitions: ModelDefinition[] = [];

    const queryString = getQueryString({
      baseURL: "/model-definitions",
      pageSize,
      nextPageToken,
      filter: null,
    });

    const { data } = await axiosInstance.get<ListModelDefinitionsResponse>(
      queryString
    );

    modelDefinitions.push(...data.model_definitions);

    if (data.next_page_token) {
      modelDefinitions.push(
        ...(await listModelDefinitionsQuery({
          axiosInstance,
          pageSize,
          nextPageToken: data.next_page_token,
        }))
      );
    }

    return Promise.resolve(modelDefinitions);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function getUserModelQuery({
  axiosInstance,
  modelName,
}: {
  axiosInstance: AxiosInstance;
  modelName: string;
}) {
  try {
    const { data } = await axiosInstance.get<GetUserModelResponse>(
      `/${modelName}?view=VIEW_FULL`
    );
    return Promise.resolve(data.model);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function listModelsQuery({
  axiosInstance,
  pageSize,
  nextPageToken,
}: {
  axiosInstance: AxiosInstance;
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
}) {
  try {
    const models: Model[] = [];

    const queryString = getQueryString({
      baseURL: "/models?view=VIEW_FULL",
      pageSize,
      nextPageToken,
      filter: null,
    });

    const { data } = await axiosInstance.get<ListModelsResponse>(queryString);

    models.push(...data.models);

    if (data.next_page_token) {
      models.push(
        ...(await listModelsQuery({
          axiosInstance,
          pageSize,
          nextPageToken: data.next_page_token,
        }))
      );
    }

    return Promise.resolve(models);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function listUserModelsQuery({
  axiosInstance,
  userName,
  pageSize,
  nextPageToken,
}: {
  axiosInstance: AxiosInstance;
  userName: string;
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
}) {
  try {
    const models: Model[] = [];

    const queryString = getQueryString({
      baseURL: `/${userName}/models?view=VIEW_FULL`,
      pageSize,
      nextPageToken,
      filter: null,
    });

    const { data } = await axiosInstance.get<ListUserModelsResponse>(
      queryString
    );

    models.push(...data.models);

    if (data.next_page_token) {
      models.push(
        ...(await listUserModelsQuery({
          axiosInstance,
          userName,
          pageSize,
          nextPageToken: data.next_page_token,
        }))
      );
    }

    return Promise.resolve(models);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function getUserModelReadmeQuery({
  axiosInstance,
  modelName,
}: {
  axiosInstance: AxiosInstance;
  modelName: string;
}) {
  try {
    const { data } = await axiosInstance.get<GetUserModelReadmeQueryResponse>(
      `/${modelName}/readme`
    );
    return Promise.resolve(data.readme);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function watchUserModel({
  axiosInstance,
  modelName,
}: {
  axiosInstance: AxiosInstance;
  modelName: string;
}) {
  try {
    const { data } = await axiosInstance.get<ModelWatchState>(
      `/${modelName}/watch`
    );
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}
