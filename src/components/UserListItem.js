import React from "react";
import { useDispatch } from "react-redux";
import deleteIcon from "../images/delete.svg";
import editIcon from "../images/pencil.svg";
import { selectUser } from "../actions";

const UserListItem = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <tbody>
      <tr>
        <td>
          <div className="initials">
            {/* <img src={`${faker.image.avatar()}`} alt="avatar" className="avatar"  /> */}
            <div>{user.name + " " + user.surname}</div>
          </div>
        </td>
        <td>{user.age}</td>
        <td>{user.gender === "M" ? "Male" : "Female"}</td>
        <td>{user.mail}</td>
        <td>{user.id}</td>
        <td style={{ textAlign: "right" }}>
          <div className="icons">
            <img
              src={deleteIcon}
              alt="delete"
              onClick={() => dispatch(selectUser(user, "delete"))}
            />
            <img
              src={editIcon}
              onClick={() => dispatch(selectUser(user, "edit"))}
              alt="edit"
            />
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default UserListItem;
