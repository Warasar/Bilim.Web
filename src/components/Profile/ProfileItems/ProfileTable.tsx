import React, { useEffect, useState } from "react";
import { requestGet } from "../../../actions/actions";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

type Props = {
  setLoader: (loader: boolean) => void;
  tableItem: any;
  loader: boolean;
};

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
};

// Более агрессивные настройки против DND попапа
const gridOptions = {
  suppressDragLeaveHidesColumns: true,
  suppressMoveWhenRowDragging: true,
  suppressColumnMoveAnimation: false,
  // Отключаем все возможные элементы, которые могут показывать попапы
  suppressMenuHide: false,
  // Кастомная обработка событий перетаскивания
  onColumnMoved: (event: any) => {
    console.log("Колонка перемещена:", event);
  },
  onColumnVisible: (event: any) => {
    console.log("Видимость колонки изменена:", event);
  },
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

    table?.fields?.forEach((item: any) => {
      item.editable = true;
    });

    setTableColumns(table?.fields);
    setTableData(table?.data);

    console.log("table", table);

    setLoader(false);
  };

  return !loader && tableColumns?.length && tableData?.length ? (
    <div className="ag-theme-alpine profile-table">
      <AgGridReact
        rowData={tableData}
        columnDefs={tableColumns}
        defaultColDef={defaultColDef}
        animateRows={true}
        gridOptions={gridOptions}
        localeText={RussianLocaleText}
      />
    </div>
  ) : null;
}
