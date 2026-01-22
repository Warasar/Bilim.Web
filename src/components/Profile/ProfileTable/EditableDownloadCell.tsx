import React from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { requestGetResponse } from "../../../actions/actions";

const EditableDownloadCell: React.FC<{
  value: any;
  record: any;
  col: any;
  setLoader: (loader: boolean) => void;
}> = ({ value, record, col, setLoader }) => {
  const downloadFile = async () => {
    setLoader(true);

    try {
      const response = await requestGetResponse(`/admin/downloadFile?filePath=${value}`, {
        responseType: "arraybuffer",
      });

      if (response) {
        const fileData = response.data;
        const contentType = response.headers?.["content-type"] || "application/pdf";

        const contentDisposition = response.headers?.["content-disposition"];
        let fileName = getFilenameFromContentDisposition(contentDisposition);

        if (!fileName) {
          fileName = `${record[col.code]}`;
        }

        const blob = new Blob([fileData], { type: contentType });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setLoader(false);
    }
  };

  const getFilenameFromContentDisposition = (contentDisposition: string) => {
    if (!contentDisposition) return null;

    // Регулярное выражение для парсинга всех форматов
    const matches = contentDisposition.match(/filename\*?=([^;]+)/gi);

    if (!matches) return null;

    // Сортируем: сначала filename* (RFC 5987), потом filename
    matches.sort((a, b) => (b.includes("filename*") ? 1 : -1));

    for (const match of matches) {
      if (match.includes("filename*=")) {
        // RFC 5987 format: filename*=charset'lang'value
        const parts = match.split("'");
        if (parts.length >= 3) {
          const encodedValue = parts.slice(2).join("'");
          try {
            return decodeURIComponent(encodedValue);
          } catch (e) {
            console.warn("Failed to decode filename:", e);
          }
        }
      } else {
        // Standard format: filename="value" or filename=value
        const valueMatch = match.match(/filename=["']?([^"';]+)["']?/i);
        if (valueMatch && valueMatch[1]) {
          let filename = valueMatch[1];
          // Убираем кавычки
          if (filename.startsWith('"') && filename.endsWith('"')) {
            filename = filename.slice(1, -1);
          }
          // Заменяем подчеркивания на пробелы
          filename = filename.replace(/_/g, " ");
          return filename;
        }
      }
    }

    return null;
  };

  return (
    <div className={"profile-table-cell" + (col.isEdit ? "" : " profile-table-cell-disabled")}>
      <div className="profile-table-cell-download" onClick={() => downloadFile()}>
        <DownloadOutlined />
        Скачать файл
      </div>
    </div>
  );
};

export default EditableDownloadCell;
