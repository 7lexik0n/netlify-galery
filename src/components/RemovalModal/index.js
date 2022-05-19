import React from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const RemovalModal = ({ onClose, id, updateData }) => {
  const onConfirmHandler = async () => {
    const body = {
      id,
    };
    const newData = await fetch("/.netlify/functions/deleteImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
    updateData(newData);
    onClose();
  };

  return (
    <Dialog
      open
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Внимание!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Вы уверены, что хотите удалить данное изображение?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={onConfirmHandler}
        >
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemovalModal;
