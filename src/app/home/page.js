"use client";

import { Fragment, useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { Card, Col, Row, Spin, Statistic, message } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { api } from "@/utils/api";
import moment from "moment";

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

  async function fetchItems() {
    try {
      const response = await api.get("/api/entries");
      const data = response.data.data;

      const filteredData = data
        .filter((entry) => {
          const dueDate = moment(entry.due_date);
          return dueDate.isSameOrBefore(moment(), "day");
        })
        .sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

      setItems(filteredData);

      const totalItems = data.length;
      const totalRevenue = data.filter(
        (item) => item.type === "Receita"
      ).length;
      const totalExpense = data.filter(
        (item) => item.type === "Despesa"
      ).length;

      const revenuePercentage = (totalRevenue / totalItems) * 100;
      const expensePercentage = (totalExpense / totalItems) * 100;

      setStatistic({ revenue: revenuePercentage, expense: expensePercentage });

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
            columns={columns}
            onDelete={fetchItems}
            data={items}
            title="Lançamentos do dia"
            label="lançamento"
            route="entries"
          />
        </Fragment>
      )}
    </Fragment>
  );
}
