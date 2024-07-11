import React from "react";
import { Layout, theme } from "antd";
const { Content } = Layout;

const LayoutContent = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content
      style={{
        padding: "16px 48px",
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
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    </Content>
  );
};

export default LayoutContent;
