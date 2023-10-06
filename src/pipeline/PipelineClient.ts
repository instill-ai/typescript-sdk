import axios, { AxiosInstance } from "axios";
import { getQueryString } from "../helper";
import { Nullable } from "../types";
import {
  Pipeline,
  PipelineRelease,
  RestoreUserPipelineReleaseResponse,
  SetDefaultUserPipelineReleaseResponse,
  TriggerAsyncUserPipelinePayload,
  TriggerAsyncUserPipelineReleaseResponse,
  TriggerAsyncUserPipelineResponse,
  TriggerUserPipelinePayload,
  TriggerUserPipelineResponse,
  GetUserPipelineReleaseResponse,
  GetUserPipelineResponse,
  ListPipelineReleasesResponse,
  ListPipelinesResponse,
  ListUserPipelinesResponse,
  WatchUserPipelineReleaseResponse,
  CreatePipelineResponse,
  CreateUserPipelinePayload,
  CreateUserPipelineReleasePayload,
  CreateUserPipelineReleaseResponse,
  RenameUserPipelinePayload,
  RenameUserPipelineResponse,
  UpdateUserPipelinePayload,
  UpdateUserPipelineReleasePayload,
  UpdateUserPipelineReleaseResponse,
  UpdateUserPipelineResponse,
} from "./types";

class PipelineClient {
  // Define your specific API methods here

  private axiosInstance: AxiosInstance;

