import { AxiosInstance } from "axios";
import { ConnectorState, ConnectorWithDefinition } from "./types";

export type TestUserConnectorConnectionResponse = {
  state: ConnectorState;
};

export async function testUserConnectorConnectionAction({
  axiosInstance,
  connectorName,
}: {
  axiosInstance: AxiosInstance;
  connectorName: string;
}) {
  try {
    const { data } =
      await axiosInstance.post<TestUserConnectorConnectionResponse>(
        `/${connectorName}/testConnection`
      );
    return Promise.resolve(data.state);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type ConnectUserConnectorResponse = {
  connector: ConnectorWithDefinition;
};

export async function connectUserConnectorAction({
  axiosInstance,
  connectorName,
}: {
  axiosInstance: AxiosInstance;
  connectorName: string;
}) {
  try {
    const { data } = await axiosInstance.post<ConnectUserConnectorResponse>(
      `/${connectorName}/connect`
    );
    return Promise.resolve(data.connector);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type DisconnectUserConnectorResponse = {
  connector: ConnectorWithDefinition;
};

export async function disconnectUserConnectorAction({
  axiosInstance,
  connectorName,
}: {
  axiosInstance: AxiosInstance;
  connectorName: string;
}) {
  try {
    const { data } = await axiosInstance.post<DisconnectUserConnectorResponse>(
      `/${connectorName}/disconnect`
    );
    return Promise.resolve(data.connector);
  } catch (err) {
    return Promise.reject(err);
  }
}
