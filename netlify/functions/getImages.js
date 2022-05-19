require("../../firebase/init");
const { getFirestore } = require("firebase-admin/firestore");

const db = getFirestore();
const imagesRef = db.collection("images");

exports.handler = async () => {
  const data = [];
  const snapsphot = await imagesRef.orderBy('createdAt', 'desc').get();

  snapsphot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
