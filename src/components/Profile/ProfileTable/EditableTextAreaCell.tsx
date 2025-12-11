import React, { useState } from "react";
import { useEditableCell } from "./UseEditableCell";
import TextArea from "antd/es/input/TextArea";
import { Button } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

export const EditableTextAreaCell: React.FC<{
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

  const [isExpanded, setIsExpanded] = useState(false);

  // Простая проверка: если текст содержит больше 5 переносов строк или очень длинный
  const lineCount = value ? value.split("\n").length : 0;
  const isLongText = value && (lineCount > 5 || value.length > 250);

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const length = e.target.value.length;
    e.target.setSelectionRange(length, length);
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return editing ? (
    <TextArea
      ref={inputRef}
      value={cellValue}
      onChange={(e) => handleChange(e.target.value)}
      onBlur={handleSave}
      onFocus={handleFocus}
      autoSize={isLongText && !isExpanded ? { maxRows: 5 } : {}}
      style={{ width: "100%" }}
      variant="borderless"
    />
  ) : (
    <div
      className={"profile-table-cell" + (col.isEdit ? "" : " profile-table-cell-disabled")}
      onClick={() => (col.isEdit ? handleEdit() : null)}
      style={{ display: "block" }}
    >
      <div
        className="profile-table-cell-text"
        style={{
          maxHeight: isLongText && !isExpanded ? "7.5em" : "none",
          overflow: "hidden",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          lineHeight: "1.5em",
          display: "block",
        }}
      >
        {value}
        {isLongText && !isExpanded && <span style={{ opacity: 0.7 }}>...</span>}
      </div>

      {isLongText && (
        <div style={{ marginTop: 8, textAlign: "center" }}>
          <Button
            type="link"
            size="small"
            icon={isExpanded ? <UpOutlined /> : <DownOutlined />}
            onClick={toggleExpand}
            style={{
              fontSize: "12px",
              padding: 0,
            }}
          >
            {isExpanded ? "Скрыть" : "Раскрыть"}
          </Button>
        </div>
      )}
    </div>
  );
};
