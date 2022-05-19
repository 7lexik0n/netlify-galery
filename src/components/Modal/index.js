import React from "react";
import { Paper } from "@mui/material";
import { motion } from "framer-motion";

const Modal = ({ url, setImg }) => {
  const onClickHandler = (evt) => {
    if (evt.target.classList.contains("substrate")) {
      setImg(null);
    }
  };

  return (
    <div className="substrate" onClick={onClickHandler}>
      <motion.div
        className="modal__container"
        animate={{ y: "0" }}
        initial={{ y: "-100vh" }}
      >
        <Paper sx={{ padding: "10px" }} elevation={3}>
          <img className="modal__img" src={url} />
        </Paper>
      </motion.div>
    </div>
  );
};

export default Modal;
