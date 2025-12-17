import React, { useState } from "react";
import { useEditableCell } from "./UseEditableCell";
import { Button, Modal } from "antd";
import { DownOutlined, EditOutlined, SaveOutlined, UpOutlined } from "@ant-design/icons";
import Editor from "@monaco-editor/react";

export const EditableJSONCell: React.FC<{
  value: any;
  record: any;
  col: any;
  onSave: (value: any, record: any, col: any) => void;
}> = ({ value, record, col, onSave }) => {
  const {
    editing,
    value: cellValue,
    handleChange,
    handleEdit,
    handleSave,
    handleCancel,
  } = useEditableCell(value, record, col, onSave);

  const [isExpanded, setIsExpanded] = useState(false);

  // Простая проверка: если текст содержит больше 5 переносов строк или очень длинный
  const lineCount = value ? value.split("\n").length : 0;
  const isLongText = value && (lineCount > 5 || value.length > 250);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={"profile-table-cell" + (col.isEdit ? "" : " profile-table-cell-disabled")}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        gap: "6px",
        padding: "0px 12px",
      }}
    >
      <div style={{ width: "100%" }}>
        <div
          className="profile-table-cell-text"
          style={{
            maxHeight: isLongText && !isExpanded ? "7.5em" : "none",
            overflow: "hidden",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            lineHeight: "1.5em",
            display: "block",
            fontFamily: "monospace",
            padding: "5px 12px",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        >
          {typeof value === "object" ? JSON.stringify(value, null, 2) : value}
        </div>

        {isLongText && (
          <div style={{ margin: "4px 0px", textAlign: "center" }}>
            <Button
              type="link"
              size="small"
              icon={isExpanded ? <UpOutlined /> : <DownOutlined />}
              onClick={toggleExpand}
              style={{
                fontSize: "12px",
                padding: 0,
                outline: "none",
              }}
            >
              {isExpanded ? "Скрыть" : "Раскрыть"}
            </Button>
          </div>
        )}
      </div>

      {col.isEdit && (
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => {
            handleEdit();
          }}
          size="small"
          title="Редактировать"
        />
      )}

      <Modal
        open={editing}
        onCancel={() => handleCancel()}
        footer={false}
        width={"80vw"}
        centered
        title={
          <>
            Редактор: {col.fieldName || col.field}, {record.id} ID
          </>
        }
      >
        <div className="profile-table-modal">
          <Editor
            height="80vh"
            language="json"
            value={cellValue}
            theme="vs-dark"
            onChange={(val) => {
              handleChange(val);
            }}
            options={{
              minimap: { enabled: true },
              fontSize: 14,
              automaticLayout: true,
            }}
          />

          <div className="profile-table-modal-footer">
            <div />
            <Button onClick={() => handleCancel()} type="default">
              Отмена
            </Button>
            <Button icon={<SaveOutlined />} onClick={() => handleSave()} type="primary" iconPosition="end">
              Сохранить
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
