import React, { useEffect, useState } from "react";
import { requestGet } from "../../../actions/actions";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import dayjs from "dayjs";
import { Button, ConfigProvider, DatePicker, Popconfirm, Space } from "antd";
import locale from "antd/locale/ru_RU";
import _ from "lodash";
import TextArea from "antd/es/input/TextArea";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

require("dayjs/locale/ru");
dayjs.locale("ru");

const dateFormat = "DD.MM.YYYY";
const timeFormat = "DD.MM.YYYY HH:mm:ss";
// Русская локализация
const RussianLocaleText = {
  // Тексты пагинации
  page: "Страница",
  to: "до",
  of: "из",
  nextPage: "Следующая",
  lastPage: "Последняя",
  firstPage: "Первая",
  previousPage: "Предыдущая",

  // Тексты фильтров
  contains: "Содержит",
  notContains: "Не содержит",
  startsWith: "Начинается с",
  endsWith: "Заканчивается на",
  equals: "Равно",
  notEqual: "Не равно",
  andCondition: "И",
  orCondition: "ИЛИ",
  applyFilter: "Применить",
  clearFilter: "Очистить",
  filterOoo: "Фильтр...",
  blanks: "Пустые",

  // Тексты меню колонок
  pinColumn: "Закрепить колонку",
  pinLeft: "Закрепить слева",
  pinRight: "Закрепить справа",
  noPin: "Не закреплять",
  autosizeThiscolumn: "Авторазмер этой колонки",
  autosizeAllColumns: "Авторазмер всех колонок",
  resetColumns: "Сбросить колонки",
  copy: "Копировать",
  copyWithHeaders: "Копировать с заголовками",
  paste: "Вставить",
  export: "Экспорт",
  csvExport: "Экспорт в CSV",
  excelExport: "Экспорт в Excel",

  // Тексты сортировки
  sortAscending: "Сортировка по возрастанию",
  sortDescending: "Сортировка по убыванию",
  clearSort: "Очистить сортировку",

  // Общие тексты
  loadingOoo: "Загрузка...",
  noRowsToShow: "Нет данных для отображения",
  enabled: "Включено",
};
const defaultColDef = {
  // sortable: true,
  filter: true,
  resizable: true,
  wrapText: true,
  autoHeight: true,
};
// Более агрессивные настройки против DND попапа
const gridOptions = {
  suppressDragLeaveHidesColumns: true,
  suppressMoveWhenRowDragging: true,
  suppressColumnMoveAnimation: false,
  // Отключаем все возможные элементы, которые могут показывать попапы
  suppressMenuHide: false,
  // Отключаем растягивание на всю ширину
  suppressSizeToFit: false, // Разрешить подгонку размера
  // Кастомная обработка событий перетаскивания
  onColumnMoved: (event: any) => {
    console.log("Колонка перемещена:", event);
  },
  onColumnVisible: (event: any) => {
    console.log("Видимость колонки изменена:", event);
  },
};

type IColumn = {
  dataType: string;
  field: string;
  fieldName: string;
  id: number;
  idTable: number;
  isVisible: boolean;
  ord: number;
  editable: boolean;
  headerName: string;
  cellEditor: any;
  cellRenderer: any;
  cellEditorPopup: boolean;
  valueParser: any;
  cellEditorParams: any;
  cellStyle: React.CSSProperties | undefined;
  width: number;
};

type Props = {
  setLoader: (loader: boolean) => void;
  tableItem: any;
  loader: boolean;
};

