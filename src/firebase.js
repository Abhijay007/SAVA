import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCU_18qpwXEmYAVB_TBQKhM8kcFFAnjbHE",
  authDomain: "sava-react.firebaseapp.com",
  projectId: "sava-react",
  storageBucket: "sava-react.appspot.com",
  messagingSenderId: "239915742873",
  appId: "1:239915742873:web:3d803dd09e1ee2103d6a08",
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth();
export const storage = firebase.storage();
export const firestore = firebase.firestore();

export const generateUserDocument = async (user, role, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`${role}/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    try {
      await userRef.set({
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid, role);
};

const getUserDocument = async (uid, role) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`${role}/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};