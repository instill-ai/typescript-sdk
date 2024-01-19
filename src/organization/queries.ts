import { AxiosInstance } from "axios";

import {
  GetOrganizationMembershipResponse,
  GetOrganizationMembershipsResponse,
  ListOrganizationsResponse,
  Organization,
  OrganizationMembership,
  OrganizationResponse,
  UserMembership,
} from "./types";
import { Nullable } from "@instill-ai/toolkit";
import { getQueryString } from "../helper";

export async function listOrganizationsQuery({
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
    const organizations: Organization[] = [];

    const queryString = getQueryString({
      baseURL: "/organizations",
      pageSize,
      nextPageToken,
      filter,
    });

    const { data } = await axiosInstance.get<ListOrganizationsResponse>(
      queryString
    );

    organizations.push(...data.organizations);

    if (data.next_page_token) {
      organizations.push(
        ...(await listOrganizationsQuery({
          axiosInstance,
          pageSize,
          nextPageToken: data.next_page_token,
          filter,
        }))
      );
    }

    return Promise.resolve(organizations);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function getOrganizationQuery({
  organizationID,
  axiosInstance,
}: {
  organizationID: string;
  axiosInstance: AxiosInstance;
}) {
  try {
    const { data } = await axiosInstance.get<OrganizationResponse>(
      `/organizations/${organizationID}`
    );

    return Promise.resolve(data.organization);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function getOrganizationMembershipsQuery({
  organizationID,
  axiosInstance,
}: {
  organizationID: string;
  axiosInstance: AxiosInstance;
}) {
  try {
    const { data } =
      await axiosInstance.get<GetOrganizationMembershipsResponse>(
        `/organizations/${organizationID}/memberships`
      );

    return Promise.resolve(data.memberships);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function getOrganizationMembershipQuery({
  organizationID,
  userID,
  axiosInstance,
}: {
  organizationID: string;
  userID: string;
  axiosInstance: AxiosInstance;
}) {
  try {
    const { data } = await axiosInstance.get<GetOrganizationMembershipResponse>(
      `/organizations/${organizationID}/memberships/${userID}`
    );

    return Promise.resolve(data.membership);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type GetUserMembershipsResponse = {
  memberships: UserMembership[];
};

export async function getUserMembershipsQuery({
  userID,
  axiosInstance,
}: {
  userID: string;
  axiosInstance: AxiosInstance;
}) {
  try {
    const { data } = await axiosInstance.get<GetUserMembershipsResponse>(
      `users/${userID}/memberships`
    );

    return Promise.resolve(data.memberships);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function getUserMembershipQuery({
  userID,
  organizationID,
  axiosInstance,
}: {
  userID: string;
  organizationID: string;
  axiosInstance: AxiosInstance;
}) {
  try {
    const { data } = await axiosInstance.get<GetUserMembershipsResponse>(
      `users/${userID}/memberships/${organizationID}`
    );

    return Promise.resolve(data.memberships);
  } catch (err) {
    return Promise.reject(err);
  }
}
