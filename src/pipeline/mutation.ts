import { AxiosInstance } from "axios";
import {
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

export async function createUserPipelineMutation({
  axiosInstance,
  userName,
  payload,
}: {
  axiosInstance: AxiosInstance;
  userName: string;
  payload: CreateUserPipelinePayload;
}) {
  try {
    const { data } = await axiosInstance.post<CreatePipelineResponse>(
      `${userName}/pipelines`,
      payload
    );
    return Promise.resolve(data.pipeline);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function updateUserPipelineMutation({
  axiosInstance,
  payload,
}: {
  axiosInstance: AxiosInstance;
  payload: UpdateUserPipelinePayload;
}) {
  try {
    const { data } = await axiosInstance.patch<UpdateUserPipelineResponse>(
      `/${payload.name}`,
      payload
    );
    return Promise.resolve(data.pipeline);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function deleteUserPipelineMutation({
  axiosInstance,
  pipelineName,
}: {
  axiosInstance: AxiosInstance;
  pipelineName: string;
}) {
  try {
    await axiosInstance.delete(`/${pipelineName}`);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function renameUserPipelineMutation({
  axiosInstance,
  payload,
}: {
  axiosInstance: AxiosInstance;
  payload: RenameUserPipelinePayload;
}) {
  try {
    const { data } = await axiosInstance.post<RenameUserPipelineResponse>(
      `/${payload.name}/rename`,
      payload
    );

    return Promise.resolve(data.pipeline);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function createUserPipelineReleaseMutation({
  axiosInstance,
  pipelineName,
  payload,
}: {
  axiosInstance: AxiosInstance;
  pipelineName: string;
  payload: CreateUserPipelineReleasePayload;
}) {
  try {
    const { data } =
      await axiosInstance.post<CreateUserPipelineReleaseResponse>(
        `${pipelineName}/releases`,
        payload
      );

    return Promise.resolve(data.release);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function updateUserPipelineReleaseMutation({
  axiosInstance,
  payload,
  pipelineReleaseName,
}: {
  axiosInstance: AxiosInstance;
  payload: UpdateUserPipelineReleasePayload;
  pipelineReleaseName: string;
}) {
  try {
    const { data } =
      await axiosInstance.patch<UpdateUserPipelineReleaseResponse>(
        `/${pipelineReleaseName}`,
        payload
      );
    return Promise.resolve(data.release);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function deleteUserPipelineReleaseMutation({
  axiosInstance,
  pipelineReleaseName,
}: {
  axiosInstance: AxiosInstance;
  pipelineReleaseName: string;
}) {
  try {
    await axiosInstance.delete(`/${pipelineReleaseName}`);
  } catch (err) {
    return Promise.reject(err);
  }
}
