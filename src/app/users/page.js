"use client";

import React from "react";
import Datatable from "../components/Datatable";

export default function Users() {
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
