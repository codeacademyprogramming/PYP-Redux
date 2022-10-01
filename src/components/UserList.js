import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, clearSelectedUser, deleteUser } from "../actions";
import Loading from "./Loading";
import UserListItem from "./UserListItem";
import ConfirmationModal from "./ConfirmationModal";
import EmptyUserList from "./EmptyUserList";

const UserList = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.listOfUsers);
  const selectedUser = useSelector((state) => state.selectedUser);
  const deletedUser = useSelector((state) => state.deletedUser);

  React.useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  React.useEffect(() => {
    if (deletedUser.status === "success") {
      dispatch(clearSelectedUser());
      dispatch(getAllUsers());
    }
  }, [deletedUser.status, dispatch]);

  const handleModalClose = () => {
    dispatch(clearSelectedUser());
  };

  const handleModalConfirm = () => {
    dispatch(deleteUser(selectedUser.data.id));
  };

  const renderTableHeading = () => {
    return (
      <thead>
        <tr>
          <td>Full Name</td>
          <td>Age</td>
          <td>Gender</td>
          <td>Mail</td>
          <td>#id</td>
          <td>Actions</td>
        </tr>
      </thead>
    );
  };

  console.log(selectedUser);

  return (
    <div className="student-list">
      <h1>Student List</h1>
      <table>
        {renderTableHeading()}
        {userList.status === "success" &&
          userList.data.map((user) => (
            <UserListItem user={user} key={user.id} />
          ))}
      </table>
      {userList.status === "pending" && <Loading />}
      {userList.status === "success" && !userList.data.length && (
        <EmptyUserList />
      )}

      {Boolean(selectedUser) && selectedUser.actionType === "delete" && (
        <ConfirmationModal
          handleModalClose={handleModalClose}
          message={`Are you sure to delete ${selectedUser.data.name} ${selectedUser.data.surname}`}
          handleModalConfirm={handleModalConfirm}
          isLoading={deletedUser.status === "pending"}
        />
      )}
    </div>
  );
};

export default UserList;
