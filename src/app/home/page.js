"use client";

import { Fragment, useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { Card, Col, Row, Spin, Statistic, message } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { api } from "@/utils/api";

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
  const [items, setItems] = useState([]);
  const [statistic, setStatistic] = useState({ revenue: 0, expense: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  function updateHomeInfo({ expiredEntries, revenue, expense }) {
    setItems(expiredEntries);
    setStatistic({ revenue, expense });
  }

  async function fetchItems() {
    try {
      const response = await api.get("/api/entries/expired");
      updateHomeInfo(response.data.data);
      setLoading(false);
    } catch (error) {
      message.error("Erro ao carregar a lista.");
      setLoading(false);
    }
  }

  return (
    <Fragment>
      <h1>Home</h1>
      {loading ? (
        <Spin
          size="large"
          style={{ justifyContent: "center", display: "flex" }}
        />
      ) : (
        <Fragment>
          <Row gutter={16} style={{ marginBottom: 2 }}>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Receitas"
                  value={statistic.revenue}
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
                  value={statistic.expense}
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
            onDelete={fetchItems}
            data={items}
            customFetch={fetchItems}
          />
        </Fragment>
      )}
    </Fragment>
  );
}
