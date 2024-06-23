import { Spin } from "antd";

export default function Loader({ isLoading, children }) {
  return <>{isLoading ? <Spin size={48} /> : children}</>;
}
