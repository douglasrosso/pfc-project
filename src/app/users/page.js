"use client";

import React from "react";
import Datatable from "../components/Datatable";

const columns = [
  {
    title: "Nome",
    key: "name",
  },
  {
    title: "E-mail",
    key: "email",
  },
  {
    title: "Usuário",
    key: "user",
  },
  {
    title: "Nível",
    key: "level",
  },
  {
    title: "Status",
    key: "status",
  },
  {
    title: "Ações",
    key: "action",
  },
];

export default function Users() {
  return (
    <main>
      <Datatable
        columns={columns}
        title="Usuários"
        label="usuario"
        route="users"
      />
    </main>
  );
}
