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

export type AuthLoginActionPayload = {
  username: string;
  password: string;
};

export type AuthLoginActionResponse = {
  access_token: string;
};

export type UpdateUserResponse = {
  user: User;
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
