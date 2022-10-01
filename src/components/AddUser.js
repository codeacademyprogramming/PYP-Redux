import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showUserDataInfoPanel } from "../actions";
import addUserIcon from "../images/plus.svg";

const AddUser = () => {
  const dispatch = useDispatch();
  const userInfoPanelVisibility = useSelector(
    (state) => state.showUserDataInfoPanel
  );

  return (
    <div
      className={`add-user
                ${
                  userInfoPanelVisibility ? "add-user-closed" : "add-user-open"
                }`}
      onClick={() => dispatch(showUserDataInfoPanel(!userInfoPanelVisibility))}
    >
      <img src={addUserIcon} alt="add-user" />
    </div>
  );
};

export default AddUser;
