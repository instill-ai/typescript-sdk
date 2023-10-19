import { AxiosInstance } from "axios";
import {
  CreateUserModelPayload,
  CreateUserModelResponse,
  UpdateUserModelPayload,
  UpdateUserModelResponse,
} from "./types";

export async function createUserModelMutation({
  axiosInstance,
  userName,
  payload,
}: {
  axiosInstance: AxiosInstance;
  userName: string;
  payload: CreateUserModelPayload;
}) {
  if (payload.type === "Local") {
    try {
      const formData = new FormData();
      formData.append("id", payload.id);
      formData.append("model_definition", payload.model_definition);
      formData.append("content", payload.configuration.content);

      if (payload.description) {
        formData.append("description", payload.description);
      }

      const { data } = await axiosInstance.post<CreateUserModelResponse>(
        "/models/multipart",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return Promise.resolve(data.operation);
    } catch (err) {
      return Promise.reject(err);
    }
  } else {
    let input: Record<string, any> = {};

    if (payload.type === "GitHub") {
      input = {
        id: payload.id,
        model_definition: payload.model_definition,
        description: payload.description,
        configuration: {
          repository: payload.configuration.repository,
          tag: payload.configuration.tag,
        },
      };
    } else if (payload.type === "ArtiVC") {
      input = {
        id: payload.id,
        model_definition: payload.model_definition,
        description: payload.description,
        configuration: {
          url: payload.configuration.url,
          credential: payload.configuration.credential
            ? JSON.parse(payload.configuration.credential)
            : undefined,
          tag: payload.configuration.tag,
        },
      };
    } else {
      input = {
        id: payload.id,
        model_definition: payload.model_definition,
        description: payload.description,
        configuration: {
          repo_id: payload.configuration.repo_id,
        },
      };
    }

    try {
      const { data } = await axiosInstance.post<CreateUserModelResponse>(
        `${userName}/models`,
        input
      );

      return Promise.resolve(data.operation);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export async function updateModelMutation({
  axiosInstance,
  payload,
}: {
  axiosInstance: AxiosInstance;
  payload: UpdateUserModelPayload;
}) {
  try {
    const { data } = await axiosInstance.patch<UpdateUserModelResponse>(
      `/${payload.name}`,
      payload
    );
    return Promise.resolve(data.model);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function deleteUserModelMutation({
  axiosInstance,
  modelName,
}: {
  axiosInstance: AxiosInstance;
  modelName: string;
}) {
  try {
    await axiosInstance.delete(`/${modelName}`);
  } catch (err) {
    return Promise.reject(err);
  }
}
