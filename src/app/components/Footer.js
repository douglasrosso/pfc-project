import { Layout } from "antd";
const { Footer: FooterAnt } = Layout;

export default function Footer() {
  return (
    <FooterAnt
      style={{
        textAlign: "center",
      }}
    >
      <p>
        &copy; {new Date().getFullYear()} Financy. All rights reserved.
      </p>
      <p>Created by Anderson Witt and Douglas Rosso.</p>
    </FooterAnt>
  );
}
