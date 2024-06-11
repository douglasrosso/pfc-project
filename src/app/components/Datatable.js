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
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useRouter } from "next/navigation";

export default function Datatable({ title, columns, label, route }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortedInfo, setSortedInfo] = useState({});
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleTableChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

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
          placeholder={`Busque por ${dataIndex}`}
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
            Buscar
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
            Limpar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            fechar
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
    fetchItems();
  }, []);

  const handleConfirmClicked = (id) => {
    return () => {
      deleteItem(id);
    };
  };

  function handleNewClicked() {
    router.push(`/${route}/new`);
  }

  async function fetchItems() {
    try {
      const response = await axios.get(`/api/${route}`);
      setItems(response.data.data);
      setLoading(false);
    } catch (error) {
      message.error("Erro ao carregar a lista.");
      setLoading(false);
    }
  }

  async function deleteItem(id) {
    try {
      setLoading(true);
      await axios.delete(`/api/${route}/${id}`);
      message.success(`${label} excluído(a) com sucesso!`);
      setLoading(false);
      fetchItems();
    } catch (error) {
      message.error(`Erro ao excluir o(a) ${label}.`);
      setLoading(false);
    }
  }

  const columnsMapped = columns.map((column) => {
    if (column.key === "action") {
      return {
        title: "Ações",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Tooltip placement="left" title={`Editar ${label}`}>
              <a href={`/${route}/${record._id}`}>
                <EditOutlined />
              </a>
            </Tooltip>
            <Popconfirm
              title={`Excluir ${label}`}
              description={`Você tem certeza que deseja excluir o(a) ${label}?`}
              onConfirm={handleConfirmClicked(record._id)}
              okText="Sim"
              cancelText="Não"
            >
              <Tooltip placement="right" title={`Excluir ${label}`}>
                <a>
                  <DeleteOutlined style={{ color: "red" }} />
                </a>
              </Tooltip>
            </Popconfirm>
          </Space>
        ),
      };
    }
    return {
      title: column.title,
      dataIndex: column.key,
      key: column.key,
      sorter: (a, b) => {
        if (
          typeof a[column.key] === "string" &&
          typeof b[column.key] === "string"
        ) {
          return a[column.key].localeCompare(b[column.key]);
        } else if (
          typeof a[column.key] === "number" &&
          typeof b[column.key] === "number"
        ) {
          return a[column.key] - b[column.key];
        }
        return 0;
      },
      sortOrder: sortedInfo.columnKey === column.key ? sortedInfo.order : null,
      ellipsis: true,
      ...getColumnSearchProps(column.key),
    };
  });

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
          columns={columnsMapped}
          dataSource={items.map((item) => ({
            ...item,
            key: item._id,
          }))}
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
                {title}
              </Typography.Title>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleNewClicked}
              >
                Novo
              </Button>
            </Space>
          )}
        />
      )}
    </main>
  );
}
