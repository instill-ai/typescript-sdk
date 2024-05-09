import { AxiosInstance } from "axios";
import {
  AuthenticatedUser,
  ChangePasswordPayload,
  CreateApiTokenPayload,
  CreateApiTokenResponse,
  UpdateUserResponse,
} from "./types";

export async function updateAuthenticatedUserMutation({
  payload,
  axiosInstance,
}: {
  payload: Partial<AuthenticatedUser>;
  axiosInstance: AxiosInstance;
}) {
  try {
    const { data } = await axiosInstance.patch<UpdateUserResponse>(
      "/user",
      payload
    );

    return Promise.resolve(data.user);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function createApiTokenMutation({
  axiosInstance,
  payload,
}: {
  axiosInstance: AxiosInstance;
  payload: CreateApiTokenPayload;
}) {
  try {
    const { data } = await axiosInstance.post<CreateApiTokenResponse>(
      "/tokens",
      payload
    );

    return Promise.resolve(data.token);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function deleteApiTokenMutation({
  axiosInstance,
  tokenName,
}: {
  axiosInstance: AxiosInstance;
  tokenName: string;
}) {
  try {
    await axiosInstance.delete(`/${tokenName}`);
  } catch (err) {
    return Promise.reject(err);
  }
}

/* -------------------------------------------------------------------------
 * Auth
 * -----------------------------------------------------------------------*/

export async function changePasswordMutation({
  axiosInstance,
  payload,
}: {
  axiosInstance: AxiosInstance;
  payload: ChangePasswordPayload;
}) {
  try {
    await axiosInstance.post("/auth/change_password", payload);
  } catch (err) {
    return Promise.reject(err);
  }
}
