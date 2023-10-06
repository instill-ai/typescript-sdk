import axios, { AxiosInstance } from "axios";
import { Nullable } from "../types";
import {
  Model,
  ModelDefinition,
  ModelWatchState,
  GetModelDefinitionResponse,
  GetUserModelReadmeQueryResponse,
  GetUserModelResponse,
  ListModelDefinitionsResponse,
  ListModelsResponse,
  ListUserModelsResponse,
  CreateUserModelPayload,
  CreateUserModelResponse,
  UpdateUserModelPayload,
  UpdateUserModelResponse,
  DeployUserModelResponse,
  UndeployUserModelResponse,
} from "./types";
import { getQueryString } from "../helper";
class ModelClient {
  private axiosInstance: AxiosInstance;

  constructor(
    baseUrl: string,
    appVersion: string,
    apiToken: Nullable<string>
  ) {
    let URL: Nullable<string> = `${baseUrl}/model/${appVersion}`;

    this.axiosInstance = axios.create({
      baseURL: URL,
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
  }

  /* -------------------------------------------------------------------------
   * Model Queries
   * -----------------------------------------------------------------------*/

  async getModelDefinitionQuery({
    modelDefinitionName,
  }: {
    modelDefinitionName: string;
  }) {
    try {
      const { data } = await this.axiosInstance.get<GetModelDefinitionResponse>(
        `/${modelDefinitionName}`
      );

      return Promise.resolve(data.model_definition);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async listModelDefinitionsQuery({
    pageSize,
    nextPageToken,
  }: {
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

      const { data } =
        await this.axiosInstance.get<ListModelDefinitionsResponse>(queryString);

      modelDefinitions.push(...data.model_definitions);

      if (data.next_page_token) {
        modelDefinitions.push(
          ...(await this.listModelDefinitionsQuery({
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

  /* -------------------------------------------------------------------------
   * Model
   * -----------------------------------------------------------------------*/

  async getUserModelQuery({ modelName }: { modelName: string }) {
    try {
      const { data } = await this.axiosInstance.get<GetUserModelResponse>(
        `/${modelName}?view=VIEW_FULL`
      );
      return Promise.resolve(data.model);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async listModelsQuery({
    pageSize,
    nextPageToken,
  }: {
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

      const { data } = await this.axiosInstance.get<ListModelsResponse>(
        queryString
      );

      models.push(...data.models);

      if (data.next_page_token) {
        models.push(
          ...(await this.listModelsQuery({
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

  async listUserModelsQuery({
    userName,
    pageSize,
    nextPageToken,
  }: {
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

      const { data } = await this.axiosInstance.get<ListUserModelsResponse>(
        queryString
      );

      models.push(...data.models);

      if (data.next_page_token) {
        models.push(
          ...(await this.listUserModelsQuery({
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

  async getUserModelReadmeQuery({ modelName }: { modelName: string }) {
    try {
      const { data } =
        await this.axiosInstance.get<GetUserModelReadmeQueryResponse>(
          `/${modelName}/readme`
        );
      return Promise.resolve(data.readme);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /* -------------------------------------------------------------------------
   * Watch Model State
   * -----------------------------------------------------------------------*/

  async watchUserModel({ modelName }: { modelName: string }) {
    try {
      const { data } = await this.axiosInstance.get<ModelWatchState>(
        `/${modelName}/watch`
      );
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /* -------------------------------------------------------------------------
   * Model Mutation
   * -----------------------------------------------------------------------*/

  async createUserModelMutation({
    userName,
    payload,
  }: {
    userName: string;
    payload: CreateUserModelPayload;
  }) {
    if (payload.type === "Local") {
      try {
        const formData = new FormData();
        formData.append("id", payload.id);
        formData.append("model_definition", payload.model_definition);
        formData.append("content", payload.configuration.content);

        if (payload.description) {
          formData.append("description", payload.description);
        }

        const { data } = await this.axiosInstance.post<CreateUserModelResponse>(
          "/models/multipart",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return Promise.resolve(data.operation);
      } catch (err) {
        return Promise.reject(err);
      }
    } else {
      let input: Record<string, any> = {};

      if (payload.type === "GitHub") {
        input = {
          id: payload.id,
          model_definition: payload.model_definition,
          description: payload.description,
          configuration: {
            repository: payload.configuration.repository,
            tag: payload.configuration.tag,
          },
        };
      } else if (payload.type === "ArtiVC") {
        input = {
          id: payload.id,
          model_definition: payload.model_definition,
          description: payload.description,
          configuration: {
            url: payload.configuration.url,
            credential: payload.configuration.credential
              ? JSON.parse(payload.configuration.credential)
              : undefined,
            tag: payload.configuration.tag,
          },
        };
      } else {
        input = {
          id: payload.id,
          model_definition: payload.model_definition,
          description: payload.description,
          configuration: {
            repo_id: payload.configuration.repo_id,
          },
        };
      }

      try {
        const { data } = await this.axiosInstance.post<CreateUserModelResponse>(
          `${userName}/models`,
          input
        );

        return Promise.resolve(data.operation);
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }

  async updateModelMutation({ payload }: { payload: UpdateUserModelPayload }) {
    try {
      const { data } = await this.axiosInstance.patch<UpdateUserModelResponse>(
        `/${payload.name}`,
        payload
      );
      return Promise.resolve(data.model);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async deleteUserModelMutation({ modelName }: { modelName: string }) {
    try {
      await this.axiosInstance.delete(`/${modelName}`);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /* -------------------------------------------------------------------------
   * Model Action
   * -----------------------------------------------------------------------*/

  async deployUserModelAction({ modelName }: { modelName: string }) {
    try {
      const { data } = await this.axiosInstance.post<DeployUserModelResponse>(
        `/${modelName}/deploy`
      );
      return Promise.resolve(data.model_id);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async undeployUserModeleAction({ modelName }: { modelName: string }) {
    try {
      const { data } = await this.axiosInstance.post<UndeployUserModelResponse>(
        `/${modelName}/undeploy`
      );
      return Promise.resolve(data.model_id);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default ModelClient;
