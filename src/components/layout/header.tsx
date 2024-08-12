import { useContext } from "react";
import { Layout, Button, Avatar, Tooltip, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { AuthContext } from "../../contexts/authContext";
import { api, endpoints } from "../../services/api";
import styles from "./header.module.css";
import { useQuery } from "@tanstack/react-query";

const { Header } = Layout;

const LayoutHeader = () => {
  const authContext = useContext(AuthContext);
  const logout = authContext?.logout;

  const { data: pictureURL } = useQuery({
    queryKey: ["profilePicture"],
    queryFn: async () => {
      const response = await api.get(endpoints.profilePicture);
      return response.data.url;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <Header className={styles.header}>
      <a href="/" className={styles.logoContainer}>
        <img src="/Logo.png" alt="MyApp Logo" className={styles.logo} />
      </a>

      <div className={styles.profileSection}>
        <a href="/meu-perfil">
          <Tooltip title="Meu perfil">
            <Avatar src={pictureURL} className={styles.avatar} />
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
