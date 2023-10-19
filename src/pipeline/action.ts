import { AxiosInstance } from "axios";
import {
  RestoreUserPipelineReleaseResponse,
  SetDefaultUserPipelineReleaseResponse,
  TriggerAsyncUserPipelinePayload,
  TriggerAsyncUserPipelineReleaseResponse,
  TriggerAsyncUserPipelineResponse,
  TriggerUserPipelinePayload,
  TriggerUserPipelineResponse,
} from "./types";

export async function triggerUserPipelineAction({
  axiosInstance,
  pipelineName,
  payload,
  returnTraces,
}: {
  axiosInstance: AxiosInstance;
  pipelineName: string;
  payload: TriggerUserPipelinePayload;
  returnTraces?: boolean;
}) {
  try {
    const { data } = await axiosInstance.post<TriggerUserPipelineResponse>(
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

export async function triggerAsyncUserPipelineAction({
  axiosInstance,
  pipelineName,
  payload,
  returnTraces,
}: {
  axiosInstance: AxiosInstance;
  pipelineName: string;
  payload: TriggerAsyncUserPipelinePayload;
  returnTraces?: boolean;
}) {
  try {
    const { data } = await axiosInstance.post<TriggerAsyncUserPipelineResponse>(
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

export async function setDefaultUserPipelineReleaseMutation({
  axiosInstance,
  pipelineReleaseName,
}: {
  axiosInstance: AxiosInstance;
  pipelineReleaseName: string;
}) {
  try {
    const { data } =
      await axiosInstance.post<SetDefaultUserPipelineReleaseResponse>(
        `/${pipelineReleaseName}/setDefault`
      );
    return Promise.resolve(data.release);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function restoreUserPipelineReleaseMutation({
  axiosInstance,
  pipelineReleaseName,
}: {
  axiosInstance: AxiosInstance;
  pipelineReleaseName: string;
}) {
  try {
    const { data } =
      await axiosInstance.post<RestoreUserPipelineReleaseResponse>(
        `/${pipelineReleaseName}/restore`
      );
    return Promise.resolve(data.release);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function triggerUserPipelineReleaseAction({
  axiosInstance,
  pipelineReleaseName,
  payload,
  returnTraces,
}: {
  axiosInstance: AxiosInstance;
  pipelineReleaseName: string;
  payload: TriggerUserPipelinePayload;
  returnTraces?: boolean;
}) {
  try {
    const { data } = await axiosInstance.post<TriggerUserPipelineResponse>(
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

export async function triggerAsyncUserPipelineReleaseAction({
  axiosInstance,
  pipelineReleaseName,
  payload,
  returnTraces,
}: {
  axiosInstance: AxiosInstance;
  pipelineReleaseName: string;
  payload: TriggerAsyncUserPipelinePayload;
  returnTraces?: boolean;
}) {
  try {
    const { data } =
      await axiosInstance.post<TriggerAsyncUserPipelineReleaseResponse>(
        `/${pipelineReleaseName}/triggerAsync`,
        payload,
        {
          headers: {
            "instill-return-traces": returnTraces ? "true" : "false",
            "Access-Control-Allow-Headers": "instill-return-traces",
            "Content-Type": "application.json",
          },
        }
      );
    return Promise.resolve(data.operation);
  } catch (err) {
    return Promise.reject(err);
  }
}
