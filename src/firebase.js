import firebase from "firebase/compat/app"
import "firebase/compat/database";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCt7XoiS3kcMyyR8CGOC7RGbdzbCeqCgFs",
    authDomain: "react-contact-cb4ce.firebaseapp.com",
    projectId: "react-contact-cb4ce",
    storageBucket: "react-contact-cb4ce.appspot.com",
    messagingSenderId: "339694111562",
    appId: "1:339694111562:web:c6830aeee0958282360fb3"
};
const fireDb = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(fireDb)
export const googleProvider = new GoogleAuthProvider(fireDb)
export const database = getFirestore(fireDb)
export default fireDb.database().ref();
