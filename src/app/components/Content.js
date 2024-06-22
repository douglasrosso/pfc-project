import { ArrowUpOutlined } from "@ant-design/icons";
import { FloatButton, Layout, theme } from "antd";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
const { Content: ContentAntD } = Layout;

export default function Content({ children }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <ContentAntD
      style={{
        padding: "30px 48px 48px",
        backgroundColor: "#F8F8F8",
        boxShadow: "inset rgba(149, 157, 165, 0.2) 0px 8px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: !isAuthenticated && "center",
      }}
    >
      <div
        style={{
          background: colorBgContainer,
          paddingInline: 24,
          marginTop: "30px !important",
          paddingBottom: 30,
          minHeight: 200,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRadius: borderRadiusLG,
          width: !isAuthenticated && 400,
        }}
      >
        {children}
        <FloatButton.BackTop icon={<ArrowUpOutlined />} />
      </div>
    </ContentAntD>
  );
}
