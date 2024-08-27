import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBwQjqX00SdICPyGDIXoipAtE3NI6wcZzk",
  authDomain: "somnolentai-3b507.firebaseapp.com",
  projectId: "somnolentai-3b507",
  storageBucket: "somnolentai-3b507.appspot.com",
  messagingSenderId: "494412442264",
  appId: "1:494412442264:web:002f66b7be9d6c088dfeed",
  measurementId: "G-QV1V5KSPV9",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
