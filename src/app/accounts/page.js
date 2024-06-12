"use client";

import React from "react";
import Datatable from "../components/Datatable";

const columns = [
  {
    title: "Conta",
    key: "comments",
  },
  {
    title: "Descrição",
    key: "description",
  }
];

export default function Accounts() {
  return (
    <div>
      <Datatable
        columns={columns}
        title="Contas"
        label="conta"
        route="accounts"
      />
    </div>
  );
}