export default function ProfileTable({ setLoader, tableItem, loader }: Props) {
  const [tableData, setTableData] = useState<any>(null);
  const [tableColumns, setTableColumns] = useState<any>(null);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableItem]);

  const getData = async () => {
    setLoader(true);

    const table: any = await requestGet(`admin/table?id=${tableItem.id}`);

    setTableColumns(table?.fields);
    setTableData(table?.data);

    console.log("table", table);

    setLoader(false);
  };

  useEffect(() => {
    if (tableColumns?.length) getColumns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableData]);

  const getColumns = () => {
    const newColumns = _.cloneDeep(tableColumns);
    if (!tableColumns.some((f: any) => f.field === "actions")) {
      newColumns.unshift({
        field: "actions",
        headerName: "Действия",
        width: 150,
        cellRenderer: ActionsCellRenderer,
        editable: false,
        sortable: false,
        filter: false,
        resizable: false,
      });
    }

    newColumns?.forEach((item: IColumn) => {
      item.editable = true;
      item.headerName = item.fieldName || item.field;

      if (item.dataType === "date") {
        item.cellEditor = DateEditor;
        item.cellRenderer = DateRenderer;
      } else if (item.dataType === "timestamp") {
        item.cellEditor = TimeEditor;
        item.cellRenderer = TimeRenderer;
      } else if (item.dataType === "decimal") {
        item.cellRenderer = DecimalRenderer;
      } else if (item.dataType === "int4") {
        item.cellRenderer = DecimalRenderer;
        item.valueParser = (params: any) => {
          if (params.newValue === null || params.newValue === undefined) {
            return null;
          }

          // Берем только целую часть
          const intValue = Math.trunc(params.newValue);

          // Или округляем
          // const intValue = Math.round(params.newValue);

          return intValue;
        };
        item.cellEditorParams = {
          // Ограничиваем ввод в самом редакторе
          precision: 0, // Без десятичных
          step: 1, // Шаг изменения
          min: 0, // Минимальное значение
        };
      } else if (item.dataType === "text") {
        item.cellEditor = TextEditor;
        item.cellRenderer = TextRenderer;
      } else if (item.dataType === "bool") {
      }
    });

    setTableColumns(newColumns);
  };

  // actions
  const ActionsCellRenderer = (params: any) => {
    const handleDeleteRow = () => {
      params.api.applyTransaction({ remove: [params.node.data] });
    };

    return (
      <Space size="small">
        <Button
          type="text"
          icon={<PlusOutlined />}
          size="small"
          title="Добавить новую строку"
          onClick={() => handleAddRow(params)}
        />
        <Popconfirm title="Удалить строку?" onConfirm={handleDeleteRow} okText="Да" cancelText="Нет">
          <Button type="text" danger icon={<DeleteOutlined />} size="small" title="Удалить" />
        </Popconfirm>
      </Space>
    );
  };

  // date
  const DateEditor = (e: any) => {
    return (
      <ConfigProvider locale={locale}>
        <DatePicker
          onChange={(value: any) => {
            changeValue(dayjs(value).format("YYYY-MM-DD"), e);
          }}
          value={e.value ? dayjs(e.value) : null}
          picker="date"
          format={dateFormat}
          allowClear={true}
          className="profile-table-cell"
        />
      </ConfigProvider>
    );
  };
  const DateRenderer = ({ value }: any) => {
    if (!value) return null;

    return <span>{dayjs(value).format(dateFormat)}</span>;
  };

  // timestamp
  const TimeEditor = (e: any) => {
    return (
      <ConfigProvider locale={locale}>
        <DatePicker
          onChange={(value: any) => {
            changeValue(dayjs(value).format("YYYY-MM-DDTHH:mm:ss"), e);
          }}
          value={e.value ? dayjs(e.value) : null}
          picker="date"
          format={timeFormat}
          allowClear={true}
          className="profile-table-cell"
          showTime
        />
      </ConfigProvider>
    );
  };
  const TimeRenderer = ({ value }: any) => {
    if (!value) return null;

    return <span>{dayjs(value).format(timeFormat)}</span>;
  };

  // decimal int4
  const DecimalRenderer = ({ value }: any) => {
    return <span>{value?.toLocaleString()}</span>;
  };

  // text
  const TextEditor = (params: any) => {
    const [value, setValue] = useState(params.value || "");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setValue(newValue);

      const newHeight = e.currentTarget.style.height.length
        ? Number(e.currentTarget.style.height.replace("px", "")) > 42
          ? Number(e.currentTarget.style.height.replace("px", ""))
          : 42
        : 42;

      params.node.setRowHeight(newHeight);
      params.api.onRowHeightChanged();
    };

    return (
      <TextArea
        placeholder="Напишите что нибудь"
        onBlur={() => {
          changeValue(value, params);
        }}
        onChange={handleChange}
        defaultValue={value}
        autoSize
        variant="borderless"
      />
    );
  };
  const TextRenderer = ({ value }: any) => {
    if (!value) return null;

    return <div className="profile-table-cell-text">{value}</div>;
  };

  // add
  const handleAddRow = (params: any) => {
    const newRow = _.cloneDeep(tableData[0]);

    let newId = 0;
    tableData.forEach((item: any) => {
      if (item.id >= newId) {
        newId = item.id + 1;
      }
    });

    for (const key in newRow) {
      if (key === "id") {
        newRow[key] = newId;
      } else if (key === "ord") {
        newRow[key] =
          params.rowIndex < tableData.length - 1
            ? tableData[params.rowIndex + 1][key]
            : tableData[params.rowIndex][key] + 10;
      } else {
        newRow[key] = null;
      }
    }

    const newData: any = _.cloneDeep(tableData);
    newRow.ord = newData.forEach((item: any, index: number) => {
      if (index > params.rowIndex) {
        item.ord = index < tableData.length - 1 ? tableData[index + 1].ord : tableData[index].ord + 10;
      }
    });

    setTableData(newData);
  };

  const changeValue = (value: any, e: any) => {
    const newData = _.cloneDeep(tableData);
    newData.find((f: any) => f.id === e.data.id)[e.colDef.field] = value;

    setTableData(newData);
  };

  // запрос на изменение даты
  const changeData = async (newData: any) => {};

  return !loader && tableColumns?.length && tableData?.length ? (
    <div className="ag-theme-alpine profile-table">
      <AgGridReact
        rowData={tableData}
        columnDefs={tableColumns}
        defaultColDef={defaultColDef}
        animateRows={true}
        gridOptions={gridOptions}
        localeText={RussianLocaleText}
        onCellValueChanged={(params: any) => {
          if (
            params.colDef.dataType === "decimal" ||
            params.colDef.dataType === "bool" ||
            params.colDef.dataType === "int4" ||
            params.colDef.dataType === "varchar"
          ) {
            changeValue(params.newValue, params);
          }
        }}
      />
    </div>
  ) : null;
}
