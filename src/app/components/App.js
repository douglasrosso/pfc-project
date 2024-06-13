import { Layout } from "antd";
import Appbar from "./Appbar";
import Content from "./Content";
import Footer from "./Footer";

export default function App({ children }) {
  return (
    <Layout>
      <Appbar />
      <Content>{children}</Content>
      <Footer />
    </Layout>
  );
}
