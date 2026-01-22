import React from "react";
import { Input } from "antd";
import { useEditableCell } from "./UseEditableCell";

const EditableVarcharCell: React.FC<{
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
    <Input
      ref={inputRef}
      value={cellValue}
      onChange={(e) => handleChange(e.target.value)}
      onPressEnter={handleSave}
      onBlur={handleSave}
      style={{ width: "100%" }}
      variant="borderless"
    />
  ) : (
    <div
      className={"profile-table-cell" + (col.isEdit ? "" : " profile-table-cell-disabled")}
      onClick={() => (col.isEdit ? handleEdit() : null)}
    >
      <span>{value}</span>
    </div>
  );
};

export default EditableVarcharCell;
