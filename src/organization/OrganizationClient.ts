import axios, { AxiosInstance } from "axios";
import { Nullable } from "vitest";
import {
  getOrganizationMembershipQuery,
  getOrganizationQuery,
  getUserMembershipQuery,
  getUserMembershipsQuery,
  listOrganizationsQuery,
} from "./queries";
import {
  createOrganizationMutation,
  deleteOrganizationMutation,
  deleteUserMembershipMutation,
  updateOrganizationMembershipMutation,
  updateOrganizationMutation,
  updateUserMembershipMutation,
} from "./mutations";
import {
  CreateOrganizationPayload,
  UpdateOrganizationMembershipPayload,
  UpdateOrganizationPayload,
  UpdateUserMembershipPayload,
} from "./types";

class OrganizationClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string, appVersion: string, apiToken: string) {
    const URL: Nullable<string> = `${baseUrl}/core/${appVersion}`;

    this.axiosInstance = axios.create({
      baseURL: URL,
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
  }

  /* -------------------------------------------------------------------------
   * Organization Queries
   * -----------------------------------------------------------------------*/

  async listOrganizationsQuery({
    pageSize,
    nextPageToken,
    filter,
  }: {
    pageSize: number;
    nextPageToken: string;
    filter: string;
  }) {
    return listOrganizationsQuery({
      axiosInstance: this.axiosInstance,
      pageSize,
      nextPageToken,
      filter,
    });
  }
  async getOrganizationQuery(organizationID: string) {
    return getOrganizationQuery({
      axiosInstance: this.axiosInstance,
      organizationID,
    });
  }

  async getOrganizationMembershipsQuery(organizationID: string) {
    return getOrganizationQuery({
      axiosInstance: this.axiosInstance,
      organizationID,
    });
  }

  async getOrganizationMembershipQuery({
    organizationID,
    userID,
  }: {
    organizationID: string;
    userID: string;
  }) {
    return getOrganizationMembershipQuery({
      axiosInstance: this.axiosInstance,
      organizationID,
      userID,
    });
  }

  async getUserMembershipsQuery({ userID }: { userID: string }) {
    return getUserMembershipsQuery({
      axiosInstance: this.axiosInstance,
      userID,
    });
  }
  async getUserMembershipQuery({
    userID,
    organizationID,
  }: {
    userID: string;
    organizationID: string;
  }) {
    return getUserMembershipQuery({
      axiosInstance: this.axiosInstance,
      userID,
      organizationID,
    });
  }

  /* -------------------------------------------------------------------------
   * Organization Mutation
   * -----------------------------------------------------------------------*/

  async createOrganizationMutation({
    payload,
  }: {
    payload: CreateOrganizationPayload;
  }) {
    return createOrganizationMutation({
      axiosInstance: this.axiosInstance,
      payload,
    });
  }

  async updateOrganizationMutation({
    payload,
  }: {
    payload: UpdateOrganizationPayload;
  }) {
    return updateOrganizationMutation({
      axiosInstance: this.axiosInstance,
      payload,
    });
  }

  async updateOrganizationMembershipMutation({
    payload,
  }: {
    payload: UpdateOrganizationMembershipPayload;
  }) {
    return updateOrganizationMembershipMutation({
      axiosInstance: this.axiosInstance,
      payload,
    });
  }

  async deleteOrganizationMutation({
    organizationName,
  }: {
    organizationName: string;
  }) {
    return deleteOrganizationMutation({
      axiosInstance: this.axiosInstance,
      organizationName,
    });
  }

  async deleteUserMembershipMutation({
    organizationID,
    userID,
  }: {
    organizationID: string;
    userID: string;
  }) {
    return deleteUserMembershipMutation({
      axiosInstance: this.axiosInstance,
      organizationID,
      userID,
    });
  }

  async updateUserMembershipMutation({
    payload,
  }: {
    payload: UpdateUserMembershipPayload;
  }) {
    return updateUserMembershipMutation({
      axiosInstance: this.axiosInstance,
      payload,
    });
  }
}

export default OrganizationClient;
