// Firebase konfigurace pro Soap Calculator Plus
const firebaseConfig = {
    apiKey: "AIzaSyCNmpIv_emy31E4zrN_er-dw1hNk4YTJls",
    authDomain: "soap-calc-plus-1753694585.firebaseapp.com",
    projectId: "soap-calc-plus-1753694585",
    storageBucket: "soap-calc-plus-1753694585.firebasestorage.app",
    messagingSenderId: "851993744585",
    appId: "1:851993744585:web:6d156d5933a21a485ce918"
};

// Inicializace Firebase
firebase.initializeApp(firebaseConfig);

// Inicializace Firestore
const db = firebase.firestore();

console.log('Firebase je inicializován pro projekt:', firebaseConfig.projectId);
