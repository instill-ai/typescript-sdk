import axios, { AxiosInstance } from "axios";
import { Nullable } from "../types";
import { CreateUserModelPayload, UpdateUserModelPayload } from "./types";
import {
  getModelDefinitionQuery,
  getUserModelQuery,
  getUserModelReadmeQuery,
  listModelDefinitionsQuery,
  listModelsQuery,
  listUserModelsQuery,
  watchUserModel,
} from "./queries";
import {
  createUserModelMutation,
  deleteUserModelMutation,
  updateModelMutation,
} from "./mutation";
import { deployUserModelAction, undeployUserModelAction } from "./action";
class ModelClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string, appVersion: string, apiToken: string) {
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
    return getModelDefinitionQuery({
      axiosInstance: this.axiosInstance,
      modelDefinitionName,
    });
  }

  async listModelDefinitionsQuery({
    pageSize,
    nextPageToken,
  }: {
    pageSize: Nullable<number>;
    nextPageToken: Nullable<string>;
  }) {
    return listModelDefinitionsQuery({
      axiosInstance: this.axiosInstance,
      pageSize,
      nextPageToken,
    });
  }

  /* -------------------------------------------------------------------------
   * Model
   * -----------------------------------------------------------------------*/

  async getUserModelQuery({ modelName }: { modelName: string }) {
    return getUserModelQuery({
      axiosInstance: this.axiosInstance,
      modelName,
    });
  }

  async listModelsQuery({
    pageSize,
    nextPageToken,
  }: {
    pageSize: Nullable<number>;
    nextPageToken: Nullable<string>;
  }) {
    return listModelsQuery({
      axiosInstance: this.axiosInstance,
      pageSize,
      nextPageToken,
    });
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
    return listUserModelsQuery({
      axiosInstance: this.axiosInstance,
      userName,
      pageSize,
      nextPageToken,
    });
  }

  async getUserModelReadmeQuery({ modelName }: { modelName: string }) {
    return getUserModelReadmeQuery({
      axiosInstance: this.axiosInstance,
      modelName,
    });
  }

  /* -------------------------------------------------------------------------
   * Watch Model State
   * -----------------------------------------------------------------------*/

  async watchUserModel({ modelName }: { modelName: string }) {
    return watchUserModel({
      axiosInstance: this.axiosInstance,
      modelName,
    });
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
    return createUserModelMutation({
      axiosInstance: this.axiosInstance,
      userName,
      payload,
    });
  }

  async updateModelMutation({ payload }: { payload: UpdateUserModelPayload }) {
    return updateModelMutation({
      axiosInstance: this.axiosInstance,
      payload,
    });
  }

  async deleteUserModelMutation({ modelName }: { modelName: string }) {
    return deleteUserModelMutation({
      axiosInstance: this.axiosInstance,
      modelName,
    });
  }

  /* -------------------------------------------------------------------------
   * Model Action
   * -----------------------------------------------------------------------*/

  async deployUserModelAction({ modelName }: { modelName: string }) {
    return deployUserModelAction({
      axiosInstance: this.axiosInstance,
      modelName,
    });
  }

  async undeployUserModelAction({ modelName }: { modelName: string }) {
    return undeployUserModelAction({
      axiosInstance: this.axiosInstance,
      modelName,
    });
  }
}

export default ModelClient;
