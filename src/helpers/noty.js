import { message } from "antd";

export const noty = async (text, type = "error", redirect = false) => {
  message[type](text);
  if (redirect) {
    window.location.replace("/");
  }
};
