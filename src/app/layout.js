"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AuthProvider } from "./contexts/AuthContext";
import Content from "./components/Content";
import { Inter } from "next/font/google";
import ptBR from "antd/lib/locale/pt_BR";
import Appbar from "./components/Appbar";
import Footer from "./components/Footer";
import { ConfigProvider } from "antd";
import { Suspense } from "react";
import Loading from "./loading";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const Main = ({ children }) => {
    return <main>{children}</main>;
  };

  return (
    <html lang="en">
      <head>
        <title>Financy</title>
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ConfigProvider locale={ptBR}>
            <AntdRegistry>
              <Main>
                <Suspense fallback={<Loading />}>
                  <Appbar />
                  <Content>{children}</Content>
                  <Footer />
                </Suspense>
              </Main>
            </AntdRegistry>
          </ConfigProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
