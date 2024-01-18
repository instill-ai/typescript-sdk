import { AxiosInstance } from "axios";
import {
  CreateUserConnectorPayload,
  CreateUserConnectorResponse,
  RenameUserConnectorPayload,
  RenameUserConnectorResponse,
  UpdateUserConnectorPayload,
  UpdateUserConnectorResponse,
} from "./types";

export async function createUserConnectorMutation({
  entityName,
  payload,
  axiosInstance,
}: {
  entityName: string;
  payload: CreateUserConnectorPayload;
  axiosInstance: AxiosInstance;
}) {
  try {
    const res = await axiosInstance.post<CreateUserConnectorResponse>(
      `${entityName}/connectors`,
      payload
    );
    return Promise.resolve(res.data.connector);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function deleteUserConnectorMutation({
  connectorName,
  axiosInstance,
}: {
  connectorName: string;
  axiosInstance: AxiosInstance;
}) {
  try {
    await axiosInstance.delete(`/${connectorName}`);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function updateUserConnectorMutation({
  payload,
  axiosInstance,
}: {
  payload: UpdateUserConnectorPayload;
  axiosInstance: AxiosInstance;
}) {
  try {
    const res = await axiosInstance.patch<UpdateUserConnectorResponse>(
      `/${payload.connectorName}`,
      {
        ...payload,
        // connector name don't need to be sent to the server
        connectorName: undefined,
      }
    );
    return Promise.resolve(res.data.connector);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function renameUserConnector({
  payload,
  axiosInstance,
}: {
  payload: RenameUserConnectorPayload;
  axiosInstance: AxiosInstance;
}) {
  try {
    const { data } = await axiosInstance.post<RenameUserConnectorResponse>(
      `/${payload.connectorName}/rename`,
      {
        ...payload,
        // connector name don't need to be sent to the server
        connectorName: undefined,
      }
    );

    return Promise.resolve(data.connector);
  } catch (err) {
    return Promise.reject(err);
  }
}
