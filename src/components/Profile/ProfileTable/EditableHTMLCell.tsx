import React, { useState } from "react";
import { useEditableCell } from "./UseEditableCell";
import { Button, Modal } from "antd";
import { DownOutlined, EditOutlined, SaveOutlined, UpOutlined } from "@ant-design/icons";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const buttonSunEditor = [
  ["font", "fontSize"],
  ["fontColor", "hiliteColor"],
  ["bold", "underline", "italic", "strike", "subscript", "superscript"],
  ["align", "horizontalRule", "list", "lineHeight"],
];

export const EditableHTMLCell: React.FC<{
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
      <div>
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
          dangerouslySetInnerHTML={{
            __html: value,
          }}
        />

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
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => handleEdit()}
        size="small"
        disabled={!col.isEdit}
        title="Редактировать"
      />

      <Modal
        open={editing}
        onCancel={() => handleCancel()}
        footer={false}
        width={"70vw"}
        title={
          <>
            Редактор: {col.fieldName || col.field}, {record.id} ID
          </>
        }
      >
        <div className="profile-table-modal">
          <SunEditor
            lang="ru"
            setDefaultStyle="font-family: 'Roboto'; font-size: 16px;"
            setContents={cellValue}
            autoFocus={false}
            setOptions={{
              buttonList: buttonSunEditor,
              font: ["Roboto", "Manrope"],
              fontSizeUnit: "px",
              height: "auto",
              minHeight: "200",
              maxHeight: "600",
              resizingBar: false,
            }}
            onChange={handleChange}
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
