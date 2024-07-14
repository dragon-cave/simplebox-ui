import { Layout, Divider, Row, Col } from "antd";
import RootLayout from "../../../components/layout/root";
import UserProfileForm from "../../../components/form/auth/profile";
import UserChangePasswordForm from "../../../components/form/auth/changePassword";

const { Content } = Layout;

const UserPage = () => {
  return (
    <RootLayout>
      <Content style={{ padding: "16px 48px" }}>
        <h1>Perfil do Usuário</h1>
        <Divider />
        <Row gutter={16}>
          <Col xs={24} sm={24} md={11} lg={11} xl={11}>
            <UserProfileForm title={"Alterar Dados do Perfil"} />
          </Col>
          <Col xs={0} sm={0} md={2} lg={2} xl={2}>
            <Divider type="vertical" style={{ height: '100%' }} />
          </Col>
          <Col xs={24} sm={24} md={11} lg={11} xl={11}>
            <UserChangePasswordForm title={"Alterar Senha"} />
          </Col>
        </Row>
        <Divider />
      </Content>
    </RootLayout>
  );
};

export default UserPage;
