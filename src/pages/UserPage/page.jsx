import React from "react";

import { useQuery } from "react-query";
import { api, endpoints } from "../../services/api";
import { Layout, theme, Divider } from "antd";
const { Content } = Layout;
import RootLayout from "../../components/Layout/Root";
import UserProfileForm from "../../components/Form/UserProfileForm";
import UserChangePasswordForm from "../../components/Form/UserChangePasswordForm";

const UserPage = () => {
  return (
    <div>
      <RootLayout>
        <Content
          style={{
            padding: "16px 48px",
          }}
        >
          <h1>Perfil do Usuário</h1>
          <Divider />
          {/* alterar dados do perfil */}
          
          <UserProfileForm title={"Alterar Dados do Perfil"} />
          <Divider />
          <UserChangePasswordForm title={"Alterar Senha"} />
        </Content>
      </RootLayout>
    </div>
  );
};

export default UserPage;
