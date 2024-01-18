import { AxiosInstance } from "axios";
import {
  ApiToken,
  CheckUserIdExistResponse,
  GetApiTokenResponse,
  GetUserResponse,
  ListApiTokensResponse,
  ListUsersResponse,
  User,
} from "./types";
import { getQueryString } from "../helper";
import { Nullable } from "../types";

export async function getUserMeQuery(axiosInstance: AxiosInstance) {
  try {
    const { data } = await axiosInstance.get<GetUserResponse>("/users/me");

    return Promise.resolve(data.user);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function getUserQuery({
  userName,
  axiosInstance,
}: {
  userName: string;
  axiosInstance: AxiosInstance;
}) {
  try {
    const { data } = await axiosInstance.get<GetUserResponse>(`/${userName}`);

    return Promise.resolve(data.user);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function checkUserIdExist({
  axiosInstance,
  id,
}: {
  axiosInstance: AxiosInstance;
  id: string;
}) {
  try {
    const { data } = await axiosInstance.get<CheckUserIdExistResponse>(
      `/users/${id}/exist`
    );
    return Promise.resolve(data.exists);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function getApiTokenQuery({
  axiosInstance,
  tokenName,
}: {
  axiosInstance: AxiosInstance;
  tokenName: string;
}) {
  try {
    const { data } = await axiosInstance.get<GetApiTokenResponse>(
      `/${tokenName}`
    );

    return Promise.resolve(data.token);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function listApiTokensQuery({
  axiosInstance,
  pageSize,
  nextPageToken,
}: {
  axiosInstance: AxiosInstance;
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
}) {
  try {
    const tokens: ApiToken[] = [];

    const queryString = getQueryString({
      baseURL: "/tokens",
      pageSize,
      nextPageToken,
      filter: null,
    });

    const { data } = await axiosInstance.get<ListApiTokensResponse>(
      queryString
    );

    tokens.push(...data.tokens);

    if (data.next_page_token) {
      tokens.push(
        ...(await listApiTokensQuery({
          axiosInstance,
          pageSize,
          nextPageToken: data.next_page_token,
        }))
      );
    }

    return Promise.resolve(tokens);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function listUsersQuery({
  pageSize,
  nextPageToken,
  axiosInstance,
}: {
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
  axiosInstance: AxiosInstance;
}) {
  try {
    const users: User[] = [];

    const queryString = getQueryString({
      baseURL: "/users",
      pageSize,
      nextPageToken,
      filter: null,
    });

    const { data } = await axiosInstance.get<ListUsersResponse>(queryString);

    users.push(...data.users);

    if (data.next_page_token) {
      users.push(
        ...(await listUsersQuery({
          pageSize,
          axiosInstance,
          nextPageToken: data.next_page_token,
        }))
      );
    }

    return Promise.resolve(users);
  } catch (err) {
    return Promise.reject(err);
  }
}
