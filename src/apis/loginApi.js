import * as localforage from "localforage";
import axios from "axios";
import { url } from "./apiSetup";

export const registerApi = async (
  account,
  password,
  group,
  member_name,
  memeber_gender,
  member_email,
  member_address,
  member_phonenumber,
  member_photo
) => {
  let response = await axios({
    url: `${url}/api/Accounts/CreateAccount`,
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    data: {
      account,
      password,
      group,
      member_name,
      memeber_gender,
      member_email,
      member_address,
      member_phonenumber,
      member_photo,
    },
  });
  return response;
};
export const authLogin = async (username, password) => {
  let response = await axios({
    url: `${url}/api/Accounts/Login`,
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    data: {
      username,
      password,
    },
  });
  await localforage.setItem("token", response.data);
  return response;
};

export const sendVerifyApi = async (account) => {
  await axios({
    url: `${url}/api/Accounts/SendVerifyCode?account=${account}`,
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    data: {},
  });
};

export const forgetPassword = async (email) => {
  return await axios({
    url: `${url}/api/Accounts/ForgotPassword?email=${email}`,
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    data: {},
  });
};

export const changePassword = async (
  old_password,
  new_password,
  confirm_password
) => {
  let accessToken = await localforage.getItem("accessToken");
  return await axios({
    url: `${url}/api/v1/admin/change_password`,
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      old_password,
      new_password,
      confirm_password,
    },
  });
};

export const resetPassword = async (newPassword, confirmPassword) => {
  let encodedUrl = new URL(window.location.href);
  let params = new URL(encodedUrl).searchParams;
  let tokenFromUrl = params.get("token");
  let emailFromUrl = params.get("email");
  return await axios({
    url: `${url}/api/v1/reset_password`,
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    data: {
      email: emailFromUrl,
      new_password: newPassword,
      confirm_password: confirmPassword,
      reset_token: tokenFromUrl,
    },
  });
};

export const confirmVerified = async (account, verifycode) => {
  return await axios({
    url: `${url}/api/Accounts/ConfirmVerified`,
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    data: {
      account,
      verifycode,
    },
  });
};
