"use client";

import React from "react";
import Datatable from "../components/Datatable";

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
  },
  {
    title: "Ativo",
    key: "comments",
    width: "7rem",
  },
];

export default function Entries() {
  return (
    <Datatable
      columns={columns}
      title="Lançamentos"
      label="lançamento"
      route="entries"
    />
  );
}
