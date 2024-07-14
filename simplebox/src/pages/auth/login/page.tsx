import LoginForm from "../../../components/form/auth/loginForm";
import styles from "./style.module.css";

const LoginPage = () => {

  return (
    <div className={styles.container}>
      <img src="simplebox-logo.png" alt="SimpleBox" />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
