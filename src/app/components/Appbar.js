"use client";

import { Avatar, Badge, Button, Layout, Popover, Space, message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
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

export default function Appbar() {
  const router = useRouter();
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
