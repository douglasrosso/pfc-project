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
  }
];

export default function Users() {
  return (
    <div>
      <Datatable
        columns={columns}
        title="Usuários"
        label="usuario"
        route="users"
      />
    </div>
  );
}
