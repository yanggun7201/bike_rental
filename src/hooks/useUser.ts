import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { currentUserState } from "../stores/store";
import { getUserFromStorage } from "../includes/auth";

const useUser = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const setCurrentUserState = useSetRecoilState(currentUserState);
  const user = getUserFromStorage();

  useEffect(() => {
    if (user) {
      setCurrentUserState(user);
    }
    setLoading(false);
  }, [user, setCurrentUserState]);

  return {
    user,
    loading,
  };
}

export default useUser;
