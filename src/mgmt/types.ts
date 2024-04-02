import { GeneralRecord } from "@instill-ai/toolkit";
import { Nullable } from "../types";

export type User = {
  name: string;
  uid: string;
  email: string;
  id: string;
  first_name: string;
  last_name: string;
  customer_id: string;
  org_name: string;
  role: string;
  newsletter_subscription: boolean;
  type: string;
  create_time: string;
  update_time: string;
  cookie_token?: string;
  profile_avatar?: string;
  profile_data?: GeneralRecord;
};
export type ApiToken = {
  name: string;
  uid: string;
  id: string;
  create_time: string;
  update_time: string;
  access_token: string;
  state: ApiTokenState;
  token_type: string;
};

export type ApiTokenState =
  | "STATE_UNSPECIFIED"
  | "STATE_INACTIVE"
  | "STATE_ACTIVE"
  | "STATE_EXPIRED";

export type NamespaceType =
  | "NAMESPACE_UNSPECIFIED"
  | "NAMESPACE_AVAILABLE"
  | "NAMESPACE_USER"
  | "NAMESPACE_ORGANIZATION"
  | "NAMESPACE_RESERVED";

export type AuthLoginActionPayload = {
  username: string;
  password: string;
};

export type AuthLoginActionResponse = {
  access_token: string;
};

export type UpdateUserResponse = {
  user: AuthenticatedUser;
};

export type CreateApiTokenPayload = {
  id: string;
  ttl: number;
};

export type CreateApiTokenResponse = {
  token: ApiToken;
};

export type ChangePasswordPayload = {
  old_password: string;
  new_password: string;
};

export type GetAuthenticatedResponse = {
  user: AuthenticatedUser;
};
export type GetUserResponse = {
  user: User;
};

export type CheckUserIdExistResponse = {
  exists: boolean;
};

export type GetApiTokenResponse = {
  token: ApiToken;
};

export type ListApiTokensResponse = {
  tokens: ApiToken[];
  next_page_token: string;
  total_size: string;
};

export type ListUsersResponse = {
  users: User[];
  next_page_token: string;
  total_size: string;
};

export type CheckNamespaceResponse = {
  type: NamespaceType;
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

export type OnboardingStatus =
  | "ONBOARDING_STATUS_UNSPECIFIED"
  | "ONBOARDING_STATUS_IN_PROGRESS"
  | "ONBOARDING_STATUS_COMPLETED";

export type AuthenticatedUser = {
  name: string;
  uid: string;
  id: string;
  create_time: string;
  update_time: string;
  customer_id: string;
  email: string;
  newsletter_subscription: boolean;
  role: string;
  onboarding_status: OnboardingStatus;
  cookie_token?: string;
  profile?: UserProfile;
};

export type StripeSubscriptionStatus =
  | "STATUS_UNSPECIFIED"
  | "STATUS_INCOMPLETE"
  | "STATUS_INCOMPLETE_EXPIRED"
  | "STATUS_TRIALING"
  | "STATUS_ACTIVE"
  | "STATUS_PAST_DUE"
  | "STATUS_CANCELED"
  | "STATUS_UNPAID"
  | "STATUS_PAUSED";

export type StripeSubscriptionDetail = {
  product_name: string;
  id: string;
  item_id: string;
  price: number;
  canceled_at?: number;
  trial_end?: number;
  status: StripeSubscriptionStatus;
  description: string;
};

export type UserSubscriptionPlan =
  | "PLAN_UNSPECIFIED"
  | "PLAN_FREEMIUM"
  | "PLAN_PRO";

export type UserSubscription = {
  plan: UserSubscriptionPlan;
  detail: Nullable<StripeSubscriptionDetail>;
};

export type GetAuthenticatedUserSubscriptionsResponse = {
  subscription: UserSubscription;
};
