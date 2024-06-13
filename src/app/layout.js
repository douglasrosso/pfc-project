"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AuthProvider } from "./contexts/AuthContext";
import { Inter } from "next/font/google";
import ptBR from "antd/lib/locale/pt_BR";
import { ConfigProvider, Layout } from "antd";
import "@/styles/globals.css";
import Appbar from "./components/Appbar";
import Content from "./components/Content";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const Main = ({ children }) => {
    return <main>{children}</main>;
  };

  return (
    <html lang="en">
      <head>
        <title>PFC</title>
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ConfigProvider locale={ptBR}>
            <AntdRegistry>
              <Main>
                <Appbar />
                <Content>{children}</Content>
              </Main>
            </AntdRegistry>
          </ConfigProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
