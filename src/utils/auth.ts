import cookie from "js-cookie";

export const setAuthToken = (token: string): void => {
  cookie.set("token", token, {
    expires: 1, // 1 день
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

export const getAuthToken = (): string | undefined => {
  return cookie.get("token");
};

export const removeAuthToken = (): void => {
  cookie.remove("token");
};

export const redirectToApp = (): void => {
  window.location.href = `${window.location.origin}/accompaniment`;
};
