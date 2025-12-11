import { useEffect, useRef, useState } from "react";

export const useEditableCell = (
  initialValue: any,
  record: any,
  col: any,
  onSave: (value: any, record: any, col: any) => void
) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleEdit = () => {
    setEditing(true);
    setValue(initialValue);
  };

  const handleSave = () => {
    setEditing(false);
    onSave(value, record, col);
  };

  const handleCancel = () => {
    setValue(initialValue);
    setEditing(false);
  };

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  return {
    editing,
    value,
    inputRef,
    handleEdit,
    handleSave,
    handleChange,
    handleCancel,
  };
};
