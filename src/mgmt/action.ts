import { AxiosInstance } from "axios";
import {
  AuthLoginActionPayload,
  AuthLoginActionResponse,
  CheckNamespaceResponse,
} from "./types";

export async function authLogoutAction(axiosInstance: AxiosInstance) {
  try {
    await axiosInstance.post("/auth/logout");
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function authLoginAction({
  axiosInstance,
  payload,
}: {
  axiosInstance: AxiosInstance;
  payload: AuthLoginActionPayload;
}) {
  try {
    const { data } = await axiosInstance.post<AuthLoginActionResponse>(
      "/auth/login",
      payload
    );

    return Promise.resolve(data.access_token);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function authValidateTokenAction(axiosInstance: AxiosInstance) {
  try {
    await axiosInstance.post("/auth/validate_access_token");
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function checkNamespace({
  id,
  axiosInstance,
}: {
  id: string;
  axiosInstance: AxiosInstance;
}) {
  try {
    const { data } = await axiosInstance.post<CheckNamespaceResponse>(
      "/check-namespace",
      {
        id,
      }
    );
    return Promise.resolve(data.type);
  } catch (err) {
    return Promise.reject(err);
  }
}
