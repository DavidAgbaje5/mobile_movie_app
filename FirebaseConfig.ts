import { initializeApp, getApp, getApps} from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDpRoGAz-svQneH93WQ5T5qsrvTeXDZ0Eg",
    authDomain: "movieapp-13a6d.firebaseapp.com",
    projectId: "movieapp-13a6d",
    storageBucket: "movieapp-13a6d.firebasestorage.app",
    messagingSenderId: "201331057058",
    appId: "1:201331057058:web:b0946ed832e377b5fb92fb",
    measurementId: "G-4RBBHM6SL7"
};

export const app = !getApps.length ? initializeApp(firebaseConfig) :getApp();

// Initialize Firebase
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);
