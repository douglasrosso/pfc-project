"use client";

import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useExpiredInfo } from "../hooks/useExpiredInfo";
import { Card, Col, Row, Statistic } from "antd";
import { AuthContext } from "../contexts/AuthContext";
import Datatable from "../components/Datatable";
import { Fragment, useContext } from "react";

const columns = [
  {
    title: "Tipo",
    key: "type",
    width: "6rem",
  },
  {
    title: "Categoria",
    key: "categories",
  },
  {
    title: "Descrição",
    key: "description",
  },
  {
    title: "Valor",
    key: "value",
    width: "7rem",
  },
  {
    title: "Data de Vencimento",
    key: "due_date",
    width: "13rem",
  },
  {
    title: "Data de Pagamento",
    key: "payment_date",
    width: "13rem",
  },
  {
    title: "Conta",
    key: "account",
  },
  {
    title: "Status",
    key: "status",
    width: "7rem",
  },
  {
    title: "Ativo",
    key: "comments",
    width: "7rem",
  },
];

export default function Home() {
  const { expiredInfo, isLoading } = useContext(AuthContext);
  const [fetchItems] = useExpiredInfo();

  return (
    <Fragment>
      <h2
        style={{
          color: "#1677FF",
          fontWeight: 400,
          margin: "10px auto 0",
        }}
      >
        Olá! Você está no
      </h2>
      <h1 style={{ color: "#1677FF", margin: "0 auto 10px" }}>Financy</h1>
      <Datatable
        hideNewButton
        title="Lançamentos do Dia e Atrasados"
        label="lançamento"
        route="entries"
        columns={columns}
        data={expiredInfo?.expiredEntries ?? []}
        customFetch={fetchItems}
      />
      <Row gutter={16} style={{ marginTop: 2, marginBottom: 15 }}>
        <Col span={12}>
          <Card style={{ border: "1px solid green" }}>
            <Statistic
              title={<div style={{ color: "green" }}>Receitas</div>}
              value={expiredInfo?.revenue ?? 0}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ border: "1px solid #CF1322" }}>
            <Statistic
              title={<div style={{ color: "#CF1322" }}>Despesas</div>}
              value={expiredInfo?.expense ?? 0}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
}
