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
  pipelineName,
  payload,
  axiosInstance,
  returnTraces,
  shareCode,
}: {
  pipelineName: string;
  payload: TriggerUserPipelinePayload;
  axiosInstance: AxiosInstance;
  returnTraces?: boolean;
  shareCode?: string;
}) {
  try {
    const { data } = await axiosInstance.post<TriggerUserPipelineResponse>(
      `/${pipelineName}/trigger`,
      payload,
      {
        headers: {
          "instill-return-traces": returnTraces ? "true" : "false",
          "instill-share-code": shareCode,
          "Access-Control-Allow-Headers":
            "instill-return-traces, instill-share-code",
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
  pipelineName,
  payload,
  axiosInstance,
  returnTraces,
}: {
  pipelineName: string;
  payload: TriggerAsyncUserPipelinePayload;
  axiosInstance: AxiosInstance;
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

/* -------------------------------------------------------------------------
 * Pipeline Release
 * -----------------------------------------------------------------------*/

export async function setDefaultUserPipelineReleaseMutation({
  pipelineReleaseName,
  axiosInstance,
}: {
  pipelineReleaseName: string;
  axiosInstance: AxiosInstance;
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
  pipelineReleaseName,
  axiosInstance,
}: {
  pipelineReleaseName: string;
  axiosInstance: AxiosInstance;
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
  pipelineReleaseName,
  payload,
  axiosInstance,
  returnTraces,
}: {
  pipelineReleaseName: string;
  payload: TriggerUserPipelinePayload;
  axiosInstance: AxiosInstance;
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
  pipelineReleaseName,
  payload,
  axiosInstance,
  returnTraces,
}: {
  pipelineReleaseName: string;
  payload: TriggerAsyncUserPipelinePayload;
  axiosInstance: AxiosInstance;
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
            "Content-Type": "application/json",
          },
        }
      );
    return Promise.resolve(data.operation);
  } catch (err) {
    return Promise.reject(err);
  }
}
