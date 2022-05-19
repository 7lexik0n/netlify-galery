require("../../firebase/init");
const { getFirestore } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");
const fs = require("fs");
const { Buffer } = require("buffer");
const busboy = require("busboy");

const db = getFirestore();
const imagesRef = db.collection("images");
const bucket = getStorage().bucket();

const uploadToFirestore = async (name, url, createdAt) => {
  const fireLink = url
    .replace(
      /storage\.googleapis\.com\/download\/storage\/v1/,
      "firebasestorage.googleapis.com/v0"
    )
    .replace(/generation=\d+&/, "");
  await db.collection("images").add({
    name,
    url: fireLink,
    createdAt,
  });
};

exports.handler = async (event) => {
  return new Promise((resolve) => {
    const body = event.body;

    const bb = busboy({ headers: event.headers });
    bb.on("file", (name, file, info) => {
      const { filename } = info;
      if (!fs.existsSync("assets")) {
        fs.mkdirSync("assets");
      }

      file.pipe(fs.createWriteStream(`assets/${filename}`));

      file.on("end", () => {
        bucket.upload(
          `assets/${filename}`,
          {
            destination: `images/${filename}`,
          },
          async function (err, newFile, response) {
            if (err) {
              console.log(err);
            }

            fs.rm(`assets/${filename}`, function (err) {
              console.log(err);
            });

            await uploadToFirestore(
              filename,
              response.mediaLink,
              response.timeCreated
            );

            const data = [];
            const snapsphot = await imagesRef
              .orderBy("createdAt", "desc")
              .get();

            snapsphot.forEach((doc) => {
              data.push({
                id: doc.id,
                ...doc.data(),
              });
            });

            resolve(data);
          }
        );
      });
    });

    bb.write(Buffer.from(body, "base64"));
  }).then((data) => {
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  });
};
