import { atom, selector } from "recoil";
import { User } from "../types/User";
import { UserRole, UserRoleSearchType } from "../types/UserRole";

export const managementUsersState = atom({
  key: 'managementUsersState',
  default: [] as User[],
});

export const managementUsersFilterState = atom({
  key: 'managementUsersFilterState',
  default: 'All' as UserRoleSearchType,
});

export const filteredManagementUsersState = selector({
  key: 'filteredManagementUsersState',
  get: ({get}) => {
    const userFilterType = get(managementUsersFilterState);
    const users = get(managementUsersState);

    switch (userFilterType) {
      case UserRole.MANAGER:
      case UserRole.USER:
        return users.filter(u => u.role === userFilterType);
      case "All":
      default:
        return users;
    }
  }
});
