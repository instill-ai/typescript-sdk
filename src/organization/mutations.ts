import { AxiosInstance } from "axios";
import {
  Organization,
  MembershipRole,
  OrganizationMembership,
  MembershipState,
  UserMembership,
  CreateOrganizationPayload,
  CreateOrganizationResponse,
  UpdateOrganizationPayload,
  UpdateOrganizationResponse,
  UpdateOrganizationMembershipPayload,
  UpdateOrganizationMembershipResponse,
  UpdateUserMembershipPayload,
  UpdateUserMembershipResponse,
} from "./types";
import { GeneralRecord, Nullable } from "@instill-ai/toolkit";

export async function createOrganizationMutation({
  payload,
  axiosInstance,
}: {
  payload: CreateOrganizationPayload;
  axiosInstance: AxiosInstance;
}) {
  try {
    const { data } = await axiosInstance.post<CreateOrganizationResponse>(
      "/organizations",
      payload
    );

    return Promise.resolve(data.organization);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function updateOrganizationMutation({
  payload,
  axiosInstance,
}: {
  payload: UpdateOrganizationPayload;
  axiosInstance: AxiosInstance;
}) {
  try {
    const { data } = await axiosInstance.patch<UpdateOrganizationResponse>(
      `/organizations/${payload.id}`,
      {
        ...payload,
        id: undefined,
      }
    );

    return Promise.resolve(data.organization);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function updateOrganizationMembershipMutation({
  payload,
  axiosInstance,
}: {
  payload: UpdateOrganizationMembershipPayload;
  axiosInstance: AxiosInstance;
}) {
  try {
    const { data } =
      await axiosInstance.put<UpdateOrganizationMembershipResponse>(
        `/organizations/${payload.organizationID}/memberships/${payload.userID}`,
        {
          ...payload,
          organizationID: undefined,
          userID: undefined,
        }
      );

    return Promise.resolve(data.membership);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function deleteOrganizationMutation({
  organizationName,
  axiosInstance,
}: {
  organizationName: string;
  axiosInstance: AxiosInstance;
}) {
  try {
    await axiosInstance.delete(`/organizations/${organizationName}`);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function deleteOrganizationMembershipMutation({
  organizationID,
  userID,
  axiosInstance,
}: {
  organizationID: string;
  userID: string;
  axiosInstance: AxiosInstance;
}) {
  try {
    await axiosInstance.delete(
      `/organizations/${organizationID}/memberships/${userID}`
    );
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function deleteUserMembershipMutation({
  organizationID,
  userID,
  axiosInstance,
}: {
  organizationID: string;
  userID: string;
  axiosInstance: AxiosInstance;
}) {
  try {
    await axiosInstance.delete(
      `/users/${userID}/memberships/${organizationID}`
    );
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function updateUserMembershipMutation({
  payload,
  axiosInstance,
}: {
  payload: UpdateUserMembershipPayload;
  axiosInstance: AxiosInstance;
}) {
  try {
    const { data } = await axiosInstance.put<UpdateUserMembershipResponse>(
      `/users/${payload.userID}/memberships/${payload.organizationID}`,
      {
        ...payload,
        organizationID: undefined,
        userID: undefined,
      }
    );

    return Promise.resolve(data.membership);
  } catch (err) {
    return Promise.reject(err);
  }
}
