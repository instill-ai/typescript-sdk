import axios, { AxiosInstance } from "axios";
import { Nullable } from "../types";
import {
  TriggerAsyncUserPipelinePayload,
  TriggerUserPipelinePayload,
  CreateUserPipelineReleasePayload,
  RenameUserPipelinePayload,
  UpdateUserPipelinePayload,
  UpdateUserPipelineReleasePayload,
  CreateUserPipelinePayload,
} from "./types";
import {
  getUserPipelineQuery,
  getUserPipelineReleaseQuery,
  listPipelinesQuery,
  ListUserPipelineReleasesQuery,
  listUserPipelinesQuery,
  watchUserPipelineReleaseQuery,
} from "./queries";
import {
  createUserPipelineMutation,
  createUserPipelineReleaseMutation,
  deleteUserPipelineMutation,
  deleteUserPipelineReleaseMutation,
  renameUserPipelineMutation,
  updateUserPipelineMutation,
  updateUserPipelineReleaseMutation,
} from "./mutation";
import {
  restoreUserPipelineReleaseMutation,
  setDefaultUserPipelineReleaseMutation,
  triggerAsyncUserPipelineAction,
  triggerAsyncUserPipelineReleaseAction,
  triggerUserPipelineAction,
  triggerUserPipelineReleaseAction,
} from "./action";

