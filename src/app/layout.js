"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AuthProvider } from "./contexts/AuthContext";
import { Appbar } from "./components/Appbar";
import { Inter } from "next/font/google";
import ptBR from "antd/lib/locale/pt_BR";
import { ConfigProvider, Layout } from "antd";
import "@/styles/globals.css";

const { Header, Content } = Layout;

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ConfigProvider locale={ptBR}>
            <AntdRegistry>
              <Layout>
                <Appbar />
                <Content style={{ paddingTop: "3rem" }}>{children}</Content>
              </Layout>
            </AntdRegistry>
          </ConfigProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
