import React from "react";
import { Grid, Container, Paper } from "@mui/material";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";


const MotionGrid = motion(Grid);

const Cards = ({ data, setImg, openModal }) => {
  const onClickHandle = (evt) => {
    setImg(evt.target.src);
  };

  const onRemoveHandler = (id) => {
    openModal(id);
  };

  return (
    <div className="cards">
      <Container>
        <Grid container justifyContent="center" spacing={2}>
          {data.map((item) => (
            <MotionGrid layout item xs={6} md={4} key={item.id}>
              <motion.div
                className="cart__item"
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    padding: "15px",
                    position: "relative",
                    height: "0px",
                    py: "50%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    className="gallery__img"
                    src={item.url}
                    onClick={onClickHandle}
                  />
                  <div
                    className="gallery__remove"
                    onClick={() => onRemoveHandler(item.id)}
                  >
                    <Paper sx={{ padding: "5px 2px" }}>
                      <DeleteIcon fz="small" />
                    </Paper>
                  </div>
                </Paper>
              </motion.div>
            </MotionGrid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Cards;
