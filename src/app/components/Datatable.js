"use client";

import React, { useRef, useState, useEffect, Fragment } from "react";
import moment from "moment";
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
import { api } from "@/utils/api";

export default function Datatable({
  title,
  columns,
  label,
  route,
  data,
  hideNewButton,
  customFetch,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortedInfo, setSortedInfo] = useState({});
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const isFirstTime = useRef(true);

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

  const handleConfirmClicked = (id) => {
    return () => {
      deleteItem(id);
    };
  };

  function handleNewClicked() {
    router.push(`/${route}/new`);
  }

  const fetchItems = customFetch || defaultFetchItems;

  async function defaultFetchItems() {
    try {
      setLoading(true);
      const response = await api.get(`/api/${route}`);
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
      const response = await api.delete(`/api/${route}/${id}`);
      setLoading(false);
      if(response.data.success) {
        message.success(`${label} excluído(a) com sucesso!`);
        fetchItems();        
      }
    } catch (error) {
      message.error(`Erro ao excluir o(a) ${label}.`);
      setLoading(false);
    }
  }

  const columnsMapped = columns
    .map((column) => {
      return {
        title: column.title,
        dataIndex: column.key,
        key: column.key,
        width: column.width,
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
        sortOrder:
          sortedInfo.columnKey === column.key ? sortedInfo.order : null,
        ellipsis: true,
        ...getColumnSearchProps(column.key),
        render: (text) => {
          if (moment(text, moment.ISO_8601, true).isValid()) {
            return moment(text).format("DD/MM/YYYY");
          }
          return text;
        },
      };
    })
    .concat([
      {
        title: "Ações",
        key: "action",
        width: "5rem",
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
      },
    ]);

  useEffect(() => {
    if (isFirstTime.current && !customFetch) {
      isFirstTime.current = false;
      fetchItems();
    }
  }, [customFetch, isFirstTime, fetchItems]);

  return (
    <Fragment>
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
          dataSource={(data ?? items).map((item) => ({
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
              {!hideNewButton && (
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleNewClicked}
                >
                  Novo
                </Button>
              )}
            </Space>
          )}
        />
      )}
    </Fragment>
  );
}
