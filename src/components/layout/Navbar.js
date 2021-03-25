import React, { useEffect, useRef, useContext } from "react";
import { PageHeader, Button } from 'antd';
import { AuthContext } from "../../auths/Auth";

const Navbar = () => {
  const mounted = useRef();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    }
  });
  const logoutHandler = async()=>{
    await logout();
  }
  return (
      <div className="navbar">
        <PageHeader
          ghost={false}
          title="活動頁面"
          subTitle="副標題"
          extra={[
            <span key="1">會員，您好</span>,
            <Button key="2" type="primary" onClick={logoutHandler}>
              登出
            </Button>,
          ]}
        >
        </PageHeader>
      </div>
  );
};

export default Navbar;
