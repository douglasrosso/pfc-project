"use client";

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, Layout } from "antd";
import { Menu } from "antd";
import { ExitToAppOutlined } from "@mui/icons-material";

const { Header } = Layout;

export default function Appbar() {
  const router = useRouter();
  const { setIsAuthenticated } = useContext(AuthContext);

  async function handleExitClicked() {
    const response = await axios.get("/api/logout");

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

  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="demo-logo" />
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
