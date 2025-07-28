// Databáze pro ukládání receptů - Firebase Firestore
class RecipesDB {
    constructor() {
        this.collection = 'recipes';
        this.recipes = [];
        this.isOnline = navigator.onLine;
        this.STORAGE_KEY = 'soap_calculator_recipes_offline';
        
        // Načíst data při inicializaci
        this.loadRecipes();
        
        // Sledovat stav připojení
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.syncOfflineData();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
    }

    // Načíst recepty z Firestore nebo localStorage (offline)
    async loadRecipes() {
        try {
            if (this.isOnline && typeof db !== 'undefined') {
                const snapshot = await db.collection(this.collection).orderBy('createdAt', 'desc').get();
                this.recipes = [];
                snapshot.forEach(doc => {
                    this.recipes.push({ id: doc.id, ...doc.data() });
                });
                
                // Uložit do localStorage pro offline použití
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.recipes));
                console.log('Recepty načteny z Firebase:', this.recipes.length);
            } else {
                // Offline režim - načíst z localStorage
                const stored = localStorage.getItem(this.STORAGE_KEY);
                this.recipes = stored ? JSON.parse(stored) : [];
                console.log('Recepty načteny offline:', this.recipes.length);
            }
        } catch (error) {
            console.error('Chyba při načítání receptů z Firebase:', error);
            // Fallback na localStorage
            const stored = localStorage.getItem(this.STORAGE_KEY);
            this.recipes = stored ? JSON.parse(stored) : [];
        }
        return this.recipes;
    }

    // Synchronizovat offline data s Firebase
    async syncOfflineData() {
        const offlineData = localStorage.getItem(this.STORAGE_KEY + '_pending');
        if (offlineData) {
            try {
                const pendingRecipes = JSON.parse(offlineData);
                for (const recipe of pendingRecipes) {
                    await db.collection(this.collection).add(recipe);
                }
                localStorage.removeItem(this.STORAGE_KEY + '_pending');
                await this.loadRecipes(); // Znovu načíst data
                console.log('Offline data synchronizována');
            } catch (error) {
                console.error('Chyba při synchronizaci offline dat:', error);
            }
        }
    }

    // Přidat nový recept
    async addRecipe(recipe) {
        const newRecipe = {
            name: recipe.name,
            description: recipe.description || '',
            oils: recipe.oils, // pole s oleji a procenty
            totalWeight: recipe.totalWeight,
            weightType: recipe.weightType,
            superfat: recipe.superfat,
            concentration: recipe.concentration,
            fragrance: recipe.fragrance,
            results: recipe.results, // vypočítané hodnoty
            quality: recipe.quality, // kvalita mýdla
            createdAt: firebase.firestore.Timestamp.now(),
            updatedAt: firebase.firestore.Timestamp.now()
        };

        try {
            if (this.isOnline && typeof db !== 'undefined') {
                // Online - uložit do Firebase
                const docRef = await db.collection(this.collection).add(newRecipe);
                const savedRecipe = { id: docRef.id, ...newRecipe };
                this.recipes.unshift(savedRecipe);
                
                // Aktualizovat offline cache
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.recipes));
                console.log('Recept uložen do Firebase:', savedRecipe.id);
                return savedRecipe;
            } else {
                // Offline - uložit lokálně pro pozdější sync
                const tempId = 'temp_' + Date.now().toString();
                const offlineRecipe = { id: tempId, ...newRecipe };
                this.recipes.unshift(offlineRecipe);
                
                // Uložit do offline cache
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.recipes));
                
                // Přidat do pending synchronizace
                const pendingData = localStorage.getItem(this.STORAGE_KEY + '_pending');
                const pending = pendingData ? JSON.parse(pendingData) : [];
                pending.push(newRecipe);
                localStorage.setItem(this.STORAGE_KEY + '_pending', JSON.stringify(pending));
                
                console.log('Recept uložen offline:', tempId);
                return offlineRecipe;
            }
        } catch (error) {
            console.error('Chyba při ukládání receptu:', error);
            throw error;
        }
    }

    // Získat všechny recepty
    getAllRecipes() {
        return [...this.recipes];
    }

    // Získat recept podle ID
    getRecipeById(id) {
        return this.recipes.find(recipe => recipe.id === id);
    }

    // Aktualizovat recept
    async updateRecipe(id, updates) {
        const index = this.recipes.findIndex(recipe => recipe.id === id);
        if (index !== -1) {
            const updatedRecipe = {
                ...this.recipes[index],
                ...updates,
                updatedAt: firebase.firestore.Timestamp.now()
            };
            
            try {
                if (this.isOnline && typeof db !== 'undefined' && !id.startsWith('temp_')) {
                    // Online - aktualizovat v Firebase
                    await db.collection(this.collection).doc(id).update({
                        ...updates,
                        updatedAt: firebase.firestore.Timestamp.now()
                    });
                    console.log('Recept aktualizován v Firebase:', id);
                }
                
                // Aktualizovat lokální data
                this.recipes[index] = updatedRecipe;
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.recipes));
                
                return updatedRecipe;
            } catch (error) {
                console.error('Chyba při aktualizaci receptu:', error);
                throw error;
            }
        }
        return null;
    }

    // Smazat recept
    async deleteRecipe(id) {
        const index = this.recipes.findIndex(recipe => recipe.id === id);
        if (index !== -1) {
            const deleted = this.recipes[index];
            
            try {
                if (this.isOnline && typeof db !== 'undefined' && !id.startsWith('temp_')) {
                    // Online - smazat z Firebase
                    await db.collection(this.collection).doc(id).delete();
                    console.log('Recept smazán z Firebase:', id);
                }
                
                // Smazat z lokálních dat
                this.recipes.splice(index, 1);
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.recipes));
                
                return deleted;
            } catch (error) {
                console.error('Chyba při mazání receptu:', error);
                throw error;
            }
        }
        return null;
    }

    // Vyhledat recepty podle názvu
    searchRecipes(query) {
        const searchTerm = query.toLowerCase();
        return this.recipes.filter(recipe => 
            recipe.name.toLowerCase().includes(searchTerm) ||
            recipe.description.toLowerCase().includes(searchTerm)
        );
    }

    // Export receptů do JSON
    exportRecipes() {
        return {
            recipes: this.recipes,
            exportedAt: new Date().toISOString(),
            version: '1.0'
        };
    }

    // Import receptů z JSON
    importRecipes(data) {
        try {
            if (!data.recipes || !Array.isArray(data.recipes)) {
                throw new Error('Neplatný formát dat');
            }

            // Validace každého receptu
            const validRecipes = data.recipes.filter(recipe => {
                return recipe.name && recipe.oils && Array.isArray(recipe.oils);
            });

            // Přidat nové recepty (s novými ID aby se zabránilo konfliktům)
            const importedRecipes = validRecipes.map(recipe => ({
                ...recipe,
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                importedAt: new Date().toISOString()
            }));

            this.recipes.push(...importedRecipes);
            this.saveRecipes();
            
            return {
                success: true,
                imported: importedRecipes.length,
                total: validRecipes.length
            };
        } catch (error) {
            console.error('Chyba při importu receptů:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Vymazat všechny recepty
    clearAllRecipes() {
        this.recipes = [];
        this.saveRecipes();
    }
}

// Globální instance databáze
const recipesDB = new RecipesDB();
