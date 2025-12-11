import React from "react";
import { Switch } from "antd";
import { useEditableCell } from "./UseEditableCell";

export const EditableBoolCell: React.FC<{
  value: any;
  record: any;
  col: any;
  onSave: (value: any, record: any, col: any) => void;
}> = ({ value, record, col, onSave }) => {
  const { value: cellValue, inputRef, handleChange } = useEditableCell(value, record, col, onSave);

  const handleSwitchChange = (checked: boolean) => {
    handleChange(checked);
    onSave(checked, record, col);
  };

  return (
    <div className={"profile-table-cell" + (col.isEdit ? "" : " profile-table-cell-disabled")}>
      <Switch
        ref={inputRef}
        checked={cellValue}
        onChange={handleSwitchChange}
        checkedChildren="Виден"
        unCheckedChildren="Не виден"
        disabled={!col.isEdit}
      />
    </div>
  );
};
