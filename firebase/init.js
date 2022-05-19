require("dotenv");
const { initializeApp, cert } = require("firebase-admin/app");

const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/gm, "\n"),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER,
  client_x509_cert_url: process.env.CLIENT_CERT,
};

try {
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: 'lexik0n.appspot.com'
  });
} catch (error) {
  console.log(error);
}
