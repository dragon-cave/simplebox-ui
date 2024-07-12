import React from "react";

import { useQuery } from "react-query";
import { api, endpoints } from "../../services/api";
import { Layout, theme } from "antd";
const { Content } = Layout;
import RootLayout from "../../components/Layout/Root";
import UserProfileForm from "../../components/Form/UserProfileForm";

const DashboardPage = () => {
  const { data, refetch } = useQuery(
    ["user"],
    async () => {
      const response = await api.get(endpoints.user);
      return response;
    },
    { refetchOnWindowFocus: false }
  );
  return (
    <div>
      <RootLayout>
        <Content
          style={{
            padding: "16px 48px",
          }}
        >
          Página Inicial
        </Content>
      </RootLayout>
    </div>
  );
};

export default DashboardPage;
