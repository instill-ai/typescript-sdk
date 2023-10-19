import axios, { AxiosInstance } from "axios";
import { Nullable } from "../types";
import {
  CreateUserConnectorResourcePayload,
  RenameUserConnectorResourcePayload,
  UpdateUserConnectorResourcePayload,
} from "./types";
import { getQueryString } from "../helper";
import {
  getConnectorDefinitionQuery,
  getUserConnectorResourceQuery,
  listConnectorDefinitionsQuery,
  listConnectorResourcesQuery,
  listUserConnectorResourcesQuery,
  watchUserConnectorResource,
} from "./queries";
import {
  createUserConnectorResourceMutation,
  deleteUserConnectorResourceMutation,
  renameUserConnectorResource,
  updateUserConnectorResourceMutation,
} from "./mutation";
import {
  connectUserConnectorResourceAction,
  disconnectUserConnectorResourceAction,
  testUserConnectorResourceConnectionAction,
} from "./action";

class ConnectorClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string, appVersion: string, apiToken: string) {
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
    return listConnectorResourcesQuery({
      axiosInstance: this.axiosInstance,
      pageSize,
      nextPageToken,
      filter,
    });
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
    return listUserConnectorResourcesQuery({
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

  async getUserConnectorResourceQuery({
    connectorResourceName,
  }: {
    connectorResourceName: string;
  }) {
    return getUserConnectorResourceQuery({
      axiosInstance: this.axiosInstance,
      connectorResourceName,
    });
  }

  async watchUserConnectorResource({
    connectorResourceName,
  }: {
    connectorResourceName: string;
  }) {
    return watchUserConnectorResource({
      axiosInstance: this.axiosInstance,
      connectorResourceName,
    });
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
    return createUserConnectorResourceMutation({
      axiosInstance: this.axiosInstance,
      userName,
      payload,
    });
  }

  async deleteUserConnectorResourceMutation({
    connectorResourceName,
  }: {
    connectorResourceName: string;
  }) {
    return deleteUserConnectorResourceMutation({
      axiosInstance: this.axiosInstance,
      connectorResourceName,
    });
  }

  async updateUserConnectorResourceMutation({
    payload,
  }: {
    payload: UpdateUserConnectorResourcePayload;
  }) {
    return updateUserConnectorResourceMutation({
      axiosInstance: this.axiosInstance,
      payload,
    });
  }

  async renameUserConnectorResource({
    payload,
  }: {
    payload: RenameUserConnectorResourcePayload;
  }) {
    return renameUserConnectorResource({
      axiosInstance: this.axiosInstance,
      payload,
    });
  }

  /* -------------------------------------------------------------------------
   * Connector Action
   * -----------------------------------------------------------------------*/

  async testUserConnectorResourceConnectionAction({
    connectorResourceName,
  }: {
    connectorResourceName: string;
  }) {
    return testUserConnectorResourceConnectionAction({
      axiosInstance: this.axiosInstance,
      connectorResourceName,
    });
  }

  async connectUserConnectorResourceAction({
    connectorResourceName,
  }: {
    connectorResourceName: string;
  }) {
    return connectUserConnectorResourceAction({
      axiosInstance: this.axiosInstance,
      connectorResourceName,
    });
  }

  async disconnectUserConnectorResourceAction({
    connectorResourceName,
  }: {
    connectorResourceName: string;
  }) {
    return disconnectUserConnectorResourceAction({
      axiosInstance: this.axiosInstance,
      connectorResourceName,
    });
  }
}

export default ConnectorClient;
