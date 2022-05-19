import { useState, useEffect } from "react";

const useFirebase = (file, updateData) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!file) {
      return;
    }

    const uploadFunc = async () => {
      setLoading(true);      
      const data = new FormData();
      data.append(`file`, file);
      data.append(`name`, file.name);
      const newData = await fetch("/.netlify/functions/saveFile", {
        method: "POST",
        body: data,
      }).then((res) => res.json());
      updateData(newData);
      setLoading(false);
    };

    uploadFunc();
  }, [file]);

  return { loading };
};

export default useFirebase;
