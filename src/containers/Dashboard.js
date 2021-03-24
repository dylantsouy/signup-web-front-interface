import React, { useEffect, useRef } from "react";

const Dashboard = () => {
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    }
  });
  return (
    <div>
      <div>
      dashboard
      </div>
    </div>
  );
};
export default Dashboard;
