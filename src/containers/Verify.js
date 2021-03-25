import React, { useState, useEffect,useRef } from "react";
import Loading from "../components/common/Loading";
import { useHistory } from "react-router-dom";
import * as localforage from "localforage";
import { confirmVerified } from "../apis/loginApi";
import { noty } from "../helpers/noty";

const Verify = () => {
  const mounted = useRef();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const getUrlParams = async () => {
    const storedToken = await localforage.getItem("token");
    const encodedUrl = new URL(window.location.href);
    const params = new URL(encodedUrl).searchParams;
    const account = params.get("account")
    const verifycode = params.get("verifycode")
    if (!account || !verifycode) {
      history.push("/login");
      noty("請正確使用信箱內附的連結網址");
      return;
    }
    if (storedToken) {
      history.push("/dashboard");
      noty("您已經登入，將為您跳轉回首頁");
      return;
    }
    await confirmVerified(account,verifycode)
    .then((res) => {
      if (res.data.returnCode === 1) {
        noty("驗證碼錯誤，請您重新操作");
        history.push("/login");
        return;
      }
      if (res.data.returnCode === 2) {
        noty("此帳號已經驗證過，請您直接登入");
        history.push("/login");
        return;
      }
      if (res.data.returnCode === 3) {
        noty("發生錯誤");
        history.push("/login");
        return;
      }
      noty("驗證成功，將您導回登入頁面",'success');
      history.push("/login");
    })
    .catch((error) => {
      setLoading(false);
      noty("發生錯誤");
    });
  };
  useEffect(() => {
    if(mounted.current !== true){
      mounted.current = true;
      getUrlParams();
    }
  });
  return (
    <div className="main">
      <Loading hidden={loading} />
    </div>
  );
};

export default Verify;