import React, { useEffect, useRef } from "react";

const Navbar = () => {
  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    }
  });

  return (
    <>
      <div className="navbar">navbar</div>
    </>
  );
};

export default Navbar;
