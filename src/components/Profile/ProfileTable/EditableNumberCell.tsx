import React from "react";
import { InputNumber } from "antd";
import { useEditableCell } from "./UseEditableCell";

export const EditableNumberCell: React.FC<{
  value: any;
  record: any;
  col: any;
  onSave: (value: any, record: any, col: any) => void;
}> = ({ value, record, col, onSave }) => {
  const {
    editing,
    value: cellValue,
    inputRef,
    handleEdit,
    handleSave,
    handleChange,
  } = useEditableCell(value, record, col, onSave);

  return editing ? (
    <InputNumber
      ref={inputRef}
      value={cellValue}
      onChange={handleChange}
      onBlur={handleSave}
      style={{ width: "100%" }}
      variant="borderless"
      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
      parser={(value) => value!.replace(/\s/g, "").replace(",", ".")}
      controls={false}
    />
  ) : (
    <div
      className={"profile-table-cell" + (col.isEdit ? "" : " profile-table-cell-disabled")}
      onClick={() => (col.isEdit ? handleEdit() : null)}
    >
      <span>{new Intl.NumberFormat("ru-RU").format(value)}</span>
    </div>
  );
};
