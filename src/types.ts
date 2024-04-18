/* eslint-disable @typescript-eslint/no-explicit-any */

import { JSONSchema7 } from "json-schema";
import { ConnectorState } from "./connector";
import { ModelState } from "./model";
import { OpenAPIV3 } from "openapi-types";
import { PipelineReleaseState } from "./pipeline";

export type ErrorDetails = {
  "@type": string;
  violations?: Violation[];
  description?: string;
};

export type Violation = {
  type: string;
  description: string;
  subject: string;
};

export type ResourceState = ModelState | PipelineReleaseState | ConnectorState;

export type Spec = {
  resource_specification: JSONSchema7;
  component_specification: JSONSchema7;
  openapi_specifications: Record<string, OpenAPIV3.Document>;
};

export type Visibility =
  | "VISIBILITY_UNSPECIFIED"
  | "VISIBILITY_PRIVATE"
  | "VISIBILITY_PUBLIC";

export type Nullable<T> = T | null;

export type GeneralRecord = Record<string, any>;

export type AirbyteFieldValues = {
  [k: string]: string | number | boolean | null | AirbyteFieldValues;
};

export type OrganizationProfile = {
  display_name?: string;
  bio?: string;
  public_email?: string;
  avatar?: string;
  social_profiles_links?: {
    webiste?: string;
    x?: string;
    github?: string;
  };
};

export type Organization = {
  name: string;
  uid: string;
  id: string;
  create_time: string;
  update_time: string;
  owner: User;
  profile?: OrganizationProfile;
};

export type UserProfile = {
  display_name?: string;
  bio?: string;
  public_email?: string;
  company_name?: string;
  avatar?: string;
  social_profiles_links?: {
    webiste?: string;
    x?: string;
    github?: string;
  };
};

export type User = {
  name: string;
  uid: string;
  id: string;
  create_time: string;
  update_time: string;
  profile?: UserProfile;
};

export type UserOwner = {
  user: User;
};

export type OrganizationOwner = {
  organization: Organization;
};

export type Owner = UserOwner | OrganizationOwner;
