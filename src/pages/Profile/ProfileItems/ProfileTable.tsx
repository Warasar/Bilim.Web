import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { EditableDownloadCell } from "../ProfileTable/EditableDownloadCell";
import { Resizable } from "react-resizable";
import { EditableImageCell } from "../ProfileTable/EditableImageCell";

require("dayjs/locale/ru");
dayjs.locale("ru");

const ExcelJS = require("exceljs");

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
const ResizableTitle = (props: any) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
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
  const [filteredData, setFilteredData] = useState<any>(null);
  const [resizedWidths, setResizedWidths] = useState<Record<string, number>>({});

  const lastResizeRef = useRef<{ field: string; width: number } | null>(null);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableItem]);

  const getData = async () => {
    setLoader(true);

    const table: any = await requestGet(`admin/table?id=${tableItem.id}`);

    setSprs(table?.sprs);
    setTableColumns(table?.fields?.filter((f: any) => f.isVisible));
    setData(table?.data);

    setLoader(false);
  };

  const handleResize = useCallback(
    (field: string) =>
      (e: any, { size }: any) => {
        // Сразу обновляем визуальную ширину для отображения
        setResizedWidths((prev) => ({
          ...prev,
          [field]: size.width,
        }));

        // Сохраняем последнее изменение
        lastResizeRef.current = { field, width: size.width };

        if (lastResizeRef.current) {
          const { field, width } = lastResizeRef.current;

          setTableColumns((prev: any) => {
            const newColumns = _.cloneDeep(prev);
            const column = newColumns.find((f: any) => f.field === field);
            if (column) {
              column.width = width;
            }
            return newColumns;
          });

          lastResizeRef.current = null;
        }
      },
    []
  );

  // Сохраняем ресайзнутые ширины при изменении tableColumns
  useEffect(() => {
    if (tableColumns) {
      const widths: Record<string, number> = {};
      tableColumns.forEach((col: any) => {
        if (col.width) {
          widths[col.field] = col.width;
        }
      });
      setResizedWidths(widths);
    }
  }, [tableColumns]);

  const getColumns = useCallback(
    (data: any[]) => {
      const newColumns: any = [];

      if (tableItem.isEdit) {
        const width = resizedWidths["tools"] || 80;

        newColumns.push({
          title: "",
          dataIndex: "tools",
          key: "tools",
          width: width,
          render: (value: any, record: any) => renderTools(value, record),
          defaultSortOrder: null,
          onHeaderCell: () => ({
            style: {
              padding: "12px",
            },
            width: width,
            onResize: handleResize("tools"),
          }),
        });
      }

      tableColumns?.forEach((item: any) => {
        const width = resizedWidths[item.field] || item.width || 120;

        const column: any = {
          title: item.fieldName || item.field,
          dataIndex: item.field,
          key: item.field,
          sorter: (a: any, b: any) => sorterCol(a, b, item),
          filteredValue: filteredInfo[item.field] || null,
          sortOrder: sortedInfo.field === item.field ? sortedInfo.order : null,
          ellipsis: true,
          render: (value: any, record: any) => renderCell(value, record, item),
          width: width,
          onHeaderCell: () => ({
            style: {
              padding: "12px",
            },
            width: width,
            onResize: handleResize(item.field),
          }),
        };

        // Генерация уникальных значений для фильтров
        const uniqueValues = Array.from(new Set(data.map((record: any) => record[item.field]).filter(Boolean))).sort();

        // Если значений меньше 10, показываем фильтр
        if (uniqueValues.length > 0 && uniqueValues.length < 10) {
          if (item.dataType === "bool") {
            column.filters = [
              {
                text: "Да",
                value: true,
              },
              {
                text: "Нет",
                value: false,
              },
            ];
          } else if (item.dataType === "object") {
            const obj: IObj[] = [];

            sprs[item.spr].forEach((spr: any) => {
              obj.push({
                value: spr[item.sprCode],
                label: spr[item.sprName] + "",
              });
            });

            column.filters = uniqueValues.map((value) => ({
              text: obj.find((f) => f.value === value)?.label,
              value: value,
            }));
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
          column.filterDropdown = ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
            <div style={{ padding: 8 }}>
              <Input
                placeholder={`Поиск по ${item.fieldName?.toLowerCase() || item.field?.toLowerCase()}`}
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => {
                  confirm();
                }}
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
                <Button
                  onClick={() => {
                    if (clearFilters) {
                      clearFilters();
                      confirm();
                    }
                  }}
                  size="small"
                  style={{ width: 90 }}
                >
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

            if (item.dataType === "object" || Array.isArray(fieldValue)) {
              const dictionary: any[] = [];

              sprs[item.spr].forEach((sprItem: any) => {
                dictionary.push({
                  value: sprItem[item.sprCode],
                  label: sprItem[item.sprName] + "",
                });
              });

              const foundItem = dictionary.filter((item: any) =>
                String(item.label || "")
                  .toLowerCase()
                  .includes(String(value).toLowerCase())
              );

              return foundItem.some((f) => f.value === fieldValue);
            }

            // Обычная логика для других типов
            return String(fieldValue || "")
              .toLowerCase()
              .includes(String(value).toLowerCase());
          };
        }

        newColumns.push(column);
      });

      return newColumns;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleResize, tableColumns, filteredInfo, sortedInfo, resizedWidths, data]
  );

  const sorterCol = (a: any, b: any, item: any) => {
    if (item.dataType === "int4" || item.dataType === "decimal" || item.dataType === "bool") {
      return a[item.field] - b[item.field];
    } else if (item.dataType === "date" || item.dataType === "timestamp") {
      if (!a[item.field] && !b[item.field]) return 0;
      if (!a[item.field]) return 1;
      if (!b[item.field]) return -1;

      return dayjs(a[item.field]).unix() - dayjs(b[item.field]).unix();
    } else if (item.dataType === "object") {
      const dictionary: any[] = [];

      sprs[item.spr].forEach((sprItem: any) => {
        dictionary.push({
          value: sprItem[item.sprCode],
          label: sprItem[item.sprName] + "",
        });
      });

      const itemA = dictionary.find((f) => f.value === a[item.field]);
      const itemB = dictionary.find((f) => f.value === b[item.field]);

      return itemA.label?.localeCompare(itemB.label);
    }

    return a[item.field]?.localeCompare(b[item.field]);
  };

  // Обработчики фильтрации и сортировки
  const handleChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    setFilteredData(extra.currentDataSource);
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

      sprs[col.spr]
        .filter((f: any) => f.isVisible)
        .forEach((item: any) => {
          obj.push({
            value: item[col.sprCode],
            label: item[col.sprName] + "",
          });
        });

      return <EditableSprCell value={value} record={record} col={col} onSave={onSaveTable} obj={obj} />;
    }

    if (col.dataType === "download") {
      return <EditableDownloadCell value={value} record={record} col={col} setLoader={setLoader} />;
    }

    if (col.dataType === "image") {
      return <EditableImageCell value={value} record={record} col={col} onSave={onSaveTable} />;
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

  const handleAddRow = async (row?: any) => {
    if (row) {
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
    } else {
      const newRow: any = {};

      tableColumns.forEach((col: any) => {
        newRow[col.field] = null;
      });

      const newID = await requestPost(`admin/table?id=${tableItem.id}`, {});

      if (newID) {
        newRow.id = newID;

        const newData: any = _.cloneDeep(data);

        newData.push(newRow);

        setData(newData);
      } else {
        message.error("Произошла ошибка при создании строки");
      }
    }
  };

  const handleDeleteRow = async (row: any) => {
    let newData: any = _.cloneDeep(data);

    newData = data.filter((item: any) => item.id !== row.id);

    await requestDelete(`admin/table?id=${tableItem.id}&rowId=${row.id}`);

    setData(newData);
  };

  // render Пустой
  const emptyRender = () => {
    return (
      <div className="profile-table-empty">
        <div className="profile-table-empty-text">Нет данных для отображения :{`(`}</div>
        {tableItem.isEdit ? (
          <div className="profile-table-empty-button">
            <Button icon={<PlusOutlined />} type="primary" iconPosition="end" onClick={() => handleAddRow()}>
              Добавить пустую строку
            </Button>
          </div>
        ) : null}
      </div>
    );
  };

  // excel
  const exportExcelFile = async () => {
    //----начало----------------
    const excelName = `${tableItem?.tableTitle}`;
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(excelName);

    //----стили-----------------
    const borderStyleHeader = {
      top: {
        style: "thin",
        color: { argb: "A9B6BD" },
      },
      left: {
        style: "thin",
        color: { argb: "A9B6BD" },
      },
      bottom: {
        style: "thin",
        color: { argb: "A9B6BD" },
      },
      right: {
        style: "thin",
        color: { argb: "A9B6BD" },
      },
    };
    const fillHeader = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D3D3D3" },
    };
    const font = {
      color: { argb: "333333" },
    };

    sheet.columns = getCols();

    // -------добавляю хедер в ексель данные----
    const header = getHeader();
    sheet.getRow(1).values = header;

    const row = sheet.getRow(1);
    row.eachCell((cell: any) => {
      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: "true",
      };
      cell.border = borderStyleHeader;
      cell.fill = fillHeader;
      cell.font = font;
    });

    //-------создание даты-----------------------
    const mainData: any = filteredData?.length ? filteredData : data;

    //-------добавление строк------------------
    const excelData: any = [];

    mainData.forEach((row: any) => {
      const values: any = [];

      tableColumns.forEach((col: any) => {
        if (
          col.dataType === "int4" ||
          col.dataType === "varchar" ||
          col.dataType === "text" ||
          col.dataType === "decimal"
        ) {
          values.push(row[col.field]);
        } else if (col.dataType === "bool") {
          values.push(row[col.field] ? "Да" : "Нет");
        } else if (col.dataType === "date") {
          values.push(row[col.field] ? dayjs(row[col.field]).format("DD.MM.YYYY") : null);
        } else if (col.dataType === "timestamp") {
          values.push(row[col.field] ? dayjs(row[col.field]).format("DD.MM.YYYY HH:mm:ss") : null);
        } else if (col.dataType === "html") {
          values.push(htmlToRichText(row[col.field]));
        } else if (col.dataType === "json") {
          values.push(typeof row[col.field] === "object" ? JSON.stringify(row[col.field], null, 2) : row[col.field]);
        } else if (col.dataType === "object") {
          const obj: IObj[] = [];

          sprs[col.spr].forEach((item: any) => {
            obj.push({
              value: item[col.sprCode],
              label: item[col.sprName] + "",
            });
          });

          values.push(obj.find((f) => f.value === row[col.field])?.label);
        } else if (col.dataType === "download") {
          values.push(`"Файл"`);
        } else if (col.dataType === "image") {
          values.push(`"Тут картинка)"`);
        } else {
          values.push(row[col.field]);
        }
      });

      excelData.push(values);
    });

    excelData.forEach((item: any, index: number) => {
      sheet.getRow(index + 2).values = excelData[index];
      const row: any = sheet.getRow(index + 2);

      row.eachCell((cell: any) => {
        cell.alignment = {
          vertical: "middle",
          wrapText: "true",
        };
      });
    });

    //-----я хз че он делает--------------------
    sheet.properties.outlineProperties = {
      summaryBelow: false,
      summaryRight: false,
    };

    //-----выгрузка-----------------------------
    workbook.xlsx.writeBuffer().then(function (data: any) {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${excelName}.xlsx`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  const getCols = () => {
    const newHead: any[] = [];

    tableColumns.forEach((item: any) => {
      const width = resizedWidths[item.field] / 10 || item.width / 10 || 15;

      newHead.push({
        key: item.field,
        width: width,
      });
    });

    return newHead;
  };

  const getHeader = () => {
    const newHead: any[] = [];

    tableColumns.forEach((item: any) => {
      newHead.push(item.fieldName);
    });

    return newHead;
  };

  // Функция для преобразования HTML с поддержкой всех тегов
  const htmlToRichText = (htmlString: string) => {
    if (!htmlString || typeof htmlString !== "string") {
      return htmlString;
    }

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;

    const richText: any[] = [];
    let listLevel = 0;
    let listItemNumber = 0;
    let isOrderedList = false;

    const processNode = (node: any, currentStyle = {}) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent.trim();
        if (text) {
          // Добавляем маркеры для списков
          let prefix = "";
          if (listLevel > 0 && node.parentElement?.tagName === "LI") {
            if (isOrderedList) {
              listItemNumber++;
              prefix = `${listItemNumber}. `;
            } else {
              prefix = "• ";
            }
          }

          richText.push({
            text: prefix + text,
            font: { ...currentStyle },
          });
        }
        return;
      }

      if (node.nodeType !== Node.ELEMENT_NODE) return;

      const tagName = node.tagName.toLowerCase();
      const className = node.className || "";
      const newStyle: any = { ...currentStyle };

      // Обработка структурных тегов
      switch (tagName) {
        case "p":
          processChildNodes(node, newStyle);
          richText.push({ text: "\n", font: newStyle });
          return;

        case "br":
          richText.push({ text: "\n", font: newStyle });
          return;

        case "div":
          processChildNodes(node, newStyle);
          richText.push({ text: "\n", font: newStyle });
          return;

        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          newStyle.bold = true;
          newStyle.size = Math.max(12, 16 - parseInt(tagName[1]) * 2);
          processChildNodes(node, newStyle);
          richText.push({ text: "\n", font: newStyle });
          return;

        case "ul":
        case "ol":
          const wasInList = listLevel > 0;
          listLevel++;
          isOrderedList = tagName === "ol";
          listItemNumber = 0;

          if (!wasInList && richText.length > 0) {
            richText.push({ text: "\n", font: newStyle });
          }

          processChildNodes(node, newStyle);

          listLevel--;
          // if (!wasInList) {
          //   richText.push({ text: "\n", font: newStyle });
          // }
          return;

        case "li":
          processChildNodes(node, newStyle);
          // if (node.nextElementSibling) {
          //   richText.push({ text: "\n", font: newStyle });
          // }
          return;

        case "hr":
          let lineChar = "_"; // По умолчанию сплошная линия
          let lineLength = 30;

          // Определяем тип линии по классу
          if (className.includes("__se__solid")) {
            lineChar = "_"; // Сплошная линия
          } else if (className.includes("__se__dashed")) {
            lineChar = "‒"; // Пунктирная линия
          } else if (className.includes("__se__dotted")) {
            lineChar = "┄"; // Точечная линия
          } else if (className.includes("__se__double")) {
            lineChar = "═"; // Двойная линия
          } else if (className.includes("__se__wave")) {
            lineChar = "∿"; // Волнистая линия
          }

          // Определяем длину линии по стилям
          if (node.style.width) {
            const width = parseInt(node.style.width);
            if (!isNaN(width)) {
              lineLength = Math.min(width / 8, 100); // Примерная конвертация
            }
          }

          // Определяем цвет линии
          if (node.style.color) {
            newStyle.color = { argb: cssColorToHex(node.style.color) };
          } else if (node.style.borderColor) {
            newStyle.color = { argb: cssColorToHex(node.style.borderColor) };
          }

          richText.push({ text: lineChar.repeat(lineLength) + "\n", font: newStyle });
          return;

        case "blockquote":
          if (richText.length > 0) {
            richText.push({ text: "\n", font: newStyle });
          }
          newStyle.italic = true;
          richText.push({ text: "« ", font: newStyle });
          processChildNodes(node, newStyle);
          richText.push({ text: " »", font: newStyle });
          richText.push({ text: "\n", font: newStyle });
          return;

        case "pre":
          if (richText.length > 0) {
            richText.push({ text: "\n", font: newStyle });
          }
          newStyle.name = "Courier New";
          processChildNodes(node, newStyle);
          richText.push({ text: "\n", font: newStyle });
          return;
      }

      // Обработка текстового форматирования
      switch (tagName) {
        case "strong":
        case "b":
          newStyle.bold = true;
          break;

        case "em":
        case "i":
          newStyle.italic = true;
          break;

        case "u":
          newStyle.underline = true;
          break;

        case "s":
        case "strike":
        case "del":
          newStyle.strike = true;
          break;

        case "sup":
          newStyle.vertAlign = "superscript";
          break;

        case "sub":
          newStyle.vertAlign = "subscript";
          break;

        case "mark":
          newStyle.color = { argb: "FFFFFF00" }; // Желтый фон
          break;

        case "small":
          newStyle.size = (newStyle.size || 11) - 2;
          break;

        case "big":
          newStyle.size = (newStyle.size || 11) + 2;
          break;

        case "code":
          if (node.parentElement?.tagName !== "PRE") {
            newStyle.name = "Courier New";
          }
          break;

        case "span":
          if (node.style.color) {
            newStyle.color = { argb: cssColorToHex(node.style.color) };
          }
          if (node.style.fontWeight === "bold" || parseInt(node.style.fontWeight) >= 600) {
            newStyle.bold = true;
          }
          if (node.style.fontStyle === "italic") {
            newStyle.italic = true;
          }
          if (node.style.textDecoration.includes("underline")) {
            newStyle.underline = true;
          }
          if (node.style.textDecoration.includes("line-through")) {
            newStyle.strike = true;
          }
          if (node.style.verticalAlign === "super") {
            newStyle.vertAlign = "superscript";
          }
          if (node.style.verticalAlign === "sub") {
            newStyle.vertAlign = "subscript";
          }
          if (node.style.backgroundColor) {
            newStyle.bgColor = { argb: cssColorToHex(node.style.backgroundColor) };
          }
          if (node.style.fontSize) {
            const size = parseInt(node.style.fontSize);
            if (!isNaN(size)) {
              newStyle.size = size;
            } else if (node.style.fontSize.includes("px")) {
              const pxSize = parseInt(node.style.fontSize);
              if (!isNaN(pxSize)) {
                // Примерная конвертация px в pt (примерно 0.75 ratio)
                newStyle.size = Math.round(pxSize * 0.75);
              }
            } else if (node.style.fontSize.includes("em")) {
              const emSize = parseFloat(node.style.fontSize);
              if (!isNaN(emSize)) {
                // em в pt (базовый размер ~11pt)
                newStyle.size = Math.round(11 * emSize);
              }
            } else if (node.style.fontSize.includes("rem")) {
              const remSize = parseFloat(node.style.fontSize);
              if (!isNaN(remSize)) {
                // rem в pt (базовый размер ~11pt)
                newStyle.size = Math.round(11 * remSize);
              }
            } else if (node.style.fontSize.includes("pt")) {
              const ptSize = parseInt(node.style.fontSize);
              if (!isNaN(ptSize)) {
                newStyle.size = ptSize;
              }
            }
          }

          break;
      }

      processChildNodes(node, newStyle);
    };

    const processChildNodes = (parent: any, style: any) => {
      Array.from(parent.childNodes).forEach((child) => {
        processNode(child, style);
      });
    };

    // Вспомогательная функция для преобразования цвета
    const cssColorToHex = (color: string) => {
      // Простая конвертация основных цветов
      const colorMap: any = {
        red: "FFFF0000",
        blue: "FF0000FF",
        green: "FF008000",
        black: "FF000000",
        white: "FFFFFFFF",
        gray: "FF808080",
        grey: "FF808080",
        silver: "FFC0C0C0",
        maroon: "FF800000",
        purple: "FF800080",
        fuchsia: "FFFF00FF",
        lime: "FF00FF00",
        olive: "FF808000",
        yellow: "FFFFFF00",
        navy: "FF000080",
        teal: "FF008080",
        aqua: "FF00FFFF",
      };

      if (colorMap[color.toLowerCase()]) {
        return colorMap[color.toLowerCase()];
      }

      // Для hex и rgb цветов
      const ctx: any = document.createElement("canvas").getContext("2d");
      ctx.fillStyle = color;
      const hex = ctx.fillStyle;
      return "FF" + hex.slice(1); // Добавляем alpha канал
    };

    // Начальная обработка
    processChildNodes(tempDiv, {});

    // Убираем лишние переносы в начале и конце
    while (richText.length > 0 && richText[0].text === "\n") {
      richText.shift();
    }
    while (richText.length > 0 && richText[richText.length - 1].text === "\n") {
      richText.pop();
    }

    return richText.length > 0 ? { richText } : tempDiv.textContent || "";
  };

  return (
    <div className="profile-table-container">
      <div className="profile-table-buttons">
        <div />

        <div
          className="profile-table-button-excel"
          title="Скачать Excel"
          onClick={() => exportExcelFile()}
          style={{ marginRight: "-0.25vw", width: "1.6vw", height: "1.6vw" }}
        />
      </div>

      <div className="profile-table">
        <ConfigProvider locale={ruLocale}>
          <Table
            columns={columns}
            dataSource={data}
            bordered
            locale={{
              emptyText: emptyRender(),
              triggerDesc: "",
              triggerAsc: "",
              cancelSort: "",
            }}
            rowClassName={() => "profile-table-row"}
            onChange={handleChange}
            scroll={{
              y: `calc(100vh - ${data?.length > 20 ? "290px" : "240px"})`,
            }}
            pagination={
              data?.length > 20
                ? {
                    pageSize: 20,
                    showSizeChanger: false,
                    showTotal: (total, range) => `${range[0]}-${range[1]} из ${total} записей`,
                  }
                : false
            }
            loading={data && columns ? false : true}
            components={{
              body: {
                cell: (props: any) => (
                  <td
                    {...props}
                    style={{
                      ...props.style,
                      padding: "0px",
                    }}
                  />
                ),
              },
              header: {
                cell: ResizableTitle,
              },
            }}
          />
        </ConfigProvider>
      </div>
    </div>
  );
}
