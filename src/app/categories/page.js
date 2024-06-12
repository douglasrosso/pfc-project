"use client";

import React from "react";
import Datatable from "../components/Datatable";

const columns = [
  {
    title: "Nome da Categoria",
    key: "description",
  },
  {
    title: "Tipo",
    key: "type",
  }
];

export default function Categories() {
  return (
    <main>
      <Datatable
        columns={columns}
        title="Categorias"
        label="categoria"
        route="categories"
      />
    </main>
  );
}
