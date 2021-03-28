import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../components/common/Loading";
import { Input, Alert } from "antd";
import {
  EyeOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../auths/Auth";

const Login = () => {
  const history = useHistory();
  const { login, isAuthenticated } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState("");
  const [openEye, setOpenEye] = useState(false);
  const [errorMessage, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkAuth();
  });
  const checkAuth = () => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  };
  const submitLogin = async () => {
    if (!account) {
      setError("請輸入帳號");
    }
    if (!password) {
      setError("請輸入密碼");
    }
    setLoading(true);
    await login(account, password);
    setLoading(false);
  };

  return (
    <div className="login">
      <Loading hidden={loading} />
      <div className="inputArea">
        <div className="mainTitle">使用者登入</div>
        <div className="subTitle">歡迎您的到來</div>
        {errorMessage ? (
          <Alert message={errorMessage} type="error" showIcon></Alert>
        ) : (
          ""
        )}
        <div className="label">帳號</div>
        <Input
          className="input"
          placeholder="請輸入帳號"
          prefix={<UserOutlined className="site-form-item-icon" />}
          onChange={(event) => setAccount(event.target.value)}
        />
        <div className="label">
          <div>密碼</div>
        </div>
        <Input
          className="input"
          type={!openEye ? "password" : "text"}
          placeholder="請輸入密碼"
          prefix={<KeyOutlined className="site-form-item-icon" />}
          suffix={
            openEye ? (
              <EyeInvisibleOutlined
                onClick={() => setOpenEye(false)}
                className="site-form-item-icon"
              />
            ) : (
              <EyeOutlined
                onClick={() => setOpenEye(true)}
                className="site-form-item-icon"
              />
            )
          }
          onChange={(event) => setPassword(event.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              submitLogin();
            }
          }}
        />
        <div className="mainText">
          <span onClick={() => history.push("/forgetPassword")}>忘記密碼</span>
        </div>
        <div className="loginBtns">
          <button onClick={submitLogin} className="button1">
            登入
          </button>
          <button onClick={() => history.push("/register")} className="button2">
            註冊
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
