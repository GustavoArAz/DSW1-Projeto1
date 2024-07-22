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
    if (user) {
        // User is signed in, replace the second <ul> element
        const userNav = document.getElementById('user-nav');
        userNav.innerHTML = `
            <li class="navbar-item">
                <a class="nav-link" href="#">${user.email}<span class="sr-only">(current)</span></a>
            </li>
            <li class="navbar-item">
                <a class="nav-link" href="#" id="logout">Logout<span class="sr-only">(current)</span></a>
            </li>
        `;

        // Add logout functionality
        document.getElementById('logout').addEventListener('click', () => {
            auth.signOut().then(() => {
                location.reload();
            }).catch((error) => {
                console.error('Error signing out:', error);
            });
        });
    }
});