// axiosInstance.ts
import axios, { AxiosInstance } from "axios";
import { Nullable } from "../types";

const createAxiosInstance = (
  baseUrl: string,
  appVersion: string,
  product: string
): AxiosInstance => {
  let URL: Nullable<string> = `${baseUrl}/${product}/${appVersion}`;

  return axios.create({
    baseURL: URL,
    headers: {},
  });
};

export default createAxiosInstance;
