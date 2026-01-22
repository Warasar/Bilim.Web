// src/hooks/useAuth.ts
import { useCallback } from "react";
import { message } from "antd";
import { requestLogin } from "../actions/actions";
import { LoginResponse } from "../types/auth";
import { setAuthToken } from "../utils/auth";

export const useAuth = () => {
  const login = useCallback(async (email: string, password: string): Promise<LoginResponse | null> => {
    try {
      const response = await requestLogin(email, password);

      if (response?.token) {
        setAuthToken(response.token);
        return response;
      }

      return null;
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  }, []);

  const handleLogin = useCallback(
    async (email: string, password: string, onSuccess?: () => void) => {
      if (!email.trim() || !password.trim()) {
        message.error("Пожалуйста, заполните все поля");
        return false;
      }

      const result = await login(email, password);

      if (result) {
        message.success("Вход выполнен успешно!");
        onSuccess?.();
        return true;
      } else {
        message.error("Неправильный логин или пароль");
        return false;
      }
    },
    [login],
  );

  return {
    login: handleLogin,
  };
};
