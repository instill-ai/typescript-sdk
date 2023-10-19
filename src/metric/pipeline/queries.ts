import { AxiosInstance } from "axios";
import { Nullable } from "../../types";
import {
  ListPipelineTriggerRecordsResponse,
  ListPipelinesChartResponse,
  ListTriggeredPipelinesResponse,
  PipelineTriggerRecord,
  PipelinesChart,
  TriggeredPipeline,
} from "./types";
import { getQueryString } from "../../helper";

export async function listPipelineTriggerRecordsQuery({
  axiosInstance,
  pageSize,
  nextPageToken,
  filter,
}: {
  axiosInstance: AxiosInstance;
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
  filter: Nullable<string>;
}) {
  try {
    const triggers: PipelineTriggerRecord[] = [];

    const queryString = getQueryString({
      baseURL: `/metrics/vdp/pipeline/triggers`,
      pageSize,
      nextPageToken,
      filter,
    });

    const { data } =
      await axiosInstance.get<ListPipelineTriggerRecordsResponse>(queryString);

    triggers.push(...data.pipeline_trigger_records);

    if (data.next_page_token) {
      triggers.push(
        ...(await listPipelineTriggerRecordsQuery({
          axiosInstance,
          pageSize,
          nextPageToken: data.next_page_token,
          filter,
        }))
      );
    }

    return Promise.resolve(triggers);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function listTriggeredPipelineQuery({
  axiosInstance,
  pageSize,
  nextPageToken,
  filter,
}: {
  axiosInstance: AxiosInstance;
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
  filter: Nullable<string>;
}) {
  try {
    const pipelines: TriggeredPipeline[] = [];

    const queryString = getQueryString({
      baseURL: `/metrics/vdp/pipeline/tables`,
      pageSize,
      nextPageToken,
      filter,
    });

    const { data } = await axiosInstance.get<ListTriggeredPipelinesResponse>(
      queryString
    );

    pipelines.push(...data.pipeline_trigger_table_records);

    if (data.next_page_token) {
      pipelines.push(
        ...(await listTriggeredPipelineQuery({
          axiosInstance,
          pageSize,
          nextPageToken: data.next_page_token,
          filter,
        }))
      );
    }

    return Promise.resolve(pipelines);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function listTriggeredPipelineChartQuery({
  axiosInstance,
  pageSize,
  nextPageToken,
  filter,
}: {
  axiosInstance: AxiosInstance;
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
  filter: Nullable<string>;
}) {
  try {
    const pipelinesChart: PipelinesChart[] = [];

    const queryString = getQueryString({
      baseURL: `/metrics/vdp/pipeline/charts`,
      pageSize,
      nextPageToken,
      filter,
    });

    const { data } = await axiosInstance.get<ListPipelinesChartResponse>(
      queryString
    );
    pipelinesChart.push(...data.pipeline_trigger_chart_records);

    return Promise.resolve(pipelinesChart);
  } catch (err) {
    return Promise.reject(err);
  }
}
