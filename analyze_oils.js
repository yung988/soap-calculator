// Analýza olejů - porovnání naší databáze s LyeCalc.com

// Naše současná databáze (z app.js)
const currentOils = [
    "Coconut Oil 76°", "Palm Oil", "Olive Oil", "Shea Butter", "Castor Oil", 
    "Sunflower Oil HO", "Rice Bran Oil", "Cocoa Butter", "Avocado Oil", "Sweet Almond Oil",
    "Babassu Oil", "Hemp Seed Oil", "Jojoba Oil", "Lard", "Beef Tallow", 
    "Mango Butter", "Kokum Butter", "Neem Oil", "Argan Oil", "Walnut Oil",
    "Canola Oil", "Grapeseed Oil", "Safflower Oil HO", "Sesame Oil", "Linseed (Flax) Oil",
    "Macadamia Oil", "Pumpkin Seed Oil", "Peanut Oil", "Soybean Oil", "Wheatgerm Oil",
    "Camelina Oil", "Meadowfoam Oil", "Cupuacu Butter", "Murumuru Butter", "Kukui Nut Oil",
    "Tamanu Oil", "Sal Butter", "Illipe Butter", "Cocoa Butter Deodorized"
];

// LyeCalc oleje (načteme ze souboru)
const fs = require('fs');
const lyeCalcOils = JSON.parse(fs.readFileSync('lyecalc_oils_scraped.json', 'utf8'));

console.log('=== ANALÝZA DATABÁZÍ OLEJŮ ===\n');
console.log(`Naše aktuální databáze: ${currentOils.length} olejů`);
console.log(`LyeCalc databáze: ${lyeCalcOils.length} olejů\n`);

// Normalizace názvů pro porovnání
function normalize(name) {
    return name.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

// Vytvoříme mapu normalizovaných názvů
const currentNormalized = currentOils.map(oil => ({
    original: oil,
    normalized: normalize(oil)
}));

const lyeCalcNormalized = lyeCalcOils.map(oil => ({
    original: oil,
    normalized: normalize(oil)
}));

// Najdeme nové oleje které máme my, ale LyeCalc nemá
console.log('🟢 OLEJE KTERÉ MÁME MY, ALE LYECALC NEMÁ:');
const missingInLyeCalc = currentNormalized.filter(ourOil => 
    !lyeCalcNormalized.some(lyeOil => lyeOil.normalized.includes(ourOil.normalized.split(' ')[0]))
);
missingInLyeCalc.forEach(oil => console.log(`  - ${oil.original}`));

console.log('\n🔴 TOP PRIORITY OLEJE K PŘIDÁNÍ (populární + exotické):');
const priorityOils = [
    "Abyssinian Seed Oil",
    "Algae Oil", 
    "Aloe Vera Butter",
    "Apricot Kernel Oil",
    "Baobab Oil",
    "Black Cumin Seed Oil",
    "Borage Seed Oil",
    "Brazil Nut Oil",
    "Broccoli Seed Oil",
    "Camellia Seed Oil",
    "Cherry Kernel Oil (P. Avium)",
    "Emu Oil",
    "Evening Primrose",
    "Hazelnut Oil",
    "Marula Kernel Oil",
    "Moringa Oil",
    "Peach Kernel Oil",
    "Pomegranate Seed Oil",
    "Raspberry Seed Oil",
    "Rosehip Seed Oil",
    "Seabuckthorn Oil (Seed)",
    "Watermelon Seed Oil"
];

priorityOils.forEach(oil => console.log(`  - ${oil}`));

console.log('\n🟡 BUTTER & EXOTIC OLEJE:');
const exoticOils = lyeCalcOils.filter(oil => 
    oil.includes('Butter') && !currentOils.some(current => 
        normalize(current).includes(normalize(oil.replace(' Butter', '')).split(' ')[0])
    )
).slice(0, 15);
exoticOils.forEach(oil => console.log(`  - ${oil}`));

console.log('\n📊 STATISTIKY:');
console.log(`Celkem nových olejů k přidání: ${lyeCalcOils.length - currentOils.length}`);
console.log(`Top priority: ${priorityOils.length} olejů`);
console.log(`Exotic butters: ${exoticOils.length} olejů`);

// Vytvoříme seznam pro implementaci
const oilsToAdd = [...priorityOils, ...exoticOils].slice(0, 50);
console.log(`\n🎯 DOPORUČENÍ: Přidat prvních ${oilsToAdd.length} olejů z tohoto seznamu`);

// Uložíme seznam prioritních olejů
fs.writeFileSync('oils_to_add.json', JSON.stringify(oilsToAdd, null, 2));
console.log('✅ Seznam uložen do oils_to_add.json');
