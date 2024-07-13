import { ReactNode } from "react";
import { Layout, theme } from "antd";
import LayoutHeader from "./header";

const { Footer, Content } = Layout;

const RootLayout = ({ children }: { children: ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh " }}>
      {/* Header */}
      <LayoutHeader />

      {/* Content */}
      <Content
        style={{
          padding: "16px 48px",
          // minHeight: "100vh",
        }}
      >
        <Layout
          style={{
            padding: "24px 0",

            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Content
            style={{
              padding: "0 24px",
              minHeight: "80vh",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Content>

      <Footer
        style={{
          textAlign: "center",
        }}
      >
        SimpleBox ©{new Date().getFullYear()} Created By Benjamin, Hiro, Italo,
        Pedro, Ryan e Vinícius
      </Footer>
    </Layout>
  );
};

export default RootLayout;
