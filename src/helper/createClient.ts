import axios, { AxiosHeaders } from "axios";
import { env } from "./config";
import { Nullable } from "../types";

export function createClient(
  apiToken: string,
  product: "base" | "model" | "vdp",
  headers?: AxiosHeaders
) {
  let clientHeaders = {};

  if (headers) {
    clientHeaders = headers;
  } else {
    if (apiToken) {
      clientHeaders = {
        Authorization: `Bearer ${apiToken}`,
        "CF-Access-Client-Id": env("CF_ACCESS_CLIENT_ID")
          ? env("CF_ACCESS_CLIENT_ID")
          : undefined,
        "CF-Access-Client-Secret": env("CF_ACCESS_CLIENT_SECRET")
          ? env("CF_ACCESS_CLIENT_SECRET")
          : undefined,
      };
    }
  }

  if (!process.env.API_GATEWAY_URL && !env("API_GATEWAY_URL")) {
    throw new Error("API_GATEWAY_URL or API_GATEWAY_URL is not defined");
  }

  let baseURL: Nullable<string> = `${
    process.env.API_GATEWAY_URL ?? env("API_GATEWAY_URL")
  }/${product}/${env("API_VERSION")}`;

  return axios.create({
    baseURL,
    headers: clientHeaders,
  });
}
