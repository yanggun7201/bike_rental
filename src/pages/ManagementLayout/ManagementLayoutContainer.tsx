import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { ManagementLayout } from "./ManagementLayout";
import { UserRole } from "../../types/UserRole";
import { Loading } from "../../components/Loading";

export const ManagementLayoutContainer: React.FC = () => {

  const { user, loading: userLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoading) {
      return;
    }

    if (!user || user.role !== UserRole.MANAGER) {
      navigate("/");
    }
  }, [user, navigate, userLoading]);

  if (userLoading) {
    return <Loading />;
  }

  return (
    <ManagementLayout>
      <Outlet />
    </ManagementLayout>
  );
}
