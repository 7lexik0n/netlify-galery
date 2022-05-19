import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import useFireStore from "./hooks/useFireStore";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Navbar from "./components/Navbar";
import Form from "./components/Form";
import Cards from "./components/Cards";
import Modal from "./components/Modal";
import RemovalModal from "./components/RemovalModal";
import Loader from "./components/Loader";

import "./style.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const [img, setImg] = useState(null);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data, setData } = useFireStore([], setLoading);

  const openRemovalModal = (id) => {
    setOpen(true);
    setId(id);
  };

  const closeRemovalModal = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="app">
        <Navbar />
        <Form updateData={setData} />
        {loading ? (
          <Loader />
        ) : (
          <Cards data={data} setImg={setImg} openModal={openRemovalModal} />
        )}

        {img && <Modal url={img} setImg={setImg} />}
        {open && (
          <RemovalModal
            id={id}
            onClose={closeRemovalModal}
            updateData={setData}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
