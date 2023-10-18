import axios, { AxiosInstance } from "axios";
import { Nullable } from "../types";
import {
  ApiToken,
  User,
  CheckUserIdExistResponse,
  GetApiTokenResponse,
  GetUserResponse,
  ListApiTokensResponse,
  ChangePasswordPayload,
  CreateApiTokenPayload,
  CreateApiTokenResponse,
  UpdateUserResponse,
  AuthLoginActionPayload,
  AuthLoginActionResponse,
} from "./types";
import { getQueryString } from "../helper";
import {
  checkUserIdExist,
  getApiTokenQuery,
  getUserQuery,
  listApiTokensQuery,
} from "./queries";

class AuthClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string, appVersion: string, apiToken: string) {
    let URL: Nullable<string> = `${baseUrl}/base/${appVersion}`;

    this.axiosInstance = axios.create({
      baseURL: URL,
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
  }

  /* -------------------------------------------------------------------------
   * MGMT Queries
   * -----------------------------------------------------------------------*/

  async getUserQuery() {
    return getUserQuery(this.axiosInstance);
  }

  async checkUserIdExist({ id }: { id: string }) {
    return checkUserIdExist({ axiosInstance: this.axiosInstance, id: id });
  }

  async getApiTokenQuery({ tokenName }: { tokenName: string }) {
    return getApiTokenQuery({
      axiosInstance: this.axiosInstance,
      tokenName: tokenName,
    });
  }

  async listApiTokensQuery({
    pageSize,
    nextPageToken,
  }: {
    pageSize: Nullable<number>;
    nextPageToken: Nullable<string>;
  }) {
    return listApiTokensQuery({
      axiosInstance: this.axiosInstance,
      pageSize: pageSize,
      nextPageToken: nextPageToken,
    });
  }

  /* -------------------------------------------------------------------------
   * MGMT Mutation
   * -----------------------------------------------------------------------*/

  async updateUserMutation({ payload }: { payload: Partial<User> }) {
    try {
      const { data } = await this.axiosInstance.patch<UpdateUserResponse>(
        "/users/me",
        payload
      );

      return Promise.resolve(data.user);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async createApiTokenMutation({
    payload,
  }: {
    payload: CreateApiTokenPayload;
  }) {
    try {
      const { data } = await this.axiosInstance.post<CreateApiTokenResponse>(
        "/tokens",
        payload
      );

      return Promise.resolve(data.token);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async deleteApiTokenMutation({ tokenName }: { tokenName: string }) {
    try {
      await this.axiosInstance.delete(`/${tokenName}`);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /* -------------------------------------------------------------------------
   * Auth
   * -----------------------------------------------------------------------*/

  async changePasswordMutation({
    payload,
  }: {
    payload: ChangePasswordPayload;
  }) {
    try {
      await this.axiosInstance.post("/auth/change_password", payload);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /* -------------------------------------------------------------------------
   * MGMT Action
   * -----------------------------------------------------------------------*/

  async authLogoutAction() {
    try {
      await this.axiosInstance.post("/auth/logout");
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async authLoginAction({ payload }: { payload: AuthLoginActionPayload }) {
    try {
      const { data } = await this.axiosInstance.post<AuthLoginActionResponse>(
        "/auth/login",
        payload
      );

      return Promise.resolve(data.access_token);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async authValidateTokenAction({}: {}) {
    try {
      await this.axiosInstance.post("/auth/validate_access_token");
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default AuthClient;
