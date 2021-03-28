import * as localforage from "localforage";
import axios from "axios";
import { url } from "./apiSetup";

export const getUser = async (account) => {
  let token = await localforage.getItem("token");
  let response = await axios({
    url: `${url}/api/Members/GetMemberData?account=${account}`,
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  });
  return response;
};
