import axios, { AxiosInstance } from "axios";
import { Nullable } from "../types";
import { checkUntilOperationIsDone, getOperationQuery } from "./queries";

class OperationClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string, appVersion: string, apiToken: string) {
    const URL: Nullable<string> = `${baseUrl}/${appVersion}`;

    this.axiosInstance = axios.create({
      baseURL: URL,
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
  }

  /* -------------------------------------------------------------------------
   * Operation Queries
   * -----------------------------------------------------------------------*/

  async getOperationQuery({ operationName }: { operationName: string }) {
    return getOperationQuery({
      axiosInstance: this.axiosInstance,
      operationName,
    });
  }

  async checkUntilOperationIsDone({
    operationName,
  }: {
    operationName: string;
  }): Promise<boolean> {
    return checkUntilOperationIsDone({
      axiosInstance: this.axiosInstance,
      operationName,
    });
  }
}

export default OperationClient;
