import axios from "axios";
import { getPayload } from "../utils";

export const getAllUsers = () => {
  const type = "LIST_OF_USERS";

  return (dispatch) => {
    dispatch({ type: type, payload: getPayload("pending", null) });

    axios
      .get("http://localhost:3005/api/users")
      .then((res) =>
        dispatch({ type: type, payload: getPayload("success", res.data) })
      )
      .catch((err) =>
        dispatch({ type: type, payload: getPayload("error", err) })
      );
  };
};

export const deleteUser = (id) => {
  const type = "DELETE_USER";

  return (dispatch) => {
    dispatch({ type, payload: getPayload("pending", null) });
    axios
      .delete(`http://localhost:3005/api/users/delete/${id}`)
      .then((res) =>
        dispatch({ type, payload: getPayload("success", res.data) })
      )
      .catch((err) => dispatch({ type, payload: getPayload("error", err) }));
  };
};

export const addUser = (userData) => {
  const type = "ADD_USER";

  return (dispatch) => {
    dispatch({ type, payload: getPayload("pending", null) });

    axios
      .post("http://localhost:3005/api/users/new", userData)
      .then((res) =>
        dispatch({ type, payload: getPayload("success", res.data) })
      )
      .catch((err) => dispatch({ type, payload: getPayload("error", err) }));
  };
};

export const editUser = (userData) => {
  const type = "EDIT_USER";

  return (dispatch) => {
    dispatch({ type, payload: getPayload("pending", null) });

    axios
      .post(`http://localhost:3005/api/users/edit/${userData.id}`, userData)
      .then((res) =>
        dispatch({ type, payload: getPayload("success", res.data) })
      )
      .catch((err) => dispatch({ type, payload: getPayload("error", err) }));
  };
};

export const selectUser = (selectedUser, actionType) => {
  return {
    type: "SELECTED_FOR_ACTION",
    payload: { data: selectedUser, actionType },
  };
};

export const clearSelectedUser = () => {
  return {
    type: "SELECTED_FOR_ACTION",
    payload: null,
  };
};

export const showUserDataInfoPanel = (visibility) => {
  return {
    type: "USER_DATA_INFO_PANEL",
    payload: visibility,
  };
};
