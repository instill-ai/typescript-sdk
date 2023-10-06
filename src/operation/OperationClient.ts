import axios, { AxiosInstance } from "axios";
import { Nullable } from "../types";
import { GetModelOperationResponse } from "./types";

class OperationClient {
  private axiosInstance: AxiosInstance;

  constructor(
    baseUrl: string,
    appVersion: string,
    apiToken: string
  ) {
    let URL: Nullable<string> = `${baseUrl}/model/${appVersion}`;

    this.axiosInstance = axios.create({
      baseURL: URL,
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
  }

  async getOperationQuery({ operationName }: { operationName: string }) {
    try {
      const { data } = await this.axiosInstance.get<GetModelOperationResponse>(
        `/${operationName}`
      );
      return Promise.resolve(data.operation);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async checkUntilOperationIsDoen({
    operationName,
  }: {
    operationName: string;
  }): Promise<boolean> {
    try {
      const operation = await this.getOperationQuery({
        operationName,
      });

      if (operation.done) {
        return Promise.resolve(true);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const result = await this.checkUntilOperationIsDoen({
          operationName,
        });
        return Promise.resolve(result);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default OperationClient;
