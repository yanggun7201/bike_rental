import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentUserState } from "../stores/store";
import { getUserFromStorage } from "../includes/auth";

const useUser = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const userFromStorage = getUserFromStorage();

  useEffect(() => {
    if (!loading) {
      return;
    }

    if (userFromStorage) {
      setCurrentUser(userFromStorage);
    }
    setLoading(false);
  }, [loading, userFromStorage, setCurrentUser]);

  return {
    user: currentUser,
    loading,
  };
}

export default useUser;
