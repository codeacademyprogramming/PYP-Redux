import React from "react";
import closeIcon from "../images/cancel.svg";
import Loading from "./Loading";

const ConfirmationModal = ({
  handleModalClose,
  message,
  handleModalConfirm,
  isLoading,
}) => {
  return (
    <div className="confirmation-modal-bg">
      <div className="confirmation-modal">
        <img
          src={closeIcon}
          alt=""
          className="close-icon"
          onClick={handleModalClose}
        />
        <p>{message}</p>
        {isLoading ? (
          <div style={{ position: "relative", textAlign: "center" }}>
            <Loading />
          </div>
        ) : (
          <div className="modal-buttons">
            <button onClick={handleModalClose}>Reject</button>
            <button onClick={handleModalConfirm}>Confirm</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmationModal;
