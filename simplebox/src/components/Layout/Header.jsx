import { Layout, Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { AuthContext } from "../../contexts/AuthContext";
const { Header } = Layout;
import React, { useContext, useEffect } from "react";

const LayoutHeader = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#1B4965",
      }}
    >
      <img src="\Logo.png" alt="MyApp Logo" style={{ color: "white" }} />

      <div style={{ display: "flex", alignItems: "center" }}>
        <a href="/user">
          <Avatar icon={<UserOutlined />} style={{ marginRight: "16px" }} />
        </a>
        <Button
          icon={<Icon icon="material-symbols:logout" width="24" height="24" />}
          type="text"
          size="large"
          style={{ color: "white" }}
          onClick={() => {logout()}}
        ></Button>
      </div>
    </Header>
  );
};

export default LayoutHeader;
