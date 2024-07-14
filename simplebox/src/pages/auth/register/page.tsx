import styles from "./style.module.css";
import RegisterForm from "../../../components/form/auth/registerForm";

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <img src="simplebox-logo.png" alt="SimpleBox" />
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
