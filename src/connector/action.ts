import { AxiosInstance } from "axios";
import {
  ConnectUserConnectorResourceResponse,
  DisconnectUserConnectorResourceResponse,
  TestUserConnectorResourceConnectionResponse,
} from "./types";

export async function testUserConnectorResourceConnectionAction({
  axiosInstance,
  connectorResourceName,
}: {
  axiosInstance: AxiosInstance;
  connectorResourceName: string;
}) {
  try {
    const { data } =
      await axiosInstance.post<TestUserConnectorResourceConnectionResponse>(
        `/${connectorResourceName}/testConnection`
      );
    return Promise.resolve(data.state);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function connectUserConnectorResourceAction({
  axiosInstance,
  connectorResourceName,
}: {
  axiosInstance: AxiosInstance;
  connectorResourceName: string;
}) {
  try {
    const { data } =
      await axiosInstance.post<ConnectUserConnectorResourceResponse>(
        `/${connectorResourceName}/connect`
      );
    return Promise.resolve(data.connector_resource);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function disconnectUserConnectorResourceAction({
  axiosInstance,
  connectorResourceName,
}: {
  axiosInstance: AxiosInstance;
  connectorResourceName: string;
}) {
  try {
    const { data } =
      await axiosInstance.post<DisconnectUserConnectorResourceResponse>(
        `/${connectorResourceName}/disconnect`
      );
    return Promise.resolve(data.connector_resource);
  } catch (err) {
    return Promise.reject(err);
  }
}
