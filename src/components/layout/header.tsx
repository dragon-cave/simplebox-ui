import { Layout, Button, Avatar, Tooltip, message } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";
import styles from "./header.module.css";

const { Header } = Layout;

const LayoutHeader = () => {
  const authContext = useContext(AuthContext);
  const logout = authContext?.logout;

  return (
    <Header className={styles.header}>
      <a href="/" className={styles.logoContainer}>
        <img src="/Logo.png" alt="MyApp Logo" className={styles.logo} />
      </a>

      <div className={styles.profileSection}>
        <a href="/meu-perfil">
          <Tooltip title="Meu perfil">
            <Avatar icon={<UserOutlined />} className={styles.avatar} />
          </Tooltip>
        </a>
        <Button
          icon={
            <Tooltip title="Sair">
              <LogoutOutlined className={styles.logoutIcon} />
            </Tooltip>
          }
          type="text"
          size="large"
          className={styles.logoutButton}
          onClick={() => {
            if (logout) {
              message.success("Deslogado com sucesso!");
              logout();
            } else {
              message.error("Erro ao deslogar!");
            }
          }}
        />
      </div>
    </Header>
  );
};

export default LayoutHeader;
