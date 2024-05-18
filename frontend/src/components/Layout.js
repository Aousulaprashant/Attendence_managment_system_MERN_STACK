// components/Layout.js
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header>
        <nav>
          <ul>
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <a href="#">Students</a>
            </li>
            <li>
              <a href="#">Mark Attendance</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
