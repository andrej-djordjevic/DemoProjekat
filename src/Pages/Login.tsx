import { Form, Input, Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../CSS/_login.scss';
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
    <div
      className="login-page"
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        style={{
          width: 450,
          height: 280,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '0px',
          borderColor: 'black',
          borderWidth: '2px',
          justifyContent: 'center',
          backgroundColor: '#808080',
        }}
      >
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
            style={{ width: '80%' }}
            rules={[{ required: true, message: 'Enter username' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            style={{ width: '80%' }}
            rules={[{ required: true, message: 'Enter password' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          {(error || authStore.error) && (
            <p className="LoginError" style={{ margin: '0 0 0 10%' }}>
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
