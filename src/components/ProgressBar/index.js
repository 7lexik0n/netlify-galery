import React from "react";
import { Typography } from "@mui/material";

const ProgressBar = ({ progress, name }) => {
  return (
    <>
      <Typography
        sx={{ textAlign: "center", pb: "10px" }}
      >{`Идет загрузка файла "${name}"`}</Typography>
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </>
  );
};

export default ProgressBar;
