import * as admin from "firebase-admin";

// require("dotenv").config();

// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: process.env.PROJECT_ID,
//     privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
//     clientEmail: process.env.CLIENT_EMAIL,
//   }),
//   databaseURL: process.env.DATABASE_URL,
// });

// eslint-disable-next-line import/no-absolute-path
import serviceAccount from "/Users/user/Documents/my-net-worth-key/my-net-worth-74297-firebase-adminsdk-wf10m-12b00c8249.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const db = admin.firestore();
export { db, admin };
