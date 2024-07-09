import React from "react";
import { Layout, theme } from "antd";
const { Footer } = Layout;
import LayoutHeader from "./Header";

const RootLayout = ({ children }) => {
  return (
    <Layout>
      {/* Header */}
      <LayoutHeader />

      {/* Content */}
      {children}
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
