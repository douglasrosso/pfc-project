import { Breadcrumb, Layout, theme } from "antd";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
const { Content: ContentAnt } = Layout;

export default function Content({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const breadcrumbItems = [
    { title: "Home" },
    { title: "List" },
    { title: "App" },
  ];

  return (
    <ContentAnt
      style={{
        padding: "0 48px",
      }}
    >
      {isAuthenticated && (
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
          items={breadcrumbItems}
        />
      )}
      <div
        style={{
          background: colorBgContainer,
          minHeight: 280,
          padding: 24,
          borderRadius: borderRadiusLG,
        }}
      >
        {children}
      </div>
    </ContentAnt>
  );
}
