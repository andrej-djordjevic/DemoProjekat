import { LogoutOutlined, StarOutlined, HomeOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Header } from "../Header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import "./AppLayout.scss";
import { authStore } from "../../modules/auth/auth.store";

const { Sider, Content } = Layout;

export function AppLayout() {
  const navigate = useNavigate();

  const logout = () => {
    authStore.logout();
    navigate("/login");
  };

  const handleMenuClick = (e: { key: string }) => {
    if (e.key === "home") {
      navigate("/");
    } else if (e.key === "favorites") {
      navigate("/favorites");
    } else if (e.key === "logout") {
      logout();
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Layout>
        <Sider width={120} className="app-sider">
          <nav>
            <Menu
              mode="vertical"
              theme="dark"
              selectable={false}
              style={{
                flex: 1,
                background: "transparent",
              }}
              items={[
                {
                  key: "home",
                  icon: <HomeOutlined />,
                  label: "Home",
                  onClick: () => handleMenuClick({ key: "home" }),
                },
                {
                  key: "favorites",
                  icon: <StarOutlined />,
                  label: "Favorites",
                  onClick: () => handleMenuClick({ key: "favorites" }),
                },
                {
                  key: "logout",
                  icon: <LogoutOutlined />,
                  label: "Log out",
                  onClick: () => handleMenuClick({ key: "logout" }),
                },
              ]}
            />
          </nav>
        </Sider>
        <Content className="app-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
