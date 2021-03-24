import React, { useState } from "react";
import Loading from "../components/common/Loading";
import { registerApi, sendVerifyApi } from "../apis/loginApi";
import { genderOption } from "../helpers/columns";
import { Alert, Select, Input } from "antd";
import {
  SmileOutlined,
  MobileOutlined,
  HomeOutlined,
  EyeOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  KeyOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { emailValidator, phoneValidator } from "../helpers/validator";
import { useHistory } from "react-router-dom";
import { noty } from "../helpers/noty";

const { Option } = Select;

const Register = () => {
  const [openEye, setOpenEye] = useState(false);
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [phone, setPhone] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const stepHandler = (s) => {
    if (s === 1) {
      setError();
      setStep(1);
    } else {
      if (!name) {
        setError("請輸入姓名");
        return;
      }
      if (!gender) {
        setError("請選擇性別");
        return;
      }
      if (!phone) {
        setError("請輸入電話");
        return;
      }
      if (!phoneValidator().test(phone)) {
        setError("手機格式錯誤");
        return;
      }
      if (!address) {
        setError("請輸入地址");
        return;
      }
      setError();
      setStep(2);
    }
  };
  const submit = async () => {
    if (!account) {
      setError("請輸入帳號");
      return;
    }
    if (account.length < 6) {
      setError("帳號少於6位數");
      return;
    }
    if (password.length > 12) {
      setError("帳號大於12位數");
      return;
    }
    if (!password) {
      setError("請輸入密碼");
      return;
    }
    if (password.length < 6) {
      setError("密碼少於6位數");
      return;
    }
    if (password.length > 12) {
      setError("密碼大於12位數");
      return;
    }
    if (!email) {
      setError("請輸入信箱");
      return;
    }
    if (emailValidator().test(email) === false) {
      setError("信箱格式錯誤");
      return;
    }
    setLoading(true);
    await registerApi(
      account,
      password,
      "Normal",
      name,
      gender,
      email,
      address,
      phone,
      ""
    )
      .then(async (res) => {
        if (res.status === 200) {
          if (res.data.returnCode === 1 || res.data.returnCode === 2) {
            noty("發生錯誤");
            setError();
            setLoading(false);
            return;
          }
          if (res.data.returnCode === 3) {
            noty("輸入的內容有誤");
            setError();
            setLoading(false);
            return;
          }
          if (res.data.returnCode === 4) {
            noty("此帳號已被使用過");
            setError();
            setLoading(false);
            return;
          }
          if (res.data.returnCode === 5) {
            noty("此信箱已被使用過");
            setError();
            setLoading(false);
            return;
          }
          await sendVerifyApi(account)
            .then((response) => {
              noty("註冊成功，將為您跳轉回登入頁面", "success");
              setLoading(false);
              history.push("/login");
            })
            .catch((error) => {
              console.log(error.message);
              setLoading(false);
              setError();
              noty("發生錯誤");
            });
        }
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
        setError();
        noty("發生錯誤");
      });
  };
  return (
    <div className="login">
      <Loading hidden={loading} />
      {step === 1 ? (
        <>
          <div className="inputArea">
            <div className="inputAreaInner">
              <div className="mainTitle">註冊新帳號</div>
              <div className="subTitle">註冊您的新帳號</div>

              {errorMessage ? (
                <Alert message={errorMessage} type="error" showIcon></Alert>
              ) : (
                ""
              )}
              <div className="label">姓名</div>
              <Input
                className="input"
                placeholder="請輸入姓名"
                defaultValue={name}
                prefix={<SmileOutlined className="site-form-item-icon" />}
                onChange={(event) => setName(event.target.value)}
              />
              <div className="label">手機</div>
              <Input
                className="input"
                defaultValue={phone}
                placeholder="請輸入手機號碼"
                prefix={<MobileOutlined className="site-form-item-icon" />}
                onChange={(event) => setPhone(event.target.value)}
              />
              <div className="label">地址</div>
              <Input
                className="input"
                defaultValue={address}
                placeholder="請輸入地址"
                prefix={<HomeOutlined className="site-form-item-icon" />}
                onChange={(event) => setAddress(event.target.value)}
              />
              <div className="label">性別</div>
              <Select
                defaultValue={gender}
                onChange={(e, selectedOption) => {
                  setGender(selectedOption.key);
                }}
              >
                {genderOption.map((e) => {
                  return <Option key={e.value} value={e.value}>{e.text}</Option>;
                })}
              </Select>
              <div className="loginBtns">
                <button
                  onClick={() => stepHandler(2)}
                  className="button1"
                >
                  下一步
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
        </>
      ) : (
        <div className="inputArea">
          <div className="inputAreaInner">
            <div className="mainTitle">註冊新帳號</div>
            <div className="subTitle">註冊您的新帳號</div>

            {errorMessage ? (
              <Alert message={errorMessage} type="error" showIcon></Alert>
            ) : (
              ""
            )}
            <div className="label">帳號</div>
            <Input
              className="input"
              defaultValue={account}
              placeholder="請輸入帳號"
              prefix={<UserOutlined className="site-form-item-icon" />}
              onChange={(event) => setAccount(event.target.value)}
            />
            <div className="label">密碼</div>
            <Input
              className="input"
              type={!openEye ? "password" : "text"}
              defaultValue={password}
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
            />
            <div className="label">信箱</div>
            <Input
              className="input"
              defaultValue={email}
              placeholder="請輸入信箱"
              prefix={<MailOutlined className="site-form-item-icon" />}
              onChange={(event) => setEmail(event.target.value)}
            />
            <div className="loginBtns">
              <button
                onClick={() => submit()}
                className="button1"
              >
                註冊
              </button>
              <button
                onClick={() => stepHandler(1)}
                className="button2"
              >
                回上一步
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
