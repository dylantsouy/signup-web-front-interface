import React, { useEffect, useRef, useContext, useState } from "react";
import { PageHeader, Button } from "antd";
import { AuthContext } from "../../auths/Auth";

const Navbar = () => {
  const mounted = useRef();
  const [user, setUser] = useState("");
  const { logout, userDetail } = useContext(AuthContext);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      getUser();
    }
    return () => {
      mounted.current = false;
    };
  });
  const getUser = async () => {
    const user = await userDetail();
    setUser(user);
  };
  const logoutHandler = async () => {
    await logout();
  };
  return (
    <div className="navbar">
      <PageHeader
        ghost={false}
        title="活動頁面"
        subTitle="副標題"
        extra={[
          <span key="1">會員 {user && user.name}，您好</span>,
          <Button key="2" type="primary" onClick={logoutHandler}>
            登出
          </Button>,
        ]}
      ></PageHeader>
    </div>
  );
};

export default Navbar;
