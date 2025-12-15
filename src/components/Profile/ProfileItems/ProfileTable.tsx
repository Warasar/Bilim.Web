import React, { useEffect, useMemo, useState } from "react";
import { requestDelete, requestGet, requestPost, requestPut } from "../../../actions/actions";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import dayjs from "dayjs";
import { Button, ConfigProvider, Input, message, Popconfirm, Space, Table } from "antd";
import { Locale } from "antd/es/locale";
import ruRU from "antd/locale/ru_RU";
import { DeleteOutlined, FilterOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { EditableNumberCell } from "../ProfileTable/EditableNumberCell";
import { EditableVarcharCell } from "../ProfileTable/EditableVarcharCell";
import { EditableTextAreaCell } from "../ProfileTable/EditableTextAreaCell";
import { EditableBoolCell } from "../ProfileTable/EditableBoolCell";
import { EditableDateCell } from "../ProfileTable/EditableDateCell";
import { EditableDateTimeCell } from "../ProfileTable/EditableDateTimeCell";
import _ from "lodash";
import { EditableHTMLCell } from "../ProfileTable/EditableHTMLCell";
import { EditableJSONCell } from "../ProfileTable/EditableJSONCell";
import { EditableSprCell } from "../ProfileTable/EditableSprCell";

require("dayjs/locale/ru");
dayjs.locale("ru");

const customTableLocale = {
  // Пагинация
  items_per_page: "/ страницу",
  jump_to: "Перейти",
  jump_to_confirm: "подтвердить",
  page: "Страница",

  // Пагинатор
  prev_page: "Назад",
  next_page: "Вперед",
  prev_5: "Предыдущие 5",
  next_5: "Следующие 5",
  prev_3: "Предыдущие 3",
  next_3: "Следующие 3",

  // Параметры отображения
  page_size: "размер страницы",
  filter: "Фильтр",
  filter_reset: "Сбросить",
  filter_confirm: "OK",
  filter_empty_text: "Нет данных",
  empty_text: "Нет данных",
  select_all: "Выбрать все",
  select_invert: "Инвертировать выбор",

  // Сортировка
  sort_title: "Сортировка",
  cancel: "Отмена",
  ok: "OK",

  // Загрузка
  loading: "Загрузка...",
};
export const ruLocale: Locale = {
  ...ruRU,
  Table: {
    ...ruRU.Table,
    ...customTableLocale,
  },
};
export type IObj = {
  value: any;
  label: string;
};

type Props = {
  setLoader: (loader: boolean) => void;
  tableItem: any;
  loader: boolean;
};

export default function ProfileTable({ setLoader, tableItem, loader }: Props) {
  const [data, setData] = useState<any>(null);
  const [tableColumns, setTableColumns] = useState<any>(null);
  const [sprs, setSprs] = useState<any>(null);
  const [filteredInfo, setFilteredInfo] = useState<Record<string, any>>({});
  const [sortedInfo, setSortedInfo] = useState<Record<string, any>>({});

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableItem]);

  const getData = async () => {
    setLoader(true);

    const table: any = await requestGet(`admin/table?id=${tableItem.id}`);

    setSprs(table?.sprs);
    setTableColumns(table?.fields);
    setData(table?.data);

    console.log("table", table);

    setLoader(false);
  };

  const getColumns = (data: any[]) => {
    const newColumns: any = [];

    if (tableItem.isEdit) {
      newColumns.push({
        title: "",
        dataIndex: "tools",
        key: "tools",
        width: 80,
        render: (value: any, record: any) => renderTools(value, record),
        defaultSortOrder: null,
      });
    }

    tableColumns?.forEach((item: any) => {
      const column: any = {
        title: item.fieldName || item.field,
        dataIndex: item.field,
        key: item.field,
        sorter: (a: any, b: any) => sorterCol(a, b, item),
        filteredValue: filteredInfo[item.field] || null,
        sortOrder: sortedInfo.field === item.field ? sortedInfo.order : null,
        ellipsis: true,
        render: (value: any, record: any) => renderCell(value, record, item),
        width: item.width
          ? item.width
          : item.dataType === "html"
            ? 300
            : item.dataType === "json"
              ? 600
              : item.dataType === "text"
                ? 300
                : item.dataType === "timestamp"
                  ? 170
                  : 120, // Используем сохраненную ширину или дефолт
        onHeaderCell: () => ({
          style: {
            padding: "12px",
          },
        }),
      };

      // Генерация уникальных значений для фильтров
      const uniqueValues = Array.from(new Set(data.map((record: any) => record[item.field]).filter(Boolean))).sort();

      // Если значений меньше 10, показываем фильтр
      if (uniqueValues.length > 0 && uniqueValues.length < 10) {
        if (item.dataType === "bool") {
          column.filters = [
            {
              text: "Виден",
              value: true,
            },
            {
              text: "Не виден",
              value: false,
            },
          ];
        } else {
          column.filters = uniqueValues.map((value) => ({
            text: String(value),
            value: value,
          }));
        }

        column.filterIcon = (filtered: boolean) => (
          <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        );

        column.onFilter = (value: any, record: any) => {
          return record[item.field] === value;
        };
      } else {
        // Для большого количества значений - поисковый фильтр
        column.filterDropdown = ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Поиск по ${item.fieldName || item.field}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => confirm()}
              style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => confirm()}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Поиск
              </Button>
              <Button onClick={() => clearFilters && clearFilters()} size="small" style={{ width: 90 }}>
                Сбросить
              </Button>
            </Space>
          </div>
        );

        column.filterIcon = (filtered: boolean) => (
          <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        );

        column.onFilter = (value: any, record: any) => {
          const fieldValue = record[item.field];
          if (!fieldValue) return false;
          return fieldValue.toString().toLowerCase().includes(value.toLowerCase());
        };
      }

      newColumns.push(column);
    });

    return newColumns;
  };

  const sorterCol = (a: any, b: any, item: any) => {
    if (item.dataType === "int4" || item.dataType === "decimal" || item.dataType === "bool") {
      return a[item.field] - b[item.field];
    } else if (item.dataType === "date" || item.dataType === "timestamp") {
      if (!a[item.field] && !b[item.field]) return 0;
      if (!a[item.field]) return 1;
      if (!b[item.field]) return -1;
      return dayjs(a[item.field]).unix() - dayjs(b[item.field]).unix();
    }

    return a[item.field]?.localeCompare(b[item.field]);
  };

  // Обработчики фильтрации и сортировки
  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setFilteredInfo(filters);
    setSortedInfo({
      field: sorter.field,
      order: sorter.order,
    });
  };

  // ячейки по типам
  const renderCell = (value: any, record: any, col: any) => {
    if (col.dataType === "int4") {
      return <EditableNumberCell value={value} record={record} col={col} onSave={onSaveTable} />;
    }

    if (col.dataType === "varchar") {
      return <EditableVarcharCell value={value} record={record} col={col} onSave={onSaveTable} />;
    }

    if (col.dataType === "text") {
      return <EditableTextAreaCell value={value} record={record} col={col} onSave={onSaveTable} />;
    }

    if (col.dataType === "bool") {
      return <EditableBoolCell value={value} record={record} col={col} onSave={onSaveTable} />;
    }

    if (col.dataType === "decimal") {
      return <EditableNumberCell value={value} record={record} col={col} onSave={onSaveTable} />;
    }

    if (col.dataType === "date") {
      return <EditableDateCell value={value} record={record} col={col} onSave={onSaveTable} />;
    }

    if (col.dataType === "timestamp") {
      return <EditableDateTimeCell value={value} record={record} col={col} onSave={onSaveTable} />;
    }

    if (col.dataType === "html") {
      return <EditableHTMLCell value={value} record={record} col={col} onSave={onSaveTable} />;
    }

    if (col.dataType === "json") {
      return <EditableJSONCell value={value} record={record} col={col} onSave={onSaveTable} />;
    }

    if (col.dataType === "object") {
      const obj: IObj[] = [];

      sprs[col.spr].forEach((item: any) => {
        obj.push({
          value: item[col.sprCode],
          label: item[col.sprName] + "",
        });
      });

      return <EditableSprCell value={value} record={record} col={col} onSave={onSaveTable} obj={obj} />;
    }

    return <div>{value}</div>;
  };

  // tools
  const renderTools = (value: any, record: any) => {
    return (
      <div className="profile-table-cell">
        <Button
          type="text"
          icon={<PlusOutlined />}
          onClick={() => handleAddRow(record)}
          size="small"
          title="Добавить пустую строку"
        />
        <Popconfirm
          title="Удалить строку?"
          description="Вы уверены, что хотите удалить эту строку?"
          onConfirm={() => handleDeleteRow(record)}
          okText="Да"
          cancelText="Нет"
        >
          <Button type="text" danger icon={<DeleteOutlined />} size="small" title="Удалить" />
        </Popconfirm>
      </div>
    );
  };

  // колонка
  const columns: any = useMemo(
    () => getColumns(data),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, tableColumns, filteredInfo, sortedInfo]
  );

  // сохранение при изменении ячейки
  const onSaveTable = async (value: any, row: any, col: any) => {
    if (value !== row[col.field]) {
      // изменение самой даты
      const newData = _.cloneDeep(data);
      newData.find((f: any) => f.id === row.id)[col.field] = value;
      setData(newData);

      // отправка put для запроса сохранения
      const sendRow = _.cloneDeep(row);

      if (col.dataType === "date" && value) {
        const parts = value.split("-");
        sendRow[col.field] = `${parts[2]}-${parts[1]}-${parts[0]}`;
      } else {
        sendRow[col.field] = value;
      }

      for (const key in sendRow) {
        if (key !== col.field) {
          delete sendRow[key];
        }
      }

      await requestPut(`admin/table?id=${tableItem.id}&rowId=${row.id}`, {
        data: sendRow,
      });
    }
  };

  const handleAddRow = async (row: any) => {
    const newRow: any = _.cloneDeep(row);
    const rowIndex = data.findIndex((f: any) => f.id === row.id);

    for (const key in newRow) {
      newRow[key] = null;
    }

    const newID = await requestPost(`admin/table?id=${tableItem.id}`, {});

    if (newID) {
      newRow.id = newID;

      const newData: any = _.cloneDeep(data);
      newData.splice(rowIndex + 1, 0, newRow);

      setData(newData);
    } else {
      message.error("Произошла ошибка при создании строки");
    }
  };

  const handleDeleteRow = async (row: any) => {
    let newData: any = _.cloneDeep(data);

    newData = data.filter((item: any) => item.id !== row.id);

    await requestDelete(`admin/table?id=${tableItem.id}&rowId=${row.id}`);

    setData(newData);
  };

  return (
    <div className="profile-table">
      <ConfigProvider locale={ruLocale}>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          locale={{
            emptyText: "Нет данных для отображения",
            triggerDesc: "",
            triggerAsc: "",
            cancelSort: "",
          }}
          onChange={handleChange}
          loading={!tableColumns?.length || data?.length}
          scroll={{
            y: `calc(100vh - 210px)`, // Фиксированная высота
          }}
          pagination={false}
          components={{
            body: {
              cell: (props: any) => (
                <td
                  {...props}
                  style={{
                    ...props.style,
                    padding: "0px", // Кастомный padding для ячеек
                  }}
                />
              ),
            },
          }}
        />
      </ConfigProvider>
    </div>
  );
}
