/* eslint-disable  @typescript-eslint/no-explicit-any */
import { AirbyteFieldValues } from "@instill-ai/toolkit";
import { Spec } from "../types";

export type ConnectorResourceState =
  | "STATE_CONNECTED"
  | "STATE_DISCONNECTED"
  | "STATE_ERROR"
  | "STATE_UNSPECIFIED";

export type ConnectorResourceVisibility =
  | "VISIBILITY_UNSPECIFIED"
  | "VISIBILITY_PRIVATE"
  | "VISIBILITY_PUBLIC";

export type ConnectorResourceType =
  | "CONNECTOR_TYPE_UNSPECIFIED"
  | "CONNECTOR_TYPE_OPERATOR"
  | "CONNECTOR_TYPE_DATA"
  | "CONNECTOR_TYPE_AI"
  | "CONNECTOR_TYPE_BLOCKCHAIN";

export type ConnectorResource = {
  name: string;
  uid: string;
  id: string;
  connector_definition: null;
  connector_definition_name: string;
  type: ConnectorResourceType;
  task: string;
  description: string;
  configuration: Record<string, any> | Record<string, never>;
  state: ConnectorResourceState;
  tombstone: boolean;
  user: string;
  create_time: string;
  update_time: string;
  visibility: ConnectorResourceVisibility;
};

export type ConnectorResourceWithDefinition = Omit<
  ConnectorResource,
  "connector_definition"
> & {
  connector_definition: ConnectorDefinition;
};

export type ConnectorDefinition = {
  name: string;
  uid: string;
  id: string;
  title: string;
  documentation_url: string;
  icon: string;
  icon_url: string;
  connector_type: ConnectorResourceType;
  spec: Spec;
  tombstone: boolean;
  public: boolean;
  custom: boolean;
  vendor: string;
  vendor_attributes: Record<string, any>;
};

export type ConnectorResourceWatchState = {
  state: ConnectorResourceState;
};

export type ConnectorResourcesWatchState = Record<
  string,
  ConnectorResourceWatchState
>;

export type ConnectorResourceWithWatchState = {
  watchState: ConnectorResourceState;
} & ConnectorResourceWithDefinition;

export type TestUserConnectorResourceConnectionResponse = {
  state: ConnectorResourceState;
};

export type ConnectUserConnectorResourceResponse = {
  connector_resource: ConnectorResource;
};

export type DisconnectUserConnectorResourceResponse = {
  connector_resource: ConnectorResource;
};

export type CreateUserConnectorResourcePayload = {
  id: string;
  connector_definition_name: string;
  description?: string;
  configuration: Record<string, any> | Record<string, never>;
};

export type CreateUserConnectorResourceResponse = {
  connector_resource: ConnectorResource;
};

export type UpdateUserConnectorResourcePayload = {
  connectorResourceName: string;
  description?: string;
  configuration: /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  Record<string, any> | AirbyteFieldValues | Record<string, never>;
};

export type UpdateUserConnectorResourceResponse = {
  connector_resource: ConnectorResource;
};

export type RenameUserConnectorResourcePayload = {
  name: string;
  new_connector_id: string;
};

export type RenameUserConnectorResourceResponse = {
  connector_resource: ConnectorResource;
};

export type ListConnectorResourcesResponse = {
  connector_resources: ConnectorResourceWithDefinition[];
  next_page_token: string;
  total_size: number;
};

export type ListUserConnectorResourcesResponse = {
  connector_resources: ConnectorResourceWithDefinition[];
  next_page_token: string;
  total_size: number;
};

export type ListConnectorDefinitionsResponse = {
  connector_definitions: ConnectorDefinition[];
  next_page_token: string;
  total_size: number;
};

export type GetConnectorDefinitionResponse = {
  connector_definition: ConnectorDefinition;
};

export type GetUserConnectorResourceResponse = {
  connector_resource: ConnectorResourceWithDefinition;
};
