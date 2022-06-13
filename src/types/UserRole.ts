export enum UserRole {
  USER = "USER",
  MANAGER = "MANAGER"
}

export type UserRoleSearchType = "All" | UserRole.USER | UserRole.MANAGER;
