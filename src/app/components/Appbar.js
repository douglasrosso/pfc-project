"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Avatar, Badge, Button, Layout, Popover, Space, message } from "antd";
import { Menu } from "antd";
import { ExitToAppOutlined } from "@mui/icons-material";
import { api } from "@/utils/api";
import { useExpiredInfo } from "../hooks/useExpiredInfo";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

export default function Appbar() {
  const router = useRouter();
  const { setIsAuthenticated, isAuthenticated, expiredInfo } =
    useContext(AuthContext);

  const [fetchItems] = useExpiredInfo();

  useEffect(() => {
    if (!expiredInfo) fetchItems();
  }, []);

  async function handleExitClicked() {
    const response = await api.get("/api/logout");

    if (response.data.success) {
      setIsAuthenticated(false);
      router.replace("/");
    }
  }

  function handleNavigateClicked(key) {
    return () => {
      switch (Number(key)) {
        case 0:
          router.replace("/home");
          break;
        case 1:
          router.replace("/entries");
          break;
        case 2:
          router.replace("/accounts");
          break;
        case 3:
          router.replace("/categories");
          break;
        case 4:
          router.replace("/users");
          break;
        default:
          router.replace("/home");
          break;
      }
    };
  }

  const items = [
    {
      key: 0,
      label: "Home",
      onClick: handleNavigateClicked("0"),
    },
    {
      key: 1,
      label: "Lançamentos",
      onClick: handleNavigateClicked("1"),
    },
    {
      key: 2,
      label: "Contas",
      onClick: handleNavigateClicked("2"),
    },
    {
      key: 3,
      label: "Categorias",
      onClick: handleNavigateClicked("3"),
    },
    {
      key: 4,
      label: "Usuários",
      onClick: handleNavigateClicked("4"),
    },
  ];

  return isAuthenticated ? (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 40,
      }}
    >
      <Popover
        trigger="click"
        content={
          <div>
            <p>teste</p>
          </div>
        }
      >
        <a>
          <Badge count={expiredInfo?.expiredEntriesCount ?? 0}>
            <Avatar
              style={{
                backgroundColor: "#87d068",
              }}
              icon={<UserOutlined />}
            />
          </Badge>
        </a>
      </Popover>
      <Menu
        theme="dark"
        mode="horizontal"
        items={items}
        style={{
          flex: 1,
          minWidth: 0,
        }}
      />

      <Button
        type="link"
        style={{ color: "#ffffffa6" }}
        onClick={handleExitClicked}
      >
        <ExitToAppOutlined />
      </Button>
    </Header>
  ) : null;
}
