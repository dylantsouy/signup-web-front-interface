import React, { useState } from "react";
import Loading from "../components/common/Loading";
import { useHistory } from "react-router-dom";
import { emailValidator } from "../helpers/validator";
import { Alert, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { forgetPassword } from "../apis/loginApi";
import { noty } from "../helpers/noty";

const ForgetPassword = () => {
  const [forgetEmail, setForgetEmail] = useState("");
  const [errorMessage, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const submitForget = async () => {
    if (!forgetEmail) {
      setError("請輸入信箱");
      return;
    }
    if (emailValidator().test(forgetEmail) === false) {
      setError("信箱格式錯誤");
      return;
    }
    setLoading(true);
    await forgetPassword(forgetEmail)
      .then((res) => {
        if (res.data.returnCode === 1 || res.data.returnCode === 2) {
          noty("發生錯誤");
          setError();
          setLoading(false);
          return;
        }
        if (res.data.returnCode === 3) {
          noty("查無此信箱");
          setError();
          setLoading(false);
          return;
        }
        noty("發送郵件成功，請至信箱查看郵件", "success");
        setLoading(false);
        history.push("/login");
      })
      .catch((error) => {
        setLoading(false);
        setError();
        noty("發生錯誤");
      });
  };
  return (
    <div className="login">
      <Loading hidden={loading} />
      <div className="inputArea">
        <div className="inputAreaInner">
          <div className="mainTitle">忘記密碼</div>
          <div className="subTitle">忘記您的密碼了嗎，輸入您的信箱即可恢復</div>
          {errorMessage ? (
            <Alert message={errorMessage} type="error" showIcon></Alert>
          ) : (
            ""
          )}
          <div className="label">信箱 (Email)</div>
          <Input
            className="input"
            placeholder="請輸入Email"
            prefix={<MailOutlined className="site-form-item-icon" />}
            onChange={(event) => setForgetEmail(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                submitForget();
              }
            }}
          />
          <div className="loginBtns">
            <button
              onClick={submitForget}
              className="button1"
            >
              傳送驗證網址
            </button>
            <button
              onClick={() => history.push("/login")}
              className="button2"
            >
              返回登入
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
