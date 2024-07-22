// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyABRzMCUClHvXqrIvSBuCIp0L7ytXJnzSg",
    authDomain: "central-lfg.firebaseapp.com",
    databaseURL: "https://central-lfg-default-rtdb.firebaseio.com",
    projectId: "central-lfg",
    storageBucket: "central-lfg.appspot.com",
    messagingSenderId: "176121641470",
    appId: "1:176121641470:web:ac80ef596bd039e38868af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // User is not logged in, redirect to login page
        alert("Only logged in user may create posts");
        window.location.href = "Tela de Login.html";
    }
});