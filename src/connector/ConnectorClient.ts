import axios, { AxiosInstance } from "axios";
import { Nullable } from "../types";
import {
  ConnectorDefinition,
  ConnectorResourceWatchState,
  ConnectorResourceWithDefinition,
  CreateUserConnectorResourcePayload,
  CreateUserConnectorResourceResponse,
  RenameUserConnectorResourcePayload,
  RenameUserConnectorResourceResponse,
  UpdateUserConnectorResourcePayload,
  UpdateUserConnectorResourceResponse,
  GetConnectorDefinitionResponse,
  GetUserConnectorResourceResponse,
  ListConnectorDefinitionsResponse,
  ListConnectorResourcesResponse,
  ConnectUserConnectorResourceResponse,
  DisconnectUserConnectorResourceResponse,
  TestUserConnectorResourceConnectionResponse,
} from "./types";
import { getQueryString } from "../helper";

class ConnectorClient {
  private axiosInstance: AxiosInstance;

  constructor(
    baseUrl: string,
    appVersion: string,
    apiToken: string
  ) {
    let URL: Nullable<string> = `${baseUrl}/vdp/${appVersion}`;

    this.axiosInstance = axios.create({
      baseURL: URL,
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
  }

  /* -------------------------------------------------------------------------
   * Connector Queries
   * -----------------------------------------------------------------------*/

  async listConnectorResourcesQuery({
    pageSize,
    nextPageToken,

    filter,
  }: {
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

      const { data } =
        await this.axiosInstance.get<ListConnectorResourcesResponse>(
          queryString
        );

      connectors.push(...data.connector_resources);

      if (data.next_page_token) {
        connectors.push(
          ...(await this.listConnectorResourcesQuery({
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

  async listUserConnectorResourcesQuery({
    userName,
    pageSize,
    nextPageToken,

    filter,
  }: {
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

      const { data } =
        await this.axiosInstance.get<ListConnectorResourcesResponse>(
          queryString
        );

      connectors.push(...data.connector_resources);

      if (data.next_page_token) {
        connectors.push(
          ...(await this.listUserConnectorResourcesQuery({
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

  async listConnectorDefinitionsQuery({
    pageSize,
    nextPageToken,

    filter,
  }: {
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

      const { data } =
        await this.axiosInstance.get<ListConnectorDefinitionsResponse>(
          queryString
        );

      connectorDefinitions.push(...data.connector_definitions);

      if (data.next_page_token) {
        connectorDefinitions.push(
          ...(await this.listConnectorDefinitionsQuery({
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

  async getConnectorDefinitionQuery({
    connectorDefinitionName,
  }: {
    connectorDefinitionName: string;
  }) {
    try {
      const { data } =
        await this.axiosInstance.get<GetConnectorDefinitionResponse>(
          `/${connectorDefinitionName}?view=VIEW_FULL`
        );

      return Promise.resolve(data.connector_definition);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async getUserConnectorResourceQuery({
    connectorResourceName,
  }: {
    connectorResourceName: string;
  }) {
    try {
      const { data } =
        await this.axiosInstance.get<GetUserConnectorResourceResponse>(
          `/${connectorResourceName}?view=VIEW_FULL`
        );

      return Promise.resolve(data.connector_resource);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async watchUserConnectorResource({
    connectorResourceName,
  }: {
    connectorResourceName: string;
  }) {
    try {
      const { data } =
        await this.axiosInstance.get<ConnectorResourceWatchState>(
          `/${connectorResourceName}/watch`
        );
      return Promise.resolve(data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /* -------------------------------------------------------------------------
   * Connector Mutation
   * -----------------------------------------------------------------------*/

  async createUserConnectorResourceMutation({
    userName,
    payload,
  }: {
    userName: string;
    payload: CreateUserConnectorResourcePayload;
  }) {
    try {
      const res =
        await this.axiosInstance.post<CreateUserConnectorResourceResponse>(
          `${userName}/connector-resources`,
          payload
        );
      return Promise.resolve(res.data.connector_resource);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async deleteUserConnectorResourceMutation({
    connectorResourceName,
  }: {
    connectorResourceName: string;
  }) {
    try {
      await this.axiosInstance.delete(`/${connectorResourceName}`);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async updateUserConnectorResourceMutation({
    payload,
  }: {
    payload: UpdateUserConnectorResourcePayload;
  }) {
    try {
      const res =
        await this.axiosInstance.patch<UpdateUserConnectorResourceResponse>(
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

  async renameUserConnectorResource({
    payload,
  }: {
    payload: RenameUserConnectorResourcePayload;
  }) {
    try {
      const { data } =
        await this.axiosInstance.post<RenameUserConnectorResourceResponse>(
          `/${payload.name}/rename`,
          payload
        );

      return Promise.resolve(data.connector_resource);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /* -------------------------------------------------------------------------
   * Connector Action
   * -----------------------------------------------------------------------*/

  async testUserConnectorResourceConnectionAction({
    connectorResourceName,
  }: {
    connectorResourceName: string;
  }) {
    try {
      const { data } =
        await this.axiosInstance.post<TestUserConnectorResourceConnectionResponse>(
          `/${connectorResourceName}/testConnection`
        );
      return Promise.resolve(data.state);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async connectUserConnectorResourceAction({
    connectorResourceName,
  }: {
    connectorResourceName: string;
  }) {
    try {
      const { data } =
        await this.axiosInstance.post<ConnectUserConnectorResourceResponse>(
          `/${connectorResourceName}/connect`
        );
      return Promise.resolve(data.connector_resource);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async disconnectUserConnectorResourceAction({
    connectorResourceName,
  }: {
    connectorResourceName: string;
  }) {
    try {
      const { data } =
        await this.axiosInstance.post<DisconnectUserConnectorResourceResponse>(
          `/${connectorResourceName}/disconnect`
        );
      return Promise.resolve(data.connector_resource);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default ConnectorClient;
