import * as admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID?.replace(/\\n/g, "\n"),
    privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
    clientEmail: process.env.CLIENT_EMAIL?.replace(/\\n/g, "\n"),
  }),
});

const db = admin.firestore();
export { db, admin };