export class PipelineClient {
  // Define your specific API methods here

  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string, appVersion: string, apiToken: string) {
    const URL: Nullable<string> = `${baseUrl}/${appVersion}`;

    this.axiosInstance = axios.create({
      baseURL: URL,
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
  }

  /* -------------------------------------------------------------------------
   * Pipeline Queries
   * -----------------------------------------------------------------------*/

  async listPipelinesQuery({
    pageSize,
    nextPageToken,
  }: {
    pageSize: Nullable<number>;
    nextPageToken: Nullable<string>;
    enablePagination?: boolean;
  }) {
    return listPipelinesQuery({
      axiosInstance: this.axiosInstance,
      pageSize,
      nextPageToken,
      enablePagination: true,
    });
  }

  async listUserPipelinesQuery({
    pageSize,
    nextPageToken,
    userName,
  }: {
    pageSize: Nullable<number>;
    nextPageToken: Nullable<string>;
    userName: string;
    enablePagination: boolean;
  }) {
    return listUserPipelinesQuery({
      axiosInstance: this.axiosInstance,
      pageSize,
      nextPageToken,
      userName,
      enablePagination: true,
    });
  }

  async getUserPipelineQuery({ pipelineName }: { pipelineName: string }) {
    return getUserPipelineQuery({
      axiosInstance: this.axiosInstance,
      pipelineName,
    });
  }

  /* -------------------------------------------------------------------------
   * Pipeline Release
   * -----------------------------------------------------------------------*/

  async ListUserPipelineReleasesQuery({
    pipelineName,
    pageSize,
    nextPageToken,
  }: {
    pipelineName: string;
    pageSize: Nullable<number>;
    nextPageToken: Nullable<string>;
  }) {
    return ListUserPipelineReleasesQuery({
      axiosInstance: this.axiosInstance,
      pipelineName,
      pageSize,
      nextPageToken,
    });
  }

  async getUserPipelineReleaseQuery({
    pipelineReleaseName,
  }: {
    pipelineReleaseName: string;
  }) {
    return getUserPipelineReleaseQuery({
      axiosInstance: this.axiosInstance,
      pipelineReleaseName,
    });
  }

  async watchUserPipelineReleaseQuery({
    pipelineReleaseName,
  }: {
    pipelineReleaseName: string;
  }) {
    return watchUserPipelineReleaseQuery({
      axiosInstance: this.axiosInstance,
      pipelineReleaseName,
    });
  }

  /* -------------------------------------------------------------------------
   * Pipeline Mutation
   * -----------------------------------------------------------------------*/

  async createUserPipelineMutation({
    userName,
    payload,
  }: {
    userName: string;
    payload: CreateUserPipelinePayload;
  }) {
    return createUserPipelineMutation({
      axiosInstance: this.axiosInstance,
      userName,
      payload,
    });
  }

  async updateUserPipelineMutation({
    payload,
  }: {
    payload: UpdateUserPipelinePayload;
  }) {
    return updateUserPipelineMutation({
      axiosInstance: this.axiosInstance,
      payload,
    });
  }

  async deleteUserPipelineMutation({ pipelineName }: { pipelineName: string }) {
    return deleteUserPipelineMutation({
      axiosInstance: this.axiosInstance,
      pipelineName,
    });
  }

  async renameUserPipelineMutation({
    payload,
  }: {
    payload: RenameUserPipelinePayload;
  }) {
    return renameUserPipelineMutation({
      axiosInstance: this.axiosInstance,
      payload,
    });
  }

  /* -------------------------------------------------------------------------
   * Pipeline Release
   * -----------------------------------------------------------------------*/

  async createUserPipelineReleaseMutation({
    pipelineName,
    payload,
  }: {
    pipelineName: string;
    payload: CreateUserPipelineReleasePayload;
  }) {
    return createUserPipelineReleaseMutation({
      axiosInstance: this.axiosInstance,
      pipelineName,
      payload,
    });
  }

  async updateUserPipelineReleaseMutation({
    payload,
    pipelineReleaseName,
  }: {
    payload: UpdateUserPipelineReleasePayload;
    pipelineReleaseName: string;
  }) {
    return updateUserPipelineReleaseMutation({
      axiosInstance: this.axiosInstance,
      payload,
      pipelineReleaseName,
    });
  }

  async deleteUserPipelineReleaseMutation({
    pipelineReleaseName,
  }: {
    pipelineReleaseName: string;
  }) {
    return deleteUserPipelineReleaseMutation({
      axiosInstance: this.axiosInstance,
      pipelineReleaseName,
    });
  }

  /* -------------------------------------------------------------------------
   * Pipeline Actions
   * -----------------------------------------------------------------------*/

  async triggerUserPipelineAction({
    pipelineName,
    payload,
    returnTraces,
  }: {
    pipelineName: string;
    payload: TriggerUserPipelinePayload;
    returnTraces?: boolean;
  }) {
    return triggerUserPipelineAction({
      axiosInstance: this.axiosInstance,
      pipelineName,
      payload,
      returnTraces,
    });
  }

  async triggerAsyncUserPipelineAction({
    pipelineName,
    payload,
    returnTraces,
  }: {
    pipelineName: string;
    payload: TriggerAsyncUserPipelinePayload;
    returnTraces?: boolean;
  }) {
    return triggerAsyncUserPipelineAction({
      axiosInstance: this.axiosInstance,
      pipelineName,
      payload,
      returnTraces,
    });
  }

  /* -------------------------------------------------------------------------
   * Pipeline Release
   * -----------------------------------------------------------------------*/

  async setDefaultUserPipelineReleaseMutation({
    pipelineReleaseName,
  }: {
    pipelineReleaseName: string;
  }) {
    return setDefaultUserPipelineReleaseMutation({
      axiosInstance: this.axiosInstance,
      pipelineReleaseName,
    });
  }

  async restoreUserPipelineReleaseMutation({
    pipelineReleaseName,
  }: {
    pipelineReleaseName: string;
  }) {
    return restoreUserPipelineReleaseMutation({
      axiosInstance: this.axiosInstance,
      pipelineReleaseName,
    });
  }

  async triggerUserPipelineReleaseAction({
    pipelineReleaseName,
    payload,
    returnTraces,
  }: {
    pipelineReleaseName: string;
    payload: TriggerUserPipelinePayload;
    returnTraces?: boolean;
  }) {
    return triggerUserPipelineReleaseAction({
      axiosInstance: this.axiosInstance,
      pipelineReleaseName,
      payload,
      returnTraces,
    });
  }

  async triggerAsyncUserPipelineReleaseAction({
    pipelineReleaseName,
    payload,
    returnTraces,
  }: {
    pipelineReleaseName: string;
    payload: TriggerAsyncUserPipelinePayload;
    returnTraces?: boolean;
  }) {
    return triggerAsyncUserPipelineReleaseAction({
      axiosInstance: this.axiosInstance,
      pipelineReleaseName,
      payload,
      returnTraces,
    });
  }
}

export default PipelineClient;
