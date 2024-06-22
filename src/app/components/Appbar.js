"use client";

import { Avatar, Badge, Button, Layout, Popover, message } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useExpiredInfo } from "../hooks/useExpiredInfo";
import { ExitToAppOutlined } from "@mui/icons-material";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect, useRef } from "react";
import { UserOutlined } from "@ant-design/icons";
import { api } from "@/utils/api";
import { Menu } from "antd";

const { Header } = Layout;

const navigationKeys = {
  0: "/home",
  1: "/entries",
  2: "/accounts",
  3: "/categories",
  4: "/users",
};

export default function Appbar() {
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  const [fetchItems] = useExpiredInfo();
  const { setIsAuthenticated, isAuthenticated, expiredInfo } =
    useContext(AuthContext);
  const isFirstTime = useRef(true);

  useEffect(() => {
    const messageParam = params?.get?.("message");
    if (messageParam) {
      message.error(messageParam);
      router.replace("/home");
      router.refresh();
    }
  }, [params, router]);

  useEffect(() => {
    if (isFirstTime.current && !expiredInfo && isAuthenticated) {
      isFirstTime.current = false;
      fetchItems();
    }
  }, [isFirstTime, expiredInfo, fetchItems]);

  async function handleExitClicked() {
    const response = await api.get("/api/logout");

    if (response.data.success) {
      setIsAuthenticated(false);
      router.replace("/");
    }
  }

  function handleNavigateClicked(key) {
    return () => {
      router.replace(navigationKeys?.[key] ?? "/home");
    };
  }

  function getCurrentRouteKey() {
    const currentRoute = Object.entries(navigationKeys).find(([_, value]) =>
      path.toLowerCase().includes(value.toLowerCase())
    );

    if (!currentRoute) {
      return [];
    }

    const [key] = currentRoute;

    return [key];
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
        selectedKeys={getCurrentRouteKey()}
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
