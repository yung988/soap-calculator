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

// Inicializace služeb
const db = firebase.firestore();
const auth = firebase.auth();

// Auth providers
const googleProvider = new firebase.auth.GoogleAuthProvider();
const emailProvider = new firebase.auth.EmailAuthProvider();

// Auth UI Manager
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.authSection = document.getElementById('authSection');
        this.init();
    }

    init() {
        // Poslouchání změn autentifikace
        auth.onAuthStateChanged((user) => {
            this.currentUser = user;
            this.updateUI();
            console.log('Auth state changed:', user ? user.uid : 'No user');
        });

        // Automatické anonymní přihlášení při prvním načtení
        if (!auth.currentUser) {
            this.signInAnonymously();
        }
    }

    updateUI() {
        if (!this.authSection) return;

        if (this.currentUser) {
            // Uživatel je přihlášený
            const isAnonymous = this.currentUser.isAnonymous;
            const displayName = this.currentUser.displayName || 'Anonymní uživatel';
            const email = this.currentUser.email || '';
            const photoURL = this.currentUser.photoURL;

            this.authSection.innerHTML = `
                <div class="auth-info">
                    ${photoURL ? `<img src="${photoURL}" alt="Avatar" class="user-avatar">` : ''}
                    <span>${isAnonymous ? 'Anonymní uživatel' : (displayName || email)}</span>
                    <span class="auth-mode-badge">${isAnonymous ? 'Anonymní' : 'Přihlášený'}</span>
                </div>
                <div class="auth-options">
                    ${isAnonymous ? `
                        <button class="btn btn--sm btn--secondary" onclick="authManager.showLoginOptions()">Přihlásit se</button>
                    ` : `
                        <button class="btn btn--sm btn--secondary" onclick="authManager.signOut()">Odhlásit se</button>
                    `}
                </div>
            `;
        } else {
            // Uživatel není přihlášený
            this.authSection.innerHTML = `
                <div class="auth-options">
                    <button class="btn btn--sm btn--secondary" onclick="authManager.signInAnonymously()">Pokračovat anonymně</button>
                    <button class="btn btn--sm btn--primary" onclick="authManager.showLoginOptions()">Přihlásit se</button>
                </div>
            `;
        }
    }

    showLoginOptions() {
        const options = [
            { text: 'Přihlásit přes Google', action: () => this.signInWithGoogle() },
            { text: 'Přihlásit emailem', action: () => this.showEmailLogin() },
            { text: 'Pokračovat anonymně', action: () => this.signInAnonymously() }
        ];

        let optionsHtml = options.map(option => 
            `<button class="btn btn--secondary" style="margin: 4px; width: 200px;" onclick="${option.action.toString().replace('() => this.', 'authManager.')}">${option.text}</button>`
        ).join('');

        // Vytvoření jednoduchého modalu
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 400px;">
                <div class="modal-header">
                    <h2>Vyberte způsob přihlášení</h2>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body" style="text-align: center;">
                    <p>Přihlášením si můžete uložit recepty a synchronizovat je mezi zařízeními.</p>
                    ${optionsHtml}
                </div>
            </div>
        `;
        
        // Zavření modalu kliknutím mimo
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.body.appendChild(modal);
    }

    showEmailLogin() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 400px;">
                <div class="modal-header">
                    <h2>Přihlášení emailem</h2>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="emailLoginForm">
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="email" id="loginEmail" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Heslo</label>
                            <input type="password" id="loginPassword" class="form-control" required>
                        </div>
                        <div style="display: flex; gap: 8px; margin-top: 16px;">
                            <button type="submit" class="btn btn--primary">Přihlásit se</button>
                            <button type="button" class="btn btn--secondary" onclick="authManager.signUpWithEmail()">Registrovat se</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        const form = modal.querySelector('#emailLoginForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            this.signInWithEmail(email, password);
            modal.remove();
        });
        
        document.body.appendChild(modal);
    }

    async signInAnonymously() {
        try {
            await auth.signInAnonymously();
            console.log('Anonymní přihlášení úspěšné');
        } catch (error) {
            console.error('Chyba při anonymním přihlášení:', error);
            alert('Chyba při anonymním přihlášení: ' + error.message);
        }
    }

    async signInWithGoogle() {
        try {
            await auth.signInWithPopup(googleProvider);
            console.log('Google přihlášení úspěšné');
        } catch (error) {
            console.error('Chyba při Google přihlášení:', error);
            alert('Chyba při Google přihlášení: ' + error.message);
        }
    }

    async signInWithEmail(email, password) {
        try {
            await auth.signInWithEmailAndPassword(email, password);
            console.log('Email přihlášení úspěšné');
        } catch (error) {
            console.error('Chyba při email přihlášení:', error);
            alert('Chyba při email přihlášení: ' + error.message);
        }
    }

    async signUpWithEmail() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (!email || !password) {
            alert('Prosím vyplňte email a heslo');
            return;
        }
        
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            console.log('Registrace úspěšná');
        } catch (error) {
            console.error('Chyba při registraci:', error);
            alert('Chyba při registraci: ' + error.message);
        }
    }

    async signOut() {
        try {
            await auth.signOut();
            console.log('Odhlášení úspěšné');
            // Po odhlášení automaticky přihlásit anonymně
            setTimeout(() => this.signInAnonymously(), 500);
        } catch (error) {
            console.error('Chyba při odhlášení:', error);
            alert('Chyba při odhlášení: ' + error.message);
        }
    }
}

// Inicializace auth manageru
const authManager = new AuthManager();

console.log('Firebase je inicializován pro projekt:', firebaseConfig.projectId);
