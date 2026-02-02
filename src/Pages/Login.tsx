import { Form, Input, Button, Card } from 'antd';
import { Loader } from '../Components/Loader';
import { useNavigate } from 'react-router-dom';
import '../CSS/login.scss';
import { useState } from 'react';
import { authStore } from '../auth.store';
import { observer } from 'mobx-react-lite';

export default observer(function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const onFinish = async (values: { username: string; password: string }) => {
    setError(false);

    await authStore.login(values.username, values.password);
    if (authStore.isLoggedIn) {
      navigate('/');
    } else {
      setError(true);
    }
  };

  return (
    <div className="login-page login-centered">
      <Card className="login-card">
        {authStore.loading && <Loader />}
        <Form
          onFinish={onFinish}
          disabled={authStore.loading}
          className="login-form"
          initialValues={{
            username: 'admin',
            password: 'admin',
          }}
        >
          <Form.Item
            name="username"
            className="login-form-item"
            rules={[{ required: true, message: 'Enter username' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            className="login-form-item"
            rules={[{ required: true, message: 'Enter password' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          {(error || authStore.error) && (
            <p className="LoginError login-error-margin">
              {authStore.error ?? 'Invalid username or password'}
            </p>
          )}

          <Form.Item>
            <Button className="login-button" htmlType="submit" block>
              {authStore.loading ? '...' : 'LOG IN'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
});
