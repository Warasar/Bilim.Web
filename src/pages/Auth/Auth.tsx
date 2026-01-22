import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { message } from "antd";
import Loader from "../../modules/YaKIT.WEB.KIT/components/Loader/Loader";
import { useAuthForm } from "../../hooks/useAuthForm";
import { useAuth } from "../../hooks/useAuth";
import { redirectToApp } from "../../utils/auth";
import "./auth.scss";
import { EmailIcon, EyeIcon, EyeOffIcon, PasswordIcon, UserIcon } from "../../components/Icons/AuthIcons";

const Auth: React.FC = () => {
  const { formState, isFormValid, handleInputChange, togglePasswordVisibility, updateFormState } = useAuthForm();

  // Ключи для принудительного обновления инпутов
  const [emailKey, setEmailKey] = useState(0);
  const [passwordKey, setPasswordKey] = useState(0);

  const { login } = useAuth();

  const handleSubmit = useCallback(
    async (e?: FormEvent) => {
      e?.preventDefault();

      if (!isFormValid) {
        message.error("Пожалуйста, исправьте ошибки в форме");
        return;
      }

      updateFormState({ isLoading: true });

      const success = await login(formState.email, formState.password, () => {
        redirectToApp();
      });

      if (!success) {
        updateFormState({ isLoading: false });
      }
    },
    [formState.email, formState.password, isFormValid, login, updateFormState],
  );

  // Сбрасываем ключи при изменении состояния
  useEffect(() => {
    if (formState.email === "") {
      setEmailKey((prev) => prev + 1);
    }
  }, [formState.email]);

  useEffect(() => {
    if (formState.password === "") {
      setPasswordKey((prev) => prev + 1);
    }
  }, [formState.password]);

  return (
    <div className="auth-container">
      {formState.isLoading && <Loader absolute />}

      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-icon">
            <UserIcon size={24} />
          </div>
          <h1 className="auth-title">Авторизация</h1>
          <p className="auth-description">Введите ваши данные для входа в систему "Билим"</p>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Email Input */}
          <div className="auth-form-group">
            <label htmlFor="email" className="auth-form-label">
              Логин
            </label>
            <div className="input-wrapper">
              <EmailIcon className="input-icon" />
              <input
                key={`email-${emailKey}`} // Ключ меняется при очистке
                id="email"
                type="email"
                placeholder="Введите логин"
                value={formState.email}
                onChange={handleInputChange("email")}
                className="auth-form-input"
                disabled={formState.isLoading}
                autoComplete="off"
                aria-required="true"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="auth-form-group">
            <label htmlFor="password" className="auth-form-label">
              Пароль
            </label>
            <div className="input-wrapper">
              <PasswordIcon className="input-icon" />
              <input
                key={`password-${passwordKey}`} // Ключ меняется при очистке
                id="password"
                type={formState.showPassword ? "text" : "password"}
                placeholder="Введите пароль"
                value={formState.password}
                onChange={handleInputChange("password")}
                className="auth-form-input"
                disabled={formState.isLoading}
                autoComplete="off"
                aria-required="true"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="auth-form-input-toggle"
                disabled={formState.isLoading}
                aria-label={formState.showPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {formState.showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="auth-button"
            disabled={formState.isLoading || !isFormValid}
            aria-busy={formState.isLoading}
          >
            {formState.isLoading ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
