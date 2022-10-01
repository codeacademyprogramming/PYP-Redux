import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  addUser,
  getAllUsers,
  showUserDataInfoPanel,
  clearSelectedUser,
  editUser,
} from "../actions";
import { useDispatch } from "react-redux";
import Loading from "./Loading";

const UserInfoPanel = () => {
  const dispatch = useDispatch();
  const userInfoPanelVisibility = useSelector(
    (state) => state.showUserDataInfoPanel
  );
  const addedUser = useSelector((state) => state.addedUser);
  const selectedUser = useSelector((state) => state.selectedUser);
  const editedUser = useSelector((state) => state.editedUser);

  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [age, setAge] = React.useState("");
  const [mail, setMail] = React.useState("");
  const [gender, setGender] = React.useState("M");
  const [imgUrl, setImgUrl] = React.useState("");

  const resetForm = () => {
    setName("");
    setSurname("");
    setAge("");
    setMail("");
    setGender("M");
    setImgUrl("");
  };

  const isAddButtonActive = () =>
    Boolean(name) &&
    Boolean(surname) &&
    Boolean(age) &&
    Boolean(mail) &&
    Boolean(imgUrl);

  const isEditButtonDisabled = () =>
    selectedUser.data.name === name &&
    selectedUser.data.surname === surname &&
    selectedUser.data.mail === mail &&
    selectedUser.data.age === age &&
    selectedUser.data.imgUrl === imgUrl &&
    selectedUser.data.gender === gender;

  useEffect(() => {
    if (addedUser.status === "success" || editedUser.status === "success") {
      resetForm();
      dispatch(getAllUsers());
    }
  }, [addedUser, editedUser, dispatch]);

  useEffect(() => {
    if (editedUser.status === "success") {
      dispatch(showUserDataInfoPanel(false));
    }
  }, [editedUser, dispatch]);

  useEffect(() => {
    if (!userInfoPanelVisibility) {
      resetForm();
      dispatch(clearSelectedUser());
    }
  }, [userInfoPanelVisibility, dispatch]);

  useEffect(() => {
    if (selectedUser?.actionType === "edit") {
      dispatch(showUserDataInfoPanel(true));
      setName(selectedUser.data.name);
      setSurname(selectedUser.data.surname);
      setAge(selectedUser.data.age);
      setGender(selectedUser.data.gender);
      setImgUrl(selectedUser.data.imgUrl);
      setMail(selectedUser.data.mail);
    }
  }, [selectedUser, dispatch]);

  return userInfoPanelVisibility ? (
    <div className="infopanel-wrapper">
      <div className="user-data">
        <h1>User data</h1>
        {addedUser.status === "pending" || editedUser.status === "pending" ? (
          <Loading />
        ) : (
          <form className="form">
            <div>
              <label htmlFor="name">Student's name: </label>
              <br />
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="surname">Student's surname: </label>
              <br />
              <input
                type="text"
                id="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="age">Student's age: </label>
              <br />
              <input
                type="text"
                id="age"
                onChange={(e) => setAge(e.target.value)}
                value={age}
              />
            </div>
            <div>
              <label htmlFor="mail">Contact email: </label>
              <br />
              <input
                type="text"
                id="mail"
                onChange={(e) => setMail(e.target.value)}
                value={mail}
              />
            </div>

            <div>
              <p>Gender: </p>
              <label htmlFor="gender-m">Male</label>
              <input
                type="radio"
                name="gender"
                id="gender-m"
                defaultChecked
                value={gender}
                onChange={() => setGender("M")}
              />
              <label htmlFor="gender-f">Female</label>
              <input
                type="radio"
                name="gender"
                id="gender-f"
                value={gender}
                onChange={() => setGender("F")}
              />
            </div>

            <div>
              <label htmlFor="url">Image Url: </label>
              <br />
              <input
                type="text"
                id="url"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
              />
            </div>
            <div>
              {selectedUser?.actionType === "edit" ? (
                <button
                  disabled={isEditButtonDisabled()}
                  className="edit-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    const userData = {
                      name,
                      surname,
                      age,
                      mail,
                      gender,
                      imgUrl,
                      id: selectedUser.data.id,
                    };
                    dispatch(editUser(userData));
                  }}
                >
                  EDIT USER DATA
                </button>
              ) : (
                <button
                  className="add-btn"
                  disabled={!isAddButtonActive()}
                  onClick={(e) => {
                    e.preventDefault();
                    const userData = {
                      name,
                      surname,
                      age,
                      mail,
                      gender,
                      imgUrl,
                    };
                    dispatch(addUser(userData));
                  }}
                >
                  ADD USER
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  ) : null;
};

export default UserInfoPanel;
