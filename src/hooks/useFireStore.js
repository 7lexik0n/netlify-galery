import { useEffect, useState } from "react";

const loadData = async () => {
  const data = await fetch("/.netlify/functions/getImages").then((res) =>
    res.json()
  );
  return data;
};

const useFireStore = (initData, updateStatus) => {
  const [data, setData] = useState(initData, updateStatus);

  const loadImages = async () => {
    if (updateStatus) {
      updateStatus(true);
    }

    const data = await loadData();
    setData(data);

    if (updateStatus) {
      updateStatus(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return { data, setData };
};

export { loadData };
export default useFireStore;
