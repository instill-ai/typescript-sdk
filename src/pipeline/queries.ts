import { AxiosInstance } from "axios";
import { Nullable } from "../types";
import {
  GetUserPipelineReleaseResponse,
  GetUserPipelineResponse,
  ListPipelineReleasesResponse,
  ListPipelinesResponse,
  ListUserPipelinesResponse,
  Pipeline,
  PipelineRelease,
  WatchUserPipelineReleaseResponse,
} from "./types";
import { getQueryString } from "../helper";

export async function listPipelinesQuery({
  axiosInstance,
  pageSize,
  nextPageToken,
}: {
  axiosInstance: AxiosInstance;
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

    const { data } = await axiosInstance.get<ListPipelinesResponse>(
      queryString
    );

    pipelines.push(...data.pipelines);

    if (data.next_page_token) {
      pipelines.push(
        ...(await listPipelinesQuery({
          axiosInstance,
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

export async function listUserPipelinesQuery({
  axiosInstance,
  pageSize,
  nextPageToken,
  userName,
}: {
  axiosInstance: AxiosInstance;
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

    const { data } = await axiosInstance.get<ListUserPipelinesResponse>(
      queryString
    );

    pipelines.push(...data.pipelines);

    if (data.next_page_token) {
      pipelines.push(
        ...(await listUserPipelinesQuery({
          axiosInstance,
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

export async function getUserPipelineQuery({
  axiosInstance,
  pipelineName,
}: {
  axiosInstance: AxiosInstance;
  pipelineName: string;
}) {
  try {
    const { data } = await axiosInstance.get<GetUserPipelineResponse>(
      `/${pipelineName}?view=VIEW_FULL`
    );

    return Promise.resolve(data.pipeline);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function ListUserPipelineReleasesQuery({
  axiosInstance,
  pipelineName,
  pageSize,
  nextPageToken,
}: {
  axiosInstance: AxiosInstance;
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

    const { data } = await axiosInstance.get<ListPipelineReleasesResponse>(
      queryString
    );

    releases.push(...data.releases);

    if (data.next_page_token) {
      releases.push(
        ...(await ListUserPipelineReleasesQuery({
          axiosInstance,
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

export async function getUserPipelineReleaseQuery({
  axiosInstance,
  pipelineReleaseName,
}: {
  axiosInstance: AxiosInstance;
  pipelineReleaseName: string;
}) {
  try {
    const { data } = await axiosInstance.get<GetUserPipelineReleaseResponse>(
      `/${pipelineReleaseName}?view=VIEW_FULL`
    );

    return Promise.resolve(data.release);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function watchUserPipelineReleaseQuery({
  axiosInstance,
  pipelineReleaseName,
}: {
  axiosInstance: AxiosInstance;
  pipelineReleaseName: string;
}) {
  try {
    const { data } = await axiosInstance.get<WatchUserPipelineReleaseResponse>(
      `/${pipelineReleaseName}/watch`
    );
    return Promise.resolve(data.state);
  } catch (err) {
    return Promise.reject(err);
  }
}
