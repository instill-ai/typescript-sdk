import { AxiosInstance } from "axios";
import { DeployUserModelResponse, UndeployUserModelResponse } from "./types";

export async function deployUserModelAction({
  axiosInstance,
  modelName,
}: {
  axiosInstance: AxiosInstance;
  modelName: string;
}) {
  try {
    const { data } = await axiosInstance.post<DeployUserModelResponse>(
      `/${modelName}/deploy`
    );
    return Promise.resolve(data.model_id);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function undeployUserModelAction({
  axiosInstance,
  modelName,
}: {
  axiosInstance: AxiosInstance;
  modelName: string;
}) {
  try {
    const { data } = await axiosInstance.post<UndeployUserModelResponse>(
      `/${modelName}/undeploy`
    );
    return Promise.resolve(data.model_id);
  } catch (err) {
    return Promise.reject(err);
  }
}
