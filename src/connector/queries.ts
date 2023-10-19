import { AxiosInstance } from "axios";
import { getQueryString } from "../helper";
import { Nullable } from "../types";
import {
  ConnectorDefinition,
  ConnectorResourceWatchState,
  ConnectorResourceWithDefinition,
  GetConnectorDefinitionResponse,
  GetUserConnectorResourceResponse,
  ListConnectorDefinitionsResponse,
  ListConnectorResourcesResponse,
} from "./types";

export async function listConnectorResourcesQuery({
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
    const connectors: ConnectorResourceWithDefinition[] = [];

    const queryString = getQueryString({
      baseURL: `/connector-resources?view=VIEW_FULL`,
      pageSize,
      nextPageToken,
      filter,
    });

    const { data } = await axiosInstance.get<ListConnectorResourcesResponse>(
      queryString
    );

    connectors.push(...data.connector_resources);

    if (data.next_page_token) {
      connectors.push(
        ...(await listConnectorResourcesQuery({
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

export async function listUserConnectorResourcesQuery({
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
    const connectors: ConnectorResourceWithDefinition[] = [];

    const queryString = getQueryString({
      baseURL: `${userName}/connector-resources?view=VIEW_FULL`,
      pageSize,
      nextPageToken,
      filter,
    });

    const { data } = await axiosInstance.get<ListConnectorResourcesResponse>(
      queryString
    );

    connectors.push(...data.connector_resources);

    if (data.next_page_token) {
      connectors.push(
        ...(await listUserConnectorResourcesQuery({
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

export async function getUserConnectorResourceQuery({
  axiosInstance,
  connectorResourceName,
}: {
  axiosInstance: AxiosInstance;
  connectorResourceName: string;
}) {
  try {
    const { data } = await axiosInstance.get<GetUserConnectorResourceResponse>(
      `/${connectorResourceName}?view=VIEW_FULL`
    );

    return Promise.resolve(data.connector_resource);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function watchUserConnectorResource({
  axiosInstance,
  connectorResourceName,
}: {
  axiosInstance: AxiosInstance;
  connectorResourceName: string;
}) {
  try {
    const { data } = await axiosInstance.get<ConnectorResourceWatchState>(
      `/${connectorResourceName}/watch`
    );
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}
