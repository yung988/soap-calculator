// Databáze pro ukládání receptů
class RecipesDB {
    constructor() {
        this.STORAGE_KEY = 'soap_calculator_recipes';
        this.recipes = this.loadRecipes();
    }

    // Načíst recepty z localStorage
    loadRecipes() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Chyba při načítání receptů:', error);
            return [];
        }
    }

    // Uložit recepty do localStorage
    saveRecipes() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.recipes));
            return true;
        } catch (error) {
            console.error('Chyba při ukládání receptů:', error);
            return false;
        }
    }

    // Přidat nový recept
    addRecipe(recipe) {
        const newRecipe = {
            id: Date.now().toString(),
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
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.recipes.push(newRecipe);
        this.saveRecipes();
        return newRecipe;
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
    updateRecipe(id, updates) {
        const index = this.recipes.findIndex(recipe => recipe.id === id);
        if (index !== -1) {
            this.recipes[index] = {
                ...this.recipes[index],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            this.saveRecipes();
            return this.recipes[index];
        }
        return null;
    }

    // Smazat recept
    deleteRecipe(id) {
        const index = this.recipes.findIndex(recipe => recipe.id === id);
        if (index !== -1) {
            const deleted = this.recipes.splice(index, 1);
            this.saveRecipes();
            return deleted[0];
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
