import axios, { AxiosInstance } from "axios";
import { Nullable } from "../types";
import {
  ListPipelineTriggerRecordsResponse,
  ListPipelinesChartResponse,
  ListTriggeredPipelinesResponse,
  PipelineTriggerRecord,
  PipelinesChart,
  TriggeredPipeline,
} from "./pipeline";
import { getQueryString } from "../helper";

class MetricClient {
  private axiosInstance: AxiosInstance;

  constructor(
    baseUrl: string,
    appVersion: string,
    apiToken: string
  ) {
    let URL: Nullable<string> = `${baseUrl}/base/${appVersion}`;

    this.axiosInstance = axios.create({
      baseURL: URL,
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
  }

  /* -------------------------------------------------------------------------
   * Metric Queries
   * -----------------------------------------------------------------------*/

  async listPipelineTriggerRecordsQuery({
    pageSize,
    nextPageToken,
    
    filter,
  }: {
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
        await this.axiosInstance.get<ListPipelineTriggerRecordsResponse>(
          queryString
        );

      triggers.push(...data.pipeline_trigger_records);

      if (data.next_page_token) {
        triggers.push(
          ...(await this.listPipelineTriggerRecordsQuery({
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

  async listTriggeredPipelineQuery({
    pageSize,
    nextPageToken,
    
    filter,
  }: {
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

      const { data } =
        await this.axiosInstance.get<ListTriggeredPipelinesResponse>(
          queryString
        );

      pipelines.push(...data.pipeline_trigger_table_records);

      if (data.next_page_token) {
        pipelines.push(
          ...(await this.listTriggeredPipelineQuery({
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

  async listTriggeredPipelineChartQuery({
    pageSize,
    nextPageToken,
    
    filter,
  }: {
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

      const { data } = await this.axiosInstance.get<ListPipelinesChartResponse>(
        queryString
      );
      pipelinesChart.push(...data.pipeline_trigger_chart_records);

      return Promise.resolve(pipelinesChart);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default MetricClient;