  constructor(
    baseUrl: string,
    appVersion: string,
    apiToken: string
  ) {
    let URL: Nullable<string> = `${baseUrl}/vdp/${appVersion}`;

    this.axiosInstance = axios.create({
      baseURL: URL,
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
  }

  //  Queries

  async listPipelinesQuery({
    pageSize,
    nextPageToken,
  }: {
    pageSize: Nullable<number>;
    nextPageToken: Nullable<string>;
  }) {
    try {
      const pipelines: Pipeline[] = [];

      const queryString = getQueryString({
        baseURL: "/pipelines?view=VIEW_FULL",
        pageSize,
        nextPageToken,
        filter: null,
      });

      const { data } = await this.axiosInstance.get<ListPipelinesResponse>(
        queryString
      );

      pipelines.push(...data.pipelines);

      if (data.next_page_token) {
        pipelines.push(
          ...(await this.listPipelinesQuery({
            pageSize,
            nextPageToken: data.next_page_token,
          }))
        );
      }

      return Promise.resolve(pipelines);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async listUserPipelinesQuery({
    pageSize,
    nextPageToken,
    userName,
  }: {
    pageSize: Nullable<number>;
    nextPageToken: Nullable<string>;
    userName: string;
  }) {
    try {
      const pipelines: Pipeline[] = [];

      const queryString = getQueryString({
        baseURL: `${userName}/pipelines?view=VIEW_FULL`,
        pageSize,
        nextPageToken,
        filter: null,
      });

      const { data } = await this.axiosInstance.get<ListUserPipelinesResponse>(
        queryString
      );

      pipelines.push(...data.pipelines);

      if (data.next_page_token) {
        pipelines.push(
          ...(await this.listUserPipelinesQuery({
            pageSize,
            nextPageToken: data.next_page_token,

            userName,
          }))
        );
      }

      return Promise.resolve(pipelines);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async getUserPipelineQuery({ pipelineName }: { pipelineName: string }) {
    try {
      const { data } = await this.axiosInstance.get<GetUserPipelineResponse>(
        `/${pipelineName}?view=VIEW_FULL`
      );

      return Promise.resolve(data.pipeline);
    } catch (err) {
      return Promise.reject(err);
    }
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
    try {
      const releases: PipelineRelease[] = [];

      const queryString = getQueryString({
        baseURL: `/${pipelineName}/releases?view=VIEW_FULL`,
        pageSize,
        nextPageToken,
        filter: null,
      });

      const { data } =
        await this.axiosInstance.get<ListPipelineReleasesResponse>(queryString);

      releases.push(...data.releases);

      if (data.next_page_token) {
        releases.push(
          ...(await this.ListUserPipelineReleasesQuery({
            pipelineName,
            pageSize,
            nextPageToken: data.next_page_token,
          }))
        );
      }

      return Promise.resolve(releases);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async getUserPipelineReleaseQuery({
    pipelineReleaseName,
  }: {
    pipelineReleaseName: string;
  }) {
    try {
      const { data } =
        await this.axiosInstance.get<GetUserPipelineReleaseResponse>(
          `/${pipelineReleaseName}?view=VIEW_FULL`
        );

      return Promise.resolve(data.release);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async watchUserPipelineReleaseQuery({
    pipelineReleaseName,
  }: {
    pipelineReleaseName: string;
  }) {
    try {
      const { data } =
        await this.axiosInstance.get<WatchUserPipelineReleaseResponse>(
          `/${pipelineReleaseName}/watch`
        );
      return Promise.resolve(data.state);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  //  Mutation

  async createUserPipelineMutation({
    userName,
    payload,
  }: {
    userName: string;
    payload: CreateUserPipelinePayload;
  }) {
    try {
      const { data } = await this.axiosInstance.post<CreatePipelineResponse>(
        `${userName}/pipelines`,
        payload
      );
      return Promise.resolve(data.pipeline);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async updateUserPipelineMutation({
    payload,
  }: {
    payload: UpdateUserPipelinePayload;
  }) {
    try {
      const { data } =
        await this.axiosInstance.patch<UpdateUserPipelineResponse>(
          `/${payload.name}`,
          payload
        );
      return Promise.resolve(data.pipeline);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async deleteUserPipelineMutation({ pipelineName }: { pipelineName: string }) {
    try {
      await this.axiosInstance.delete(`/${pipelineName}`);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async renameUserPipelineMutation({
    payload,
  }: {
    payload: RenameUserPipelinePayload;
  }) {
    try {
      const { data } =
        await this.axiosInstance.post<RenameUserPipelineResponse>(
          `/${payload.name}/rename`,
          payload
        );

      return Promise.resolve(data.pipeline);
    } catch (err) {
      return Promise.reject(err);
    }
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
    try {
      const { data } =
        await this.axiosInstance.post<CreateUserPipelineReleaseResponse>(
          `${pipelineName}/releases`,
          payload
        );

      return Promise.resolve(data.release);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async updateUserPipelineReleaseMutation({
    payload,
    pipelineReleaseName,
  }: {
    payload: UpdateUserPipelineReleasePayload;
    pipelineReleaseName: string;
  }) {
    try {
      const { data } =
        await this.axiosInstance.patch<UpdateUserPipelineReleaseResponse>(
          `/${pipelineReleaseName}`,
          payload
        );
      return Promise.resolve(data.release);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async deleteUserPipelineReleaseMutation({
    pipelineReleaseName,
  }: {
    pipelineReleaseName: string;
  }) {
    try {
      await this.axiosInstance.delete(`/${pipelineReleaseName}`);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  // Actions

  async triggerUserPipelineAction({
    pipelineName,
    payload,

    returnTraces,
  }: {
    pipelineName: string;
    payload: TriggerUserPipelinePayload;

    returnTraces?: boolean;
  }) {
    try {
      const { data } =
        await this.axiosInstance.post<TriggerUserPipelineResponse>(
          `/${pipelineName}/trigger`,
          payload,
          {
            headers: {
              "instill-return-traces": returnTraces ? "true" : "false",
              "Access-Control-Allow-Headers": "instill-return-traces",
              "Content-Type": "application/json",
            },
          }
        );
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(err);
    }
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
    try {
      const { data } =
        await this.axiosInstance.post<TriggerAsyncUserPipelineResponse>(
          `/${pipelineName}/triggerAsync`,
          payload,
          {
            headers: {
              "instill-return-traces": returnTraces ? "true" : "false",
              "Access-Control-Allow-Headers": "instill-return-traces",
              "Content-Type": "application/json",
            },
          }
        );
      return Promise.resolve(data.operation);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /* -------------------------------------------------------------------------
   * Pipeline Release
   * -----------------------------------------------------------------------*/

  async setDefaultUserPipelineReleaseMutation({
    pipelineReleaseName,
  }: {
    pipelineReleaseName: string;
  }) {
    try {
      const { data } =
        await this.axiosInstance.post<SetDefaultUserPipelineReleaseResponse>(
          `/${pipelineReleaseName}/setDefault`
        );
      return Promise.resolve(data.release);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async restoreUserPipelineReleaseMutation({
    pipelineReleaseName,
  }: {
    pipelineReleaseName: string;
  }) {
    try {
      const { data } =
        await this.axiosInstance.post<RestoreUserPipelineReleaseResponse>(
          `/${pipelineReleaseName}/restore`
        );
      return Promise.resolve(data.release);
    } catch (err) {
      return Promise.reject(err);
    }
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
    try {
      const { data } =
        await this.axiosInstance.post<TriggerUserPipelineResponse>(
          `/${pipelineReleaseName}/trigger`,
          payload,
          {
            headers: {
              "instill-return-traces": returnTraces ? "true" : "false",
              "Access-Control-Allow-Headers": "instill-return-traces",
              "Content-Type": "application/json",
            },
          }
        );
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(err);
    }
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
    try {
      const { data } =
        await this.axiosInstance.post<TriggerAsyncUserPipelineReleaseResponse>(
          `/${pipelineReleaseName}/triggerAsync`,
          payload,
          {
            headers: {
              "instill-return-traces": returnTraces ? "true" : "false",
              "Access-Control-Allow-Headers": "instill-return-traces",
              "Content-Type": "application/json",
            },
          }
        );
      return Promise.resolve(data.operation);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default PipelineClient;
