"use client";

import React from "react";
import Datatable from "../components/Datatable";

const columns = [
  {
    title: "Tipo",
    key: "type",
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
  },
  {
    title: "Ações",
    key: "action",
  },
];

export default function Entries() {
  return (
    <main>
      <Datatable
        columns={columns}
        title="Entradas"
        label="entrada"
        route="entries"
      />
    </main>
  );
}
