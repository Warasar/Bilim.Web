import React from "react";
import { Select } from "antd";
import { useEditableCell } from "./UseEditableCell";
import { IObj } from "../ProfileItems/ProfileTable";

export const EditableSprCell: React.FC<{
  value: any;
  record: any;
  col: any;
  onSave: (value: any, record: any, col: any) => void;
  obj: IObj[];
}> = ({ value, record, col, onSave, obj }) => {
  const { value: cellValue, inputRef, handleChange } = useEditableCell(value, record, col, onSave);

  return col.isEdit ? (
    <Select
      showSearch
      placeholder="Выберите из списка"
      filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
      options={obj}
      value={obj.find((f) => f.value === cellValue)}
      disabled={!col.isEdit}
      variant="borderless"
      ref={inputRef}
      onChange={(value: any) => {
        handleChange(value);

        onSave(value, record, col);
      }}
      style={{ width: "calc(100%)" }}
    />
  ) : (
    <div className={"profile-table-cell" + (col.isEdit ? "" : " profile-table-cell-disabled")}>
      <span>{obj.find((f) => f.value === value)?.label}</span>
    </div>
  );
};
