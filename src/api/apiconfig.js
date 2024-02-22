// apiconfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push, get } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBER1bpbaMAtxp5tgVdSrS3N1HFgboexgo",
  authDomain: "game-api-355ed.firebaseapp.com",
  databaseURL: "https://game-api-355ed-default-rtdb.firebaseio.com",
  projectId: "game-api-355ed",
  storageBucket: "game-api-355ed.appspot.com",
  messagingSenderId: "53664012909",
  appId: "1:53664012909:web:693b6a3226665762a87d64",
  measurementId: "G-41SBEJ7M51"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const getUsersFromFirebase = () => {
  const db = getDatabase(app);
  const usersRef = ref(db, 'users');

  return get(usersRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        console.log('Users data:', usersData);
        return usersData;
      } else {
        console.log('No users data available');
        return {};
      }
    })
    .catch((error) => {
      console.error('Error getting users data from Firebase:', error);
      return {};
    });
};

const addUserToFirebase = async (newUser) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);

    const db = getDatabase(app);
    const usersRef = ref(db, 'users');

    const newUserWithStudentId = {
      ...newUser,
      studentId: newUser.studentId,
    };

    await push(usersRef, newUserWithStudentId);

    console.log('User added successfully');
  } catch (error) {
    console.error('Error adding user to Firebase:', error);
    throw error;
  }
};

export { app, addUserToFirebase, getUsersFromFirebase };