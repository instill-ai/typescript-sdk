import { AxiosInstance } from "axios";
import { getQueryString } from "../helper";
import { Nullable } from "../types";
import {
  ConnectorDefinition,
  ConnectorWatchState,
  ConnectorWithDefinition,
  GetConnectorDefinitionResponse,
  GetUserConnectorResponse,
  ListConnectorDefinitionsResponse,
  ListConnectorsResponse,
} from "./types";

export async function listConnectorsQuery({
  axiosInstance,
  pageSize,
  nextPageToken,
  filter,
}: {
  axiosInstance: AxiosInstance;
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;

  filter: Nullable<string>;
}) {
  try {
    const connectors: ConnectorWithDefinition[] = [];

    const queryString = getQueryString({
      baseURL: `/connector-resources?view=VIEW_FULL`,
      pageSize,
      nextPageToken,
      filter,
    });

    const { data } = await axiosInstance.get<ListConnectorsResponse>(
      queryString
    );

    connectors.push(...data.connectors);

    if (data.next_page_token) {
      connectors.push(
        ...(await listConnectorsQuery({
          axiosInstance,
          pageSize,
          nextPageToken: data.next_page_token,
          filter,
        }))
      );
    }

    return Promise.resolve(connectors);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function listUserConnectorsQuery({
  axiosInstance,
  userName,
  pageSize,
  nextPageToken,

  filter,
}: {
  axiosInstance: AxiosInstance;
  userName: string;
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;

  filter: Nullable<string>;
}) {
  try {
    const connectors: ConnectorWithDefinition[] = [];

    const queryString = getQueryString({
      baseURL: `${userName}/connector-resources?view=VIEW_FULL`,
      pageSize,
      nextPageToken,
      filter,
    });

    const { data } = await axiosInstance.get<ListConnectorsResponse>(
      queryString
    );

    connectors.push(...data.connectors);

    if (data.next_page_token) {
      connectors.push(
        ...(await listUserConnectorsQuery({
          axiosInstance,
          userName,
          pageSize,
          nextPageToken: data.next_page_token,
          filter,
        }))
      );
    }

    return Promise.resolve(connectors);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function listConnectorDefinitionsQuery({
  axiosInstance,
  pageSize,
  nextPageToken,
  filter,
}: {
  axiosInstance: AxiosInstance;
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;

  filter: Nullable<string>;
}) {
  try {
    const connectorDefinitions: ConnectorDefinition[] = [];

    const queryString = getQueryString({
      baseURL: `/connector-definitions?view=VIEW_FULL`,
      pageSize,
      nextPageToken,
      filter,
    });

    const { data } = await axiosInstance.get<ListConnectorDefinitionsResponse>(
      queryString
    );

    connectorDefinitions.push(...data.connector_definitions);

    if (data.next_page_token) {
      connectorDefinitions.push(
        ...(await listConnectorDefinitionsQuery({
          axiosInstance,
          pageSize,
          nextPageToken: data.next_page_token,
          filter,
        }))
      );
    }

    return Promise.resolve(connectorDefinitions);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function getConnectorDefinitionQuery({
  axiosInstance,
  connectorDefinitionName,
}: {
  axiosInstance: AxiosInstance;
  connectorDefinitionName: string;
}) {
  try {
    const { data } = await axiosInstance.get<GetConnectorDefinitionResponse>(
      `/${connectorDefinitionName}?view=VIEW_FULL`
    );

    return Promise.resolve(data.connector_definition);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function getUserConnectorQuery({
  axiosInstance,
  connectorName,
}: {
  axiosInstance: AxiosInstance;
  connectorName: string;
}) {
  try {
    const { data } = await axiosInstance.get<GetUserConnectorResponse>(
      `/${connectorName}?view=VIEW_FULL`
    );

    return Promise.resolve(data.connector);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function watchUserConnector({
  axiosInstance,
  connectorName,
}: {
  axiosInstance: AxiosInstance;
  connectorName: string;
}) {
  try {
    const { data } = await axiosInstance.get<ConnectorWatchState>(
      `/${connectorName}/watch`
    );
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}
