"use client";

import { Inter } from "next/font/google";
import "@/styles/globals.css";
import ptBR from "antd/lib/locale/pt_BR";
import { ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Appbar } from "./components/Appbar";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigProvider locale={ptBR}>
          <AntdRegistry>
            <>
              {isAuthenticated ? <Appbar /> : null}
              {children}
            </>
          </AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
