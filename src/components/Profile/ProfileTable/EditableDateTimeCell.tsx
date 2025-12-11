import React from "react";
import { ConfigProvider, DatePicker } from "antd";
import { useEditableCell } from "./UseEditableCell";
import dayjs from "dayjs";
import locale from "antd/locale/ru_RU";

require("dayjs/locale/ru");
dayjs.locale("ru");
const timeFormat = "DD.MM.YYYY HH:mm:ss";

export const EditableDateTimeCell: React.FC<{
  value: any;
  record: any;
  col: any;
  onSave: (value: any, record: any, col: any) => void;
}> = ({ value, record, col, onSave }) => {
  const { value: cellValue, inputRef, handleChange } = useEditableCell(value, record, col, onSave);

  const handleDateChange = (date: any) => {
    handleChange(date && date !== "Invalid Date" ? date : null);

    onSave(date && date !== "Invalid Date" ? date : null, record, col);
  };

  return (
    <div className={"profile-table-cell" + (col.isEdit ? "" : " profile-table-cell-disabled")}>
      <ConfigProvider locale={locale}>
        <DatePicker
          onChange={(value: any) => {
            handleDateChange(dayjs(value).format("YYYY-MM-DDTHH:mm:ss"));
          }}
          ref={inputRef}
          value={cellValue ? dayjs(cellValue) : null}
          picker="date"
          format={timeFormat}
          allowClear={true}
          variant="borderless"
          style={{ width: "100%" }}
          showTime
          disabled={!col.isEdit}
        />
      </ConfigProvider>
    </div>
  );
};
