// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";


const firebaseConfig = {
    apiKey: "AIzaSyBVLvrQBiAQgtCQdC2eLrN2HTeFllLckh8",
    authDomain: "fatuber-1f4b8.firebaseapp.com",
    projectId: "fatuber-1f4b8",
    storageBucket: "fatuber-1f4b8.appspot.com",
    messagingSenderId: "653123518120",
    appId: "1:653123518120:web:903b1ff8426d791a68cc9d",
    measurementId: "G-B4SQE199W8"
};

function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        const app = initializeApp(firebaseConfig);
  
        const messaging = getMessaging(app);
        getToken(messaging, {
          vapidKey:
            "BCKNSY0FAgDlbgevvqBGsXdadLiRCrFR1wbWXqFYgQJOV3jX8nTSHAQzXcB91c6GGlmFwCfCcxCUK_UxDL7nTLA",
        }).then((currentToken) => {
          if (currentToken) {
            console.log("currentToken: ", currentToken);
          } else {
            console.log("Can not get token");
          }
        });
      } else {
        console.log("Do not have permission!");
      }
    });
  }
  
  requestPermission();

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
export const messaging = getMessaging(app);
const analytics = getAnalytics(app);