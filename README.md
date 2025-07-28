# 🧼 Kalkulačka výroby mýdla

Pokročilá webová aplikace pro výpočet receptů na výrobu mýdla studeným způsobem. Aplikace funguje offline a umožňuje ukládání vlastních receptů.

## ✨ Funkce

- **Přesné výpočty**: SAP hodnoty, množství NaOH, vody a olejů
- **Analýza kvality mýdla**: Tvrdost, čistící schopnost, kondicionování, pěnivost
- **Databáze olejů**: Vestavěné oleje + možnost přidání vlastních
- **Ukládání receptů**: Lokální databáze pro vaše recepty
- **Export/Import**: JSON formát pro zálohování a sdílení
- **Responsivní design**: Funguje na desktopu i mobilu
- **Offline použití**: Žádné internetové připojení není potřeba

## 🚀 Demo

Živá verze: [https://yung988.github.io/soap-calculator](https://yung988.github.io/soap-calculator)

## 📦 Instalace

### Lokální spuštění

1. Stáhněte nebo naklonujte repozitář:
```bash
git clone https://github.com/yung988/soap-calculator.git
cd soap-calculator
```

2. Otevřete `index.html` v prohlížeči

### GitHub Pages Deployment

1. Nahrajte kód na GitHub
2. Jděte do Settings → Pages
3. Vyberte Source: "Deploy from a branch"
4. Vyberte branch: "main" nebo "master"
5. Aplikace bude dostupná na: `https://yourusername.github.io/soap-calculator`

## 🛠️ Technologie

- **HTML5**: Sémantické značkování
- **CSS3**: Moderní design systém s dark/light mode
- **Vanilla JavaScript**: Žádné závislosti na frameworku
- **LocalStorage**: Lokální databáze pro recepty a oleje

## 📖 Použití

### Vytvoření receptu

1. **Základní nastavení**:
   - Vyberte typ zadání hmotnosti (oleje nebo celková dávka)
   - Zadejte požadovanou hmotnost
   - Nastavte superfat (0-15%)
   - Vyberte koncentraci louhu (25-50%)
   - Určete procento parfému/esenciálních olejů

2. **Složení olejů**:
   - Klikněte "Přidat olej" pro nový řádek
   - Vyberte olej z databáze
   - Zadejte procento (součet musí být 100%)
   - Hmotnosti se vypočítají automaticky

3. **Výsledky**:
   - Potřebné množství NaOH, vody a parfému
   - Analýza kvality mýdla
   - Poměr voda:louh

### Správa olejů

- **Přidat vlastní olej**: Zadejte SAP hodnotu a složení mastných kyselin
- **Import/Export**: JSON formát pro zálohování databáze olejů
- **Vyhledávání**: Rychlé najítí oleje podle názvu

### Ukládání receptů

- Recepty se automaticky ukládají do localStorage
- Export receptů do JSON souboru
- Import receptů ze zálohy

## 🔧 API Databáze

### RecipesDB třída

```javascript
// Přidání nového receptu
const recipe = recipesDB.addRecipe({
    name: "Můj recept",
    description: "Základní mýdlo",
    oils: [{name: "Olive Oil", percentage: 50}],
    // ... další parametry
});

// Získání všech receptů
const recipes = recipesDB.getAllRecipes();

// Vyhledání receptů
const found = recipesDB.searchRecipes("olivový");
```

## 📁 Struktura projektu

```
soap-calculator/
├── index.html          # Hlavní HTML soubor
├── app.js             # Hlavní JavaScript logika
├── db.js              # Databáze pro recepty
├── style.css          # Styly a design system
├── README.md          # Dokumentace
└── .github/
    └── workflows/
        └── deploy.yml # GitHub Actions pro deployment
```

## 🌟 Plánované funkce

- [ ] Cloud synchronizace receptů
- [ ] Pokročilé filtrování receptů
- [ ] Kalkulátor pro tekuté mýdla (KOH)
- [ ] Vícejazyčná podpora
- [ ] PWA funkcionalita
- [ ] Tisk optimalizovaných receptů

## 🤝 Přispívání

1. Forkněte repozitář
2. Vytvořte feature branch (`git checkout -b feature/AmazingFeature`)
3. Commitněte změny (`git commit -m 'Add some AmazingFeature'`)
4. Pushněte do branch (`git push origin feature/AmazingFeature`)
5. Otevřete Pull Request

## 📄 Licence

Tento projekt je licencován pod MIT licencí - viz [LICENSE](LICENSE) soubor.

## ⚠️ Upozornění

Tato aplikace je pouze výpočetní nástroj. Při výrobě mýdla vždy:

- Používejte ochranné pomůcky (brýle, rukavice)
- Pracujte ve větraném prostoru
- Dvakrát zkontrolujte všechny výpočty
- Dodržujte bezpečnostní postupy při práci s NaOH

## 📞 Kontakt

- GitHub: [@yung988](https://github.com/yung988)
- Issues: [GitHub Issues](https://github.com/yung988/soap-calculator/issues)

---

Vytvořeno s ❤️ pro mydlářskou komunitu
