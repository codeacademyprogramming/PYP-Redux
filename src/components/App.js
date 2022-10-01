import React from "react";
import UserList from "./UserList";
import "../style.css";
import AddUser from "./AddUser";
import UserInfoPanel from "./UserInfoPanel";

const App = () => (
  <div className="wrapper">
    <UserList />
    <AddUser />
    <UserInfoPanel />
  </div>
);

export default App;
