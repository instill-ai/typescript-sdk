import { AxiosInstance } from "axios";
import { GetModelOperationResponse } from "./types";

export async function getOperationQuery({
  axiosInstance,
  operationName,
}: {
  axiosInstance: AxiosInstance;
  operationName: string;
}) {
  try {
    const { data } = await axiosInstance.get<GetModelOperationResponse>(
      `/${operationName}`
    );
    return Promise.resolve(data.operation);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function checkUntilOperationIsDone({
  axiosInstance,
  operationName,
}: {
  axiosInstance: AxiosInstance;
  operationName: string;
}): Promise<boolean> {
  try {
    const operation = await getOperationQuery({
      axiosInstance,
      operationName,
    });

    if (operation.done) {
      return Promise.resolve(true);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const result = await checkUntilOperationIsDone({
        axiosInstance,
        operationName,
      });
      return Promise.resolve(result);
    }
  } catch (err) {
    return Promise.reject(err);
  }
}
