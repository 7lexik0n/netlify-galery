import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import useStorage from "../../hooks/useStorage";

const Form = ({ updateData }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const { loading } = useStorage(file, updateData);
  const types = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  const onChangeHandler = (evt) => {
    const file = evt.target.files[0];
    if (file && types.includes(file.type)) {
      setFile(file);
      setError(null);
    } else {
      setFile(null);
      setError(`Ошибка! Добавьте изображение допустимых форматов (png, jpeg,
        gif, webp).`);
    }
  };

  return (
    <div className="app__container">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "20vh",
        }}
      >
        <Container>
          <Paper elevation={2} sx={{ padding: "15px" }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{ textAlign: "center", py: "10px" }}
            >
              Галерея
            </Typography>
            <Typography
              variant="h5"
              component="h3"
              sx={{ textAlign: "center", pb: "10px" }}
            >
              Нажмите, чтобы добавить изображение
            </Typography>
            <label className="input__container">
              <input
                type="file"
                className="input-file"
                onChange={onChangeHandler}
              ></input>
              <AddCircleRoundedIcon
                fontSize="large"
                sx={{ cursor: "pointer" }}
              />
            </label>
            {loading && (
              <Box>
                <Typography sx={{ textAlign: "center", pb: "10px" }}>
                  {`Идет загрузка файла "${file.name}"`}
                </Typography>
                <LinearProgress />
              </Box>
            )}
            {error ? (
              <Typography sx={{ textAlign: "center", pb: "10px" }}>
                {error}
              </Typography>
            ) : null}
          </Paper>
        </Container>
      </Box>
    </div>
  );
};

export default Form;
