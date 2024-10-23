import { Storage } from "./LocalStorage";
export const baseUrl = "https://api.teachersvision.in";
export const header = {
  "Content-Type": "application/json",
  "Abp-TenantId": "1",
};

type KEYS = {
  ACCESS_TOKEN: string;
  USER_ID: string;
  TAB: string;
};

export const KEYS: KEYS = {
  ACCESS_TOKEN: "access_token",
  USER_ID: "user_id",
  TAB: "tab",
};
const access_token = async () => {
  return await Storage.getItem("access_token");
};
export const config = {
  headers: {
    Authorization: `Bearer  ${access_token}`,
    "Abp-TenantId": "1",
  },
};
