"use client";

import { Avatar, Badge, Button, Layout, Popover, Space, message } from "antd"; 
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useExpiredInfo } from "../hooks/useExpiredInfo";
import {
  DangerousRounded,
  ExitToAppOutlined,
  WarningRounded,
} from "@mui/icons-material";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect, useRef } from "react";
import { UserOutlined } from "@ant-design/icons";
import { api } from "@/utils/api";
import { Menu } from "antd";

const { Header } = Layout;

const navigationKeys = [
  { path: "/home", title: "Home" },
  { path: "/entries", title: "Lançamentos" },
  { path: "/accounts", title: "Contas" },
  { path: "/categories", title: "Categorias" },
  { path: "/users", title: "Usuários" },
];

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
      router.replace(navigationKeys?.[key].path ?? "/home");
    };
  }

  function getCurrentRouteKey() {
    const currentRouteIndex = navigationKeys.findIndex((item) =>
      path.toLowerCase().includes(item.path.toLowerCase())
    );

    if (currentRouteIndex < 0) {
      return [];
    }

    return [String(currentRouteIndex)];
  }

  const items = navigationKeys.map((item, index) => ({
    key: index,
    label: item.title,
    onClick: handleNavigateClicked(String(index)),
  }));

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
        title={<div style={{ textAlign: "center" }}>Resumo de lançamentos</div>}
        content={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Space style={{ display: "flex", alignItems: "center" }}>
              <WarningRounded
                style={{
                  fill: "#EF6C00",
                  display: "flex",
                  alignItems: "center",
                }}
              />
              <p style={{ margin: 0, color: "#EF6C00" }}>
                Lançamentos do dia:{" "}
                <strong>
                  {expiredInfo?.releasesOfTheOrderedDay.length ?? 0}{" "}
                </strong>
              </p>
            </Space>
            <Space
              style={{ display: "flex", alignItems: "center", marginTop: 10 }}
            >
              <DangerousRounded
                style={{
                  fill: "#CF1322",
                  display: "flex",
                  alignItems: "center",
                }}
              />
              <p style={{ margin: 0, color: "#CF1322" }}>
                Lançamentos vencidos:{" "}
                <strong>
                  {expiredInfo?.pastDueReleasesSorted.length ?? 0}{" "}
                </strong>
              </p>
            </Space>
          </div>
        }
      >
        <a>
          <Badge count={expiredInfo?.expiredEntriesCount ?? 0}>
            <Avatar
              style={{
                backgroundColor: "#1677FF",
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
