import "../Header/Header.scss";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../modules/auth/auth.store";
import type { FilterParams } from "../../modules/characters";
import { Layout, Menu } from "antd";
import { LogoutOutlined, StarOutlined, HomeOutlined } from "@ant-design/icons";

export interface HeaderProps {
  setFilters: (f: FilterParams) => void;
}

export const Header = observer(({ setFilters }: HeaderProps) => {
  const navigate = useNavigate();

  const logout = () => {
    authStore.logout();
    navigate("/login");
  };
  {
    /* Todo: use ANTD header, incorporate it into the Layout.tsx component, you can also add a sidebar menu for navigation between the two pages */
  }
  const handleMenuClick = (e: { key: string }) => {
    setFilters({
      name: undefined,
      species: undefined,
      status: undefined,
      gender: undefined,
    });
    if (e.key === "home") {
      navigate("/");
    } else if (e.key === "favorites") {
      navigate("/favorites");
    } else if (e.key === "logout") {
      logout();
    }
  };

  return (
    <Layout.Header
      className="app-header"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <img
          src="../../public/Logo.png"
          className="logo"
          style={{ height: 48, cursor: "pointer" }}
          onClick={() => handleMenuClick({ key: "home" })}
        />
      </div>
      <Menu
        mode="horizontal"
        theme="dark"
        selectable={false}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          background: "transparent",
          minWidth: 0,
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
    </Layout.Header>
  );
});
