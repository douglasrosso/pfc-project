"use client";

import { Breadcrumb, FloatButton, Layout, Space, theme } from "antd";
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegments,
} from "next/navigation";
import { AuthContext } from "../contexts/AuthContext";
import { ArrowUpOutlined } from "@ant-design/icons";
import { navigationKeys } from "@/utils/navigation";
import { useContext } from "react";

const { Content: ContentAntD } = Layout;

const replacementRoutes = [...navigationKeys, { path: "/new", title: "Novo" }];

export default function Content({ children }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const segments = useSelectedLayoutSegments();
  const path = usePathname();

  function getBreadcrumbTitle(route) {
    if (/\d/.test(route)) {
      return "Editar";
    }
    return replacementRoutes.find((item) => item.path.includes(route)).title;
  }

  return (
    <>
      {isAuthenticated || path === "/" ? (
        <ContentAntD
          style={{
            padding: "30px 48px 48px",
            backgroundColor: "#F8F8F8",
            boxShadow: "inset rgba(149, 157, 165, 0.2) 0px 8px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: !isAuthenticated && "center",
            justifyContent: !isAuthenticated && "center",
          }}
        >
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Breadcrumb
              items={segments.map((segment, index) => ({
                title: (
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(
                        segments
                          .filter((_, innerIndex) => innerIndex <= index)
                          .reduce(
                            (acum, current) => (acum += `/${current}`),
                            ""
                          )
                      );
                    }}
                    href=""
                  >
                    {getBreadcrumbTitle(segment)}
                  </a>
                ),
              }))}
            />
            <div
              style={{
                background: colorBgContainer,
                padding: "10px 24px",
                minHeight: 200,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderRadius: borderRadiusLG,
              }}
            >
              {children}
              <FloatButton.BackTop icon={<ArrowUpOutlined />} />
            </div>
          </Space>
        </ContentAntD>
      ) : null}
    </>
  );
}
