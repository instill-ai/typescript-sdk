import { AxiosInstance } from "axios";
import {
  CreateUserConnectorResourcePayload,
  CreateUserConnectorResourceResponse,
  RenameUserConnectorResourcePayload,
  RenameUserConnectorResourceResponse,
  UpdateUserConnectorResourcePayload,
  UpdateUserConnectorResourceResponse,
} from "./types";

export async function createUserConnectorResourceMutation({
  axiosInstance,
  userName,
  payload,
}: {
  axiosInstance: AxiosInstance;
  userName: string;
  payload: CreateUserConnectorResourcePayload;
}) {
  try {
    const res = await axiosInstance.post<CreateUserConnectorResourceResponse>(
      `${userName}/connector-resources`,
      payload
    );
    return Promise.resolve(res.data.connector_resource);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function deleteUserConnectorResourceMutation({
  axiosInstance,
  connectorResourceName,
}: {
  axiosInstance: AxiosInstance;
  connectorResourceName: string;
}) {
  try {
    await axiosInstance.delete(`/${connectorResourceName}`);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function updateUserConnectorResourceMutation({
  axiosInstance,
  payload,
}: {
  axiosInstance: AxiosInstance;
  payload: UpdateUserConnectorResourcePayload;
}) {
  try {
    const res = await axiosInstance.patch<UpdateUserConnectorResourceResponse>(
      `/${payload.connectorResourceName}`,
      {
        ...payload,
        connectorResourceName: undefined,
      }
    );
    return Promise.resolve(res.data.connector_resource);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function renameUserConnectorResource({
  axiosInstance,
  payload,
}: {
  axiosInstance: AxiosInstance;
  payload: RenameUserConnectorResourcePayload;
}) {
  try {
    const { data } =
      await axiosInstance.post<RenameUserConnectorResourceResponse>(
        `/${payload.name}/rename`,
        payload
      );

    return Promise.resolve(data.connector_resource);
  } catch (err) {
    return Promise.reject(err);
  }
}
