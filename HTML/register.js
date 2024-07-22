// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

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

// Submit button
const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
    event.preventDefault();

    // Inputs
    const username = document.getElementById('uname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('psw').value;
    const confirmpassword = document.getElementById('cpsw').value;

    if (password !== confirmpassword) {
        alert("Passwords do not match.");
        return;
    }

    // Initialize Firebase Authentication and create a new user
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            alert("User created successfully!");
            window.location.href = "Tela de Login.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Error: ${errorMessage}`);
        });
});