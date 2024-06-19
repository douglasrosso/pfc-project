"use client";

import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useExpiredInfo } from "../hooks/useExpiredInfo";
import { Card, Col, Row, Spin, Statistic } from "antd";
import { AuthContext } from "../contexts/AuthContext";
import Datatable from "../components/Datatable";
import { Fragment, useContext} from "react";

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
  },
  {
    title: "Data de Pagamento",
    key: "payment_date",
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
      <h1>Home</h1>
      {isLoading ? (
        <Spin />
      ) : (
        <>
          <Row gutter={16} style={{ marginBottom: 2 }}>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Receitas"
                  value={expiredInfo?.revenue ?? 0}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Despesas"
                  value={expiredInfo?.expense ?? 0}
                  precision={2}
                  valueStyle={{ color: "#cf1322" }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>

          <Datatable
            hideNewButton
            title="Lançamentos do dia"
            label="lançamento"
            route="entries"
            columns={columns}
            data={expiredInfo?.expiredEntries ?? []}
            customFetch={fetchItems}
          />
        </>
      )}
    </Fragment>
  );
}
