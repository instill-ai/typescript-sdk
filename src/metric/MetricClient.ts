import axios, { AxiosInstance } from "axios";
import { Nullable } from "../types";
import {
  listPipelineTriggerRecordsQuery,
  listTriggeredPipelineChartQuery,
  listTriggeredPipelineQuery,
} from "./pipeline/queries";

class MetricClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string, appVersion: string, apiToken: string) {
    let URL: Nullable<string> = `${baseUrl}/core/${appVersion}`;

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
    return listPipelineTriggerRecordsQuery({
      axiosInstance: this.axiosInstance,
      pageSize,
      nextPageToken,
      filter,
    });
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
    return listTriggeredPipelineQuery({
      axiosInstance: this.axiosInstance,
      pageSize,
      nextPageToken,
      filter,
    });
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
    return listTriggeredPipelineChartQuery({
      axiosInstance: this.axiosInstance,
      pageSize,
      nextPageToken,
      filter,
    });
  }
}

export default MetricClient;
