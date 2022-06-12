import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { currentUserState } from "../stores/store";
import { getUserFromStorage } from "../includes/auth";

const useUser = () => {

  const setCurrentUserState = useSetRecoilState(currentUserState);
  const user = getUserFromStorage();

  useEffect(() => {
    if (user) {
      setCurrentUserState(user);
    }
  }, [user, setCurrentUserState]);

  return user;
}

export default useUser;
