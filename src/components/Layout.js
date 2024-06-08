import styles from "@/styles/Layout.module.css";

export default function Layout({ children }) {
  return <section className={styles.layout}>{children}</section>;
}
