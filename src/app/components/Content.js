import { ArrowUpOutlined } from "@ant-design/icons";
import { FloatButton, Layout, theme } from "antd";
const { Content: ContentAnt } = Layout;

export default function Content({ children }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ContentAnt
      style={{
        padding: "30px 48px 48px",
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
        }}
      >
        {children}
        <FloatButton.BackTop icon={<ArrowUpOutlined />} />
      </div>
    </ContentAnt>
  );
}
