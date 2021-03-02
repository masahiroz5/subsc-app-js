import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  mffessagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

//新規ユーザーのサインアップ
export const signupWithEmailAndPassword = async (email, password) => {
  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    firebase.auth().currentUser.sendEmailVerification();
    alert("登録成功");
    return user;
  } catch (error) {
    alert("登録失敗");
    console.log(error);
  }
};

//登録ユーザーのサインイン
export const signinWithEmailAndPassword = async (email, password) => {
  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    alert("サインイン成功");
    return user;
  } catch (error) {
    alert("サインイン失敗");
    console.log(error);
  }
};

//サインアウト
export const signout = async () => {
  const user1 = await firebase.auth().currentUser;
  console.log("サインアウト前", user1);
  await firebase.auth().signOut();
  const user2 = await firebase.auth().currentUser;
  console.log("サインアウト後", user2);
};
