import React, { useEffect, useRef } from "react";

const Dashboard = () => {
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    }
    return () => { mounted.current = false };
  });
  return (
    <div>
      <div>
      
      </div>
    </div>
  );
};
export default Dashboard;
