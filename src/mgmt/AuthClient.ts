import axios, { AxiosInstance } from "axios";
import { Nullable } from "../types";
import {
  User,
  ChangePasswordPayload,
  CreateApiTokenPayload,
  AuthLoginActionPayload,
} from "./types";
import {
  checkUserIdExist,
  getApiTokenQuery,
  getUserMeQuery,
  getUserQuery,
  listApiTokensQuery,
} from "./queries";
import {
  changePasswordMutation,
  createApiTokenMutation,
  deleteApiTokenMutation,
  updateUserMutation,
} from "./mutation";
import {
  authLoginAction,
  authLogoutAction,
  authValidateTokenAction,
  checkNamespace,
} from "./action";

class AuthClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string, appVersion: string, apiToken: string) {
    let URL: Nullable<string> = `${baseUrl}/core/${appVersion}`;

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

  async getUserMeQuery() {
    return getUserMeQuery(this.axiosInstance);
  }

  async getUserQuery({ userName }: { userName: string }) {
    return getUserQuery({
      axiosInstance: this.axiosInstance,
      userName: userName,
    });
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
    return updateUserMutation({
      axiosInstance: this.axiosInstance,
      payload: payload,
    });
  }

  async createApiTokenMutation({
    payload,
  }: {
    payload: CreateApiTokenPayload;
  }) {
    return createApiTokenMutation({
      axiosInstance: this.axiosInstance,
      payload: payload,
    });
  }

  async deleteApiTokenMutation({ tokenName }: { tokenName: string }) {
    return deleteApiTokenMutation({
      axiosInstance: this.axiosInstance,
      tokenName: tokenName,
    });
  }

  /* -------------------------------------------------------------------------
   * Auth
   * -----------------------------------------------------------------------*/

  async changePasswordMutation({
    payload,
  }: {
    payload: ChangePasswordPayload;
  }) {
    return changePasswordMutation({
      axiosInstance: this.axiosInstance,
      payload: payload,
    });
  }

  /* -------------------------------------------------------------------------
   * MGMT Action
   * -----------------------------------------------------------------------*/

  async authLogoutAction() {
    return authLogoutAction(this.axiosInstance);
  }

  async authLoginAction({ payload }: { payload: AuthLoginActionPayload }) {
    return authLoginAction({
      axiosInstance: this.axiosInstance,
      payload: payload,
    });
  }

  async authValidateTokenAction() {
    return authValidateTokenAction(this.axiosInstance);
  }

  async checkNamespace({ id }: { id: string }) {
    return checkNamespace({ axiosInstance: this.axiosInstance, id: id });
  }
}

export default AuthClient;
