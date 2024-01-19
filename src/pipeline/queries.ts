import { AxiosInstance } from "axios";
import { Nullable } from "../types";
import {
  GetOperatorDefinitionResponse,
  GetUserPipelineReleaseResponse,
  GetUserPipelineResponse,
  ListOperatorDefinitionsResponse,
  ListPipelineReleasesResponse,
  ListPipelinesResponse,
  ListUserPipelinesResponse,
  OperatorDefinition,
  Pipeline,
  PipelineRelease,
  WatchUserPipelineReleaseResponse,
  listPipelinesQueryParams,
  listUserPipelinesQueryProps,
} from "./types";
import { getQueryString } from "../helper";

export async function listPipelinesQuery(
  props: listPipelinesQueryParams & {
    enablePagination: true;
  }
): Promise<ListPipelinesResponse>;
export async function listPipelinesQuery(
  props: listPipelinesQueryParams & {
    enablePagination: false;
  }
): Promise<Pipeline[]>;
export async function listPipelinesQuery(
  props: listPipelinesQueryParams & {
    enablePagination: undefined;
  }
): Promise<Pipeline[]>;

export async function listPipelinesQuery(
  props: listPipelinesQueryParams & {
    enablePagination?: boolean;
  }
) {
  const {
    pageSize,
    nextPageToken,
    axiosInstance,
    enablePagination,
    visibility,
  } = props;

  try {
    const pipelines: Pipeline[] = [];

    const queryString = getQueryString({
      baseURL: "/pipelines?view=VIEW_FULL",
      pageSize,
      nextPageToken,
      queryParams: visibility ? `visibility=${visibility}` : undefined,
    });

    const { data } = await axiosInstance.get<ListPipelinesResponse>(
      queryString
    );

    if (enablePagination) {
      return Promise.resolve(data);
    }

    pipelines.push(...data.pipelines);

    if (data.next_page_token) {
      pipelines.push(
        ...(await listPipelinesQuery({
          pageSize: pageSize,
          nextPageToken: data.next_page_token,
          axiosInstance: axiosInstance,
          enablePagination: false,
        }))
      );
    }

    return Promise.resolve(pipelines);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function listUserPipelinesQuery(
  props: listUserPipelinesQueryProps & {
    enablePagination: true;
  }
): Promise<ListUserPipelinesResponse>;
export async function listUserPipelinesQuery(
  props: listUserPipelinesQueryProps & {
    enablePagination: false;
  }
): Promise<Pipeline[]>;
export async function listUserPipelinesQuery(
  props: listUserPipelinesQueryProps & {
    enablePagination: undefined;
  }
): Promise<Pipeline[]>;

export async function listUserPipelinesQuery(
  props: listUserPipelinesQueryProps & {
    enablePagination?: boolean;
  }
) {
  const { pageSize, nextPageToken, axiosInstance, userName, enablePagination } =
    props;
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

    if (enablePagination) {
      return Promise.resolve(data);
    }

    pipelines.push(...data.pipelines);

    if (data.next_page_token) {
      pipelines.push(
        ...(await listUserPipelinesQuery({
          pageSize: pageSize,
          nextPageToken: data.next_page_token,
          userName: userName,
          axiosInstance: axiosInstance,
          enablePagination: false,
        }))
      );
    }

    return Promise.resolve(pipelines);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function getUserPipelineQuery({
  pipelineName,
  axiosInstance,
  shareCode,
}: {
  pipelineName: string;
  axiosInstance: AxiosInstance;
  shareCode?: string;
}) {
  try {
    const { data } = await axiosInstance.get<GetUserPipelineResponse>(
      `/${pipelineName}?view=VIEW_FULL`,
      {
        headers: {
          "instill-share-code": shareCode,
          "Access-Control-Allow-Headers": shareCode
            ? "instill-share-code"
            : undefined,
          "Content-Type": "application/json",
        },
      }
    );

    return Promise.resolve(data.pipeline);
  } catch (err) {
    return Promise.reject(err);
  }
}

/* -------------------------------------------------------------------------
 * Pipeline Release
 * -----------------------------------------------------------------------*/

export async function ListUserPipelineReleasesQuery({
  pipelineName,
  pageSize,
  nextPageToken,
  axiosInstance,
  shareCode,
}: {
  pipelineName: string;
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
  axiosInstance: AxiosInstance;
  shareCode?: string;
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
      queryString,
      {
        headers: {
          "instill-share-code": shareCode,
          "Access-Control-Allow-Headers": shareCode
            ? "instill-share-code"
            : undefined,
          "Content-Type": "application/json",
        },
      }
    );

    releases.push(...data.releases);

    if (data.next_page_token) {
      releases.push(
        ...(await ListUserPipelineReleasesQuery({
          pipelineName,
          pageSize,
          nextPageToken: data.next_page_token,
          axiosInstance,
          shareCode,
        }))
      );
    }

    return Promise.resolve(releases);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function getUserPipelineReleaseQuery({
  pipelineReleaseName,
  axiosInstance,
}: {
  pipelineReleaseName: string;
  axiosInstance: AxiosInstance;
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
  pipelineReleaseName,
  axiosInstance,
}: {
  pipelineReleaseName: string;
  axiosInstance: AxiosInstance;
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

/* -------------------------------------------------------------------------
 * Operator
 * -----------------------------------------------------------------------*/

export async function listOperatorDefinitionsQuery({
  pageSize,
  nextPageToken,
  axiosInstance,
  filter,
}: {
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
  axiosInstance: AxiosInstance;
  filter: Nullable<string>;
}) {
  try {
    const operatorDefinitions: OperatorDefinition[] = [];

    const queryString = getQueryString({
      baseURL: `/operator-definitions?view=VIEW_FULL`,
      pageSize,
      nextPageToken,
      filter,
    });

    const { data } = await axiosInstance.get<ListOperatorDefinitionsResponse>(
      queryString
    );

    operatorDefinitions.push(...data.operator_definitions);

    if (data.next_page_token) {
      operatorDefinitions.push(
        ...(await listOperatorDefinitionsQuery({
          pageSize,
          axiosInstance,
          nextPageToken: data.next_page_token,
          filter,
        }))
      );
    }

    return Promise.resolve(operatorDefinitions);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function getOperatorDefinitionQuery({
  operatorDefinitionName,
  axiosInstance,
}: {
  operatorDefinitionName: string;
  axiosInstance: AxiosInstance;
}) {
  try {
    const { data } = await axiosInstance.get<GetOperatorDefinitionResponse>(
      `/${operatorDefinitionName}?view=VIEW_FULL`
    );

    return Promise.resolve(data.operator_definition);
  } catch (err) {
    return Promise.reject(err);
  }
}
