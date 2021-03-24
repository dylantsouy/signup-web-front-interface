import * as React from "react";
import { Spin } from "antd";

export const Loading = (props) => {
  return (
    <>
      {props.hidden ? (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "1000000000000000",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,.15)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin tip="Loading...">
          </Spin>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default Loading;
