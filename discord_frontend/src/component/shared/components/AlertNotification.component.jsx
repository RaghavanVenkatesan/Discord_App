import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useSelector, useDispatch } from "react-redux";
import {
  selectShowAlertMessage,
  selectAlertMessageContent,
} from "../../../store/alert/alert.selector";
import { closeAlertMessage } from "../../../store/alert/alert.slice";

const AlertNotification = () => {
  const dispatch = useDispatch();

  // Using selectors to get the alert state
  const showAlertMessage = useSelector(selectShowAlertMessage);
  const alertMessageContent = useSelector(selectAlertMessageContent);

  const handleClose = () => {
    dispatch(closeAlertMessage());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={showAlertMessage}
      onClose={handleClose}
      autoHideDuration={6000}
    >
      <Alert severity="info">{alertMessageContent}</Alert>
    </Snackbar>
  );
};

export default AlertNotification;
