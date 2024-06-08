"use client";

import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import {
  Spin,
  message,
  Table,
  Typography,
  Space,
  Popconfirm,
  Tooltip,
  Button,
  Input,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useRouter } from "next/navigation";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortedInfo, setSortedInfo] = useState({});
  const router = useRouter();
  const handleTableChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              if (clearFilters) handleReset(clearFilters);
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
              close();
            }}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleConfirmClicked = (id) => {
    return () => {
      deleteCategory(id);
    };
  };

  async function fetchCategories() {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data.data);
      setLoading(false);
    } catch (error) {
      message.error("Erro ao carregar as categorias.");
      setLoading(false);
    }
  }

  async function deleteCategory(id) {
    try {
      setLoading(true);
      await axios.delete(`/api/categories/${id}`);
      message.success("Categoria excluída com sucesso!");
      setLoading(false);
      fetchCategories();
    } catch (error) {
      message.error("Erro ao excluir a categoria.");
      setLoading(false);
    }
  }

  const columns = [
    {
      title: "Nome da Categoria",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.length - b.description.length,
      sortOrder:
        sortedInfo.columnKey === "description" ? sortedInfo.order : null,
      ellipsis: true,
      ...getColumnSearchProps("description"),
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => a.type.length - b.type.length,
      sortOrder: sortedInfo.columnKey === "type" ? sortedInfo.order : null,
      ellipsis: true,
      ...getColumnSearchProps("type"),
    },
    {
      title: "Ações",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Editar Categoria">
            <a href={"/categorias/" + record._id}>
              <EditOutlined />
            </a>
          </Tooltip>
          <Popconfirm
            title="Excluir categoria"
            description="Você tem certeza que deseja excluir a categoria?"
            onConfirm={handleConfirmClicked(record._id)}
            okText="Sim"
            cancelText="Não"
          >
            <Tooltip title="Excluir Categoria">
              <a color="danger">
                <DeleteOutlined />
              </a>
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleButtonClicked = () => {
    router.push("/categorias/novo");
  };

  return (
    <main>
      {loading ? (
        <Spin
          size="large"
          style={{ justifyContent: "center", display: "flex" }}
        />
      ) : (
        <Table
          sticky
          onChange={handleTableChange}
          loading={loading}
          columns={columns}
          dataSource={categories}
          title={() => (
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography.Title
                level={2}
                style={{
                  marginBottom: 20,
                }}
              >
                Lista de Categorias
              </Typography.Title>
              <Button onClick={handleButtonClicked}>Novo</Button>
            </Space>
          )}
        />
      )}
    </main>
  );
}
