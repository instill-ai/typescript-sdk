import axios, { AxiosInstance } from "axios";
import { Nullable } from "../types";
import {
  getConnectorDefinitionQuery,
  getUserConnectorQuery,
  listConnectorDefinitionsQuery,
  listConnectorsQuery,
  listUserConnectorsQuery,
  watchUserConnector,
} from "./queries";
import {
  createUserConnectorMutation,
  deleteUserConnectorMutation,
  renameUserConnector,
  updateUserConnectorMutation,
} from "./mutation";
import {
  testUserConnectorConnectionAction,
  connectUserConnectorAction,
  disconnectUserConnectorAction,
} from "./action";
import {
  CreateUserConnectorPayload,
  RenameUserConnectorPayload,
  UpdateUserConnectorPayload,
} from "./types";

class ConnectorClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string, appVersion: string, apiToken: string) {
    const URL: Nullable<string> = `${baseUrl}/vdp/${appVersion}`;

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

  async listConnectorsQuery({
    pageSize,
    nextPageToken,
    filter,
  }: {
    pageSize: Nullable<number>;
    nextPageToken: Nullable<string>;
    filter: Nullable<string>;
  }) {
    return listConnectorsQuery({
      axiosInstance: this.axiosInstance,
      pageSize,
      nextPageToken,
      filter,
    });
  }

  async listUserConnectorsQuery({
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
    return listUserConnectorsQuery({
      axiosInstance: this.axiosInstance,
      userName,
      pageSize,
      nextPageToken,
      filter,
    });
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
    return listConnectorDefinitionsQuery({
      axiosInstance: this.axiosInstance,
      pageSize,
      nextPageToken,
      filter,
    });
  }

  async getConnectorDefinitionQuery({
    connectorDefinitionName,
  }: {
    connectorDefinitionName: string;
  }) {
    return getConnectorDefinitionQuery({
      axiosInstance: this.axiosInstance,
      connectorDefinitionName,
    });
  }

  async getUserConnectorQuery({ connectorName }: { connectorName: string }) {
    return getUserConnectorQuery({
      axiosInstance: this.axiosInstance,
      connectorName,
    });
  }

  async watchUserConnector({ connectorName }: { connectorName: string }) {
    return watchUserConnector({
      axiosInstance: this.axiosInstance,
      connectorName,
    });
  }

  /* -------------------------------------------------------------------------
   * Connector Mutation
   * -----------------------------------------------------------------------*/

  async createUserConnectorMutation({
    entityName,
    payload,
  }: {
    entityName: string;
    payload: CreateUserConnectorPayload;
  }) {
    return createUserConnectorMutation({
      axiosInstance: this.axiosInstance,
      entityName,
      payload,
    });
  }

  async deleteUserConnectorMutation({
    connectorName,
  }: {
    connectorName: string;
  }) {
    return deleteUserConnectorMutation({
      axiosInstance: this.axiosInstance,
      connectorName,
    });
  }

  async updateUserConnectorMutation({
    payload,
  }: {
    payload: UpdateUserConnectorPayload;
  }) {
    return updateUserConnectorMutation({
      axiosInstance: this.axiosInstance,
      payload,
    });
  }

  async renameUserConnector({
    payload,
  }: {
    payload: RenameUserConnectorPayload;
  }) {
    return renameUserConnector({
      axiosInstance: this.axiosInstance,
      payload,
    });
  }

  /* -------------------------------------------------------------------------
   * Connector Action
   * -----------------------------------------------------------------------*/

  async testUserConnectorConnectionAction({
    connectorName,
  }: {
    connectorName: string;
  }) {
    return testUserConnectorConnectionAction({
      axiosInstance: this.axiosInstance,
      connectorName,
    });
  }

  async connectUserConnectorAction({
    connectorName,
  }: {
    connectorName: string;
  }) {
    return connectUserConnectorAction({
      axiosInstance: this.axiosInstance,
      connectorName,
    });
  }

  async disconnectUserConnectorAction({
    connectorName,
  }: {
    connectorName: string;
  }) {
    return disconnectUserConnectorAction({
      axiosInstance: this.axiosInstance,
      connectorName,
    });
  }
}

export default ConnectorClient;
