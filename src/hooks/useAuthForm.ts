import { useState, useCallback, ChangeEvent, useRef } from "react";
import { AuthFormState } from "../types/auth";

export const useAuthForm = () => {
  const [formState, setFormState] = useState<AuthFormState>({
    email: "",
    password: "",
    showPassword: false,
    isLoading: false,
  });

  // Используем ref для отслеживания актуального состояния
  const formStateRef = useRef(formState);
  formStateRef.current = formState; // Всегда актуальное значение

  const updateFormState = useCallback((updates: Partial<AuthFormState>) => {
    setFormState((prev) => {
      const newState = { ...prev, ...updates };
      formStateRef.current = newState;
      return newState;
    });
  }, []);

  const handleInputChange = useCallback(
    (field: keyof Pick<AuthFormState, "email" | "password">) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setFormState((prev) => {
        const newState = { ...prev, [field]: value };
        formStateRef.current = newState;
        return newState;
      });
    },
    [],
  );

  const togglePasswordVisibility = useCallback(() => {
    setFormState((prev) => {
      const newState = { ...prev, showPassword: !prev.showPassword };
      formStateRef.current = newState;
      return newState;
    });
  }, []);

  const isFormValid = formState.email.trim() !== "" && formState.password.trim() !== "";

  return {
    formState,
    isFormValid,
    handleInputChange,
    togglePasswordVisibility,
    updateFormState,
    formStateRef, // опционально, для отладки
  };
};
