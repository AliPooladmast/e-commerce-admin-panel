import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_BASE_API_KEY,
  authDomain: "e-commerce-7ce88.firebaseapp.com",
  projectId: "e-commerce-7ce88",
  storageBucket: "e-commerce-7ce88.appspot.com",
  messagingSenderId: "81559925310",
  appId: "1:81559925310:web:b69ce957df871140a7976f",
};

const app = initializeApp(firebaseConfig);

export default app;
