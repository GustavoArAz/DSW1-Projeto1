import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getDatabase, ref, onValue, query, limitToLast, update, remove } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

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

// Reference to the 'forumForm' node in the database
const forumFormRef = ref(database, 'forumForm');

// Query the last 5 entries from the 'forumForm' node
const recentPostsQuery = query(forumFormRef, limitToLast(5));

// Reference to the table body
const tableBody = document.querySelector(".table1");

// Fetch data from Firebase
onValue(recentPostsQuery, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // Clear existing table rows
        tableBody.innerHTML = '';
        // Loop through the data and create table rows
        Object.entries(data).forEach(([key, item]) => {
            const row = document.createElement('tr');

            const titleCell = document.createElement('th');
            const titleLink = document.createElement('a');
            titleLink.href = "Tela Forum.html";  // Adjust the link as needed
            titleLink.textContent = item.title;
            titleCell.appendChild(titleLink);

            const dscCell = document.createElement('th');
            dscCell.textContent = item.dsc;

            const editCell = document.createElement('th');
            const editButton = document.createElement('button');
            editButton.style.width = "100%";
            editButton.textContent = "Edit";
            editButton.addEventListener('click', () => editRow(key, row, item));
            editCell.appendChild(editButton);

            const deleteCell = document.createElement('th');
            const deleteButton = document.createElement('button');
            deleteButton.style.width = "100%";
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener('click', () => deleteItem(key));
            deleteCell.appendChild(deleteButton);

            row.appendChild(titleCell);
            row.appendChild(dscCell);
            row.appendChild(editCell);
            row.appendChild(deleteCell);

            tableBody.appendChild(row);
        });
    }
});

// Function to edit a row
function editRow(key, row, item) {
    row.innerHTML = '';

    const titleCell = document.createElement('th');
    const titleInput = document.createElement('input');
    titleInput.style.width = "100%";
    titleInput.type = 'text';
    titleInput.value = item.title;
    titleCell.appendChild(titleInput);

    const dscCell = document.createElement('th');
    const dscInput = document.createElement('input');
    dscInput.style.width = "100%";
    dscInput.type = 'text';
    dscInput.value = item.dsc;
    dscCell.appendChild(dscInput);

    const saveCell = document.createElement('th');
    const saveButton = document.createElement('button');
    saveButton.style.width = "60px";
    saveButton.textContent = "Save";
    saveButton.addEventListener('click', () => saveEdit(key, titleInput.value, dscInput.value));
    saveCell.appendChild(saveButton);

    row.appendChild(titleCell);
    row.appendChild(dscCell);
    row.appendChild(saveCell);
}

// Function to save the edited data
function saveEdit(key, title, dsc) {
    const updates = {};
    updates[`forumForm/${key}`] = { title, dsc };

    update(ref(database), updates)
        .then(() => {
            alert('Data updated successfully');
        })
        .catch((error) => {
            console.error('Error updating data:', error);
        });
}

// Function to delete an item
function deleteItem(key) {
    if (confirm('Are you sure you want to delete this item?')) {
        remove(ref(database, `forumForm/${key}`))
            .then(() => {
                alert('Data deleted successfully');
            })
            .catch((error) => {
                console.error('Error deleting data:', error);
            });
    }
}