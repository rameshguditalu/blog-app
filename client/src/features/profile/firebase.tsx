import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyALRnCypFLJqcCIq9SLI29qihxQgsg1zfg",
  authDomain: "blog-app-d8259.firebaseapp.com",
  projectId: "blog-app-d8259",
  storageBucket: "blog-app-d8259.appspot.com",
  messagingSenderId: "72630064135",
  appId: "1:72630064135:web:c57863a10ae9801ce046a2",
};

const app = initializeApp(firebaseConfig);
console.log(app);

// google auth
const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;
  await signInWithPopup(auth, provider)
    .then((result) => (user = result.user))
    .catch((err) => console.log(err));
  return user;
};
