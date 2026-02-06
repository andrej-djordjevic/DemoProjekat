import { Form, Input, Button } from "antd";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { authStore } from "../../../modules/auth/auth.store";

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = observer(({ onSuccess }: LoginFormProps) => {
  const [error, setError] = useState(false);

  const onFinish = async (values: { username: string; password: string }) => {
    setError(false);

    await authStore.login(values.username, values.password);

    if (authStore.isLoggedIn) {
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <Form
      onFinish={onFinish}
      disabled={authStore.loading}
      className="login-form"
      initialValues={{
        username: "proba123proba",
        password: "proba123proba",
      }}
    >
      <Form.Item
        name="username"
        className="login-form-item"
        rules={[{ required: true, message: "Enter username" }]}
      >
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="password"
        className="login-form-item"
        rules={[{ required: true, message: "Enter password" }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      {(error || authStore.error) && (
        <p className="LoginError login-error-margin">
          {authStore.error ?? "Invalid username or password"}
        </p>
      )}

      <Form.Item>
        <Button className="login-button" htmlType="submit" block>
          {authStore.loading ? "..." : "LOG IN"}
        </Button>
      </Form.Item>
    </Form>
  );
});
