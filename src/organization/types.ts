import { User } from "../mgmt/types";
import { GeneralRecord, Nullable } from "../types";

export type Organization = {
  name: string;
  uid: string;
  id: string;
  create_time: string;
  update_time: string;
  org_name: string;
  customer_id: string;
  profile_avatar: Nullable<string>;
  profile_data: Nullable<GeneralRecord>;
  owner: Nullable<User>;
};

export type UserMembership = {
  user: User;
  organization: Organization;
  name: Nullable<string>;
  role: MembershipRole;
  state: MembershipState;
};

export type OrganizationMembership = {
  user: User;
  organization: Organization;
  name: Nullable<string>;
  role: MembershipRole;
  state: MembershipState;
};

export type MembershipRole = "admin" | "member" | "pending_member" | "owner";

export type MembershipState =
  | "MEMBERSHIP_STATE_ACTIVE"
  | "MEMBERSHIP_STATE_PENDING";

export type CreateOrganizationPayload = {
  id: string;
  org_name: string;
  profile_avatar?: Nullable<string>;
  profile_data?: Nullable<GeneralRecord>;
};

export type CreateOrganizationResponse = {
  organization: Organization;
};

export type UpdateOrganizationResponse = {
  organization: Organization;
};

export type UpdateOrganizationPayload = {
  id: string;
  org_name: string;
  profile_avatar?: Nullable<string>;
  profile_data?: Nullable<GeneralRecord>;
};

export type UpdateOrganizationMembershipPayload = {
  userID: string;
  organizationID: string;
  role?: MembershipRole;
};

export type UpdateOrganizationMembershipResponse = {
  membership: OrganizationMembership;
};

export type UpdateUserMembershipPayload = {
  userID: string;
  organizationID: string;
  state?: MembershipState;
};

export type UpdateUserMembershipResponse = {
  membership: UserMembership;
};

export type ListOrganizationsResponse = {
  organizations: Organization[];
  next_page_token: string;
  total_size: string;
};

export type OrganizationResponse = {
  organization: Organization;
};

export type GetOrganizationMembershipsResponse = {
  memberships: OrganizationMembership[];
};

export type GetOrganizationMembershipResponse = {
  membership: OrganizationMembership;
};

export type GetUserMembershipResponse = {
  membership: UserMembership;
};
