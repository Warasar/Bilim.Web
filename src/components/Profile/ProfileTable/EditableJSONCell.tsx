import React from "react";
import { useEditableCell } from "./UseEditableCell";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css"; // или 'react18-json-view/src/dark.css'

export const EditableJSONCell: React.FC<{
  value: any;
  record: any;
  col: any;
  onSave: (value: any, record: any, col: any) => void;
}> = ({ value, record, col, onSave }) => {
  const { value: cellValue, handleChange, handleSave } = useEditableCell(value, record, col, onSave);

  return (
    <div
      className={"profile-table-cell" + (col.isEdit ? "" : " profile-table-cell-disabled")}
      style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "6px" }}
    >
      <div style={{}}>
        <JsonView
          src={cellValue}
          theme="vscode"
          displaySize="expanded"
          // enableClipboard
          collapsed={false}
          editable
          onEdit={(edit) => {
            handleChange(edit.newValue);

            setTimeout(() => {
              handleSave();
            }, 50);
          }}
          onDelete={() => {
            handleChange(null);

            setTimeout(() => {
              handleSave();
            }, 50);
          }}
          // collapseStringsAfterLength={80} // Обрезать строки длиннее 80 символов
          style={{
            fontSize: 16,
            fontFamily: "'Fira Code', 'Cascadia Code', monospace",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            lineHeight: 1.5,
            overflow: "auto",
          }}
        />
      </div>
    </div>
  );
};
