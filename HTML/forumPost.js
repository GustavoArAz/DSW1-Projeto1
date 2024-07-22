// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

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
const database = getDatabase(app);

// Reference to the database
const forumFormDB = ref(database, 'forumForm');

// Submit button
const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
    event.preventDefault();

    // Inputs
    const title = document.getElementById('title').value;
    const dsc = document.getElementById('dsc').value;

    saveInputs(title, dsc);
    alert('Post enviado');
    window.location.href = "Tela Criacao Post Forum.html";
});

const saveInputs = (title, dsc) => {
    const newForumForm = push(forumFormDB);

    set(newForumForm, {
        title: title,
        dsc: dsc
    });
};