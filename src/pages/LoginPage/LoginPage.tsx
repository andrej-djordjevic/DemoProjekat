import { Card } from "antd";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../Components/Loader/Loader";
import { authStore } from "../../modules/auth/auth.store";

import "./LoginPage.scss";
import { LoginForm } from "./components/LoginForm";

const Login = observer(function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-page login-centered">
      <Card className="login-card">
        {authStore.loading && <Loader />}
        <LoginForm onSuccess={() => navigate("/")} />
      </Card>
    </div>
  );
});

export default Login;
