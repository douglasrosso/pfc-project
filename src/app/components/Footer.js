"use client";

import { Flex, Layout, QRCode } from "antd";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { usePathname } from "next/navigation";

const { Footer: FooterAntD } = Layout;

export default function Footer() {
  const { isAuthenticated } = useContext(AuthContext);
  const path = usePathname();
  return (
    <>
      <FooterAntD
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isAuthenticated || path === "/" ? (
          <p>&copy; 2024 Financy. Todos os direitos reservados.</p>
        ) : null}
        {path === "/" && (
          <Flex
            gap="middle"
            wrap
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Flex
              gap="middle"
              wrap
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <strong>Anderson Witt</strong>
              <QRCode size={100} value={"https://github.com/andersonwitt"} />
            </Flex>
            <Flex
              gap="middle"
              wrap
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <strong>Douglas Rosso</strong>
              <QRCode size={100} value={"https://github.com/douglasrosso"} />
            </Flex>
          </Flex>
        )}
      </FooterAntD>
    </>
  );
}
