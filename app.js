// Databáze olejů s přesnými SAP hodnotami
let oilsDatabase = [
    {"name":"Coconut Oil 76°","sap_naoh":0.183,"lauric":48,"myristic":19,"palmitic":9,"stearic":3,"ricinoleic":0,"oleic":8,"linoleic":2,"linolenic":0,"builtin":true},
    {"name":"Palm Oil","sap_naoh":0.141,"lauric":0,"myristic":1,"palmitic":44,"stearic":5,"ricinoleic":0,"oleic":38,"linoleic":10,"linolenic":0,"builtin":true},
    {"name":"Olive Oil","sap_naoh":0.134,"lauric":0,"myristic":0,"palmitic":12,"stearic":3,"ricinoleic":0,"oleic":71,"linoleic":12,"linolenic":1,"builtin":true},
    {"name":"Shea Butter","sap_naoh":0.128,"lauric":0,"myristic":0,"palmitic":4,"stearic":41,"ricinoleic":0,"oleic":46,"linoleic":6,"linolenic":0,"builtin":true},
    {"name":"Castor Oil","sap_naoh":0.128,"lauric":0,"myristic":0,"palmitic":2,"stearic":1,"ricinoleic":90,"oleic":5,"linoleic":1,"linolenic":0,"builtin":true},
    {"name":"Sunflower Oil HO","sap_naoh":0.134,"lauric":0,"myristic":0,"palmitic":4,"stearic":2,"ricinoleic":0,"oleic":82,"linoleic":12,"linolenic":0,"builtin":true},
    {"name":"Rice Bran Oil","sap_naoh":0.128,"lauric":0,"myristic":0,"palmitic":20,"stearic":2,"ricinoleic":0,"oleic":43,"linoleic":34,"linolenic":1,"builtin":true},
    {"name":"Cocoa Butter","sap_naoh":0.138,"lauric":0,"myristic":0,"palmitic":25,"stearic":35,"ricinoleic":0,"oleic":34,"linoleic":3,"linolenic":0,"builtin":true},
    {"name":"Avocado Oil","sap_naoh":0.133,"lauric":0,"myristic":0,"palmitic":12,"stearic":2,"ricinoleic":0,"oleic":64,"linoleic":19,"linolenic":1,"builtin":true},
    {"name":"Sweet Almond Oil","sap_naoh":0.139,"lauric":0,"myristic":0,"palmitic":6,"stearic":2,"ricinoleic":0,"oleic":69,"linoleic":23,"linolenic":0,"builtin":true},
    {"name":"Babassu Oil","sap_naoh":0.175,"lauric":45,"myristic":16,"palmitic":10,"stearic":5,"ricinoleic":0,"oleic":15,"linoleic":3,"linolenic":0,"builtin":true},
    {"name":"Hemp Seed Oil","sap_naoh":0.135,"lauric":0,"myristic":0,"palmitic":5,"stearic":2,"ricinoleic":0,"oleic":13,"linoleic":56,"linolenic":22,"builtin":true},
    {"name":"Jojoba Oil","sap_naoh":0.069,"lauric":0,"myristic":0,"palmitic":2,"stearic":1,"ricinoleic":0,"oleic":10,"linoleic":5,"linolenic":0,"builtin":true},
    {"name":"Lard","sap_naoh":0.138,"lauric":0,"myristic":1,"palmitic":26,"stearic":14,"ricinoleic":0,"oleic":44,"linoleic":10,"linolenic":0,"builtin":true},
    {"name":"Beef Tallow","sap_naoh":0.140,"lauric":0,"myristic":3,"palmitic":24,"stearic":20,"ricinoleic":0,"oleic":43,"linoleic":3,"linolenic":0,"builtin":true},
    {"name":"Mango Butter","sap_naoh":0.137,"lauric":0,"myristic":0,"palmitic":10,"stearic":45,"ricinoleic":0,"oleic":40,"linoleic":5,"linolenic":0,"builtin":true},
    {"name":"Kokum Butter","sap_naoh":0.134,"lauric":0,"myristic":0,"palmitic":10,"stearic":60,"ricinoleic":0,"oleic":28,"linoleic":2,"linolenic":0,"builtin":true},
    {"name":"Neem Oil","sap_naoh":0.138,"lauric":0,"myristic":0,"palmitic":16,"stearic":14,"ricinoleic":0,"oleic":50,"linoleic":15,"linolenic":1,"builtin":true},
    {"name":"Argan Oil","sap_naoh":0.136,"lauric":0,"myristic":0,"palmitic":12,"stearic":6,"ricinoleic":0,"oleic":46,"linoleic":32,"linolenic":0,"builtin":true},
    {"name":"Walnut Oil","sap_naoh":0.135,"lauric":0,"myristic":0,"palmitic":6,"stearic":2,"ricinoleic":0,"oleic":22,"linoleic":52,"linolenic":14,"builtin":true},
    {"name":"Canola Oil","sap_naoh":0.124,"lauric":0,"myristic":0,"palmitic":4,"stearic":2,"ricinoleic":0,"oleic":62,"linoleic":20,"linolenic":9,"builtin":true},
    {"name":"Grapeseed Oil","sap_naoh":0.127,"lauric":0,"myristic":0,"palmitic":7,"stearic":4,"ricinoleic":0,"oleic":16,"linoleic":70,"linolenic":1,"builtin":true},
    {"name":"Safflower Oil HO","sap_naoh":0.135,"lauric":0,"myristic":0,"palmitic":6,"stearic":2,"ricinoleic":0,"oleic":78,"linoleic":14,"linolenic":0,"builtin":true},
    {"name":"Sesame Oil","sap_naoh":0.133,"lauric":0,"myristic":0,"palmitic":8,"stearic":4,"ricinoleic":0,"oleic":40,"linoleic":46,"linolenic":0,"builtin":true},
    {"name":"Linseed (Flax) Oil","sap_naoh":0.136,"lauric":0,"myristic":0,"palmitic":6,"stearic":3,"ricinoleic":0,"oleic":18,"linoleic":16,"linolenic":53,"builtin":true},
    {"name":"Macadamia Oil","sap_naoh":0.139,"lauric":0,"myristic":2,"palmitic":9,"stearic":3,"ricinoleic":0,"oleic":60,"linoleic":1,"linolenic":0,"builtin":true},
    {"name":"Pumpkin Seed Oil","sap_naoh":0.133,"lauric":0,"myristic":0,"palmitic":13,"stearic":6,"ricinoleic":0,"oleic":30,"linoleic":45,"linolenic":0,"builtin":true},
    {"name":"Peanut Oil","sap_naoh":0.136,"lauric":0,"myristic":0,"palmitic":11,"stearic":3,"ricinoleic":0,"oleic":48,"linoleic":32,"linolenic":0,"builtin":true},
    {"name":"Soybean Oil","sap_naoh":0.136,"lauric":0,"myristic":0,"palmitic":10,"stearic":4,"ricinoleic":0,"oleic":23,"linoleic":53,"linolenic":7,"builtin":true},
    {"name":"Wheatgerm Oil","sap_naoh":0.131,"lauric":0,"myristic":0,"palmitic":16,"stearic":2,"ricinoleic":0,"oleic":15,"linoleic":55,"linolenic":7,"builtin":true},
    {"name":"Camelina Oil","sap_naoh":0.125,"lauric":0,"myristic":0,"palmitic":6,"stearic":2,"ricinoleic":0,"oleic":15,"linoleic":18,"linolenic":38,"builtin":true},
    {"name":"Meadowfoam Oil","sap_naoh":0.077,"lauric":0,"myristic":0,"palmitic":1,"stearic":1,"ricinoleic":0,"oleic":10,"linoleic":2,"linolenic":0,"builtin":true},
    {"name":"Cupuacu Butter","sap_naoh":0.173,"lauric":0,"myristic":0,"palmitic":17,"stearic":36,"ricinoleic":0,"oleic":48,"linoleic":0,"linolenic":0,"builtin":true},
    {"name":"Murumuru Butter","sap_naoh":0.178,"lauric":47,"myristic":23,"palmitic":5,"stearic":3,"ricinoleic":0,"oleic":15,"linoleic":0,"linolenic":0,"builtin":true},
    {"name":"Kukui Nut Oil","sap_naoh":0.190,"lauric":0,"myristic":0,"palmitic":6,"stearic":1,"ricinoleic":0,"oleic":22,"linoleic":42,"linolenic":30,"builtin":true},
    {"name":"Tamanu Oil","sap_naoh":0.140,"lauric":0,"myristic":0,"palmitic":14,"stearic":13,"ricinoleic":0,"oleic":49,"linoleic":21,"linolenic":0,"builtin":true},
    {"name":"Sal Butter","sap_naoh":0.128,"lauric":0,"myristic":0,"palmitic":4,"stearic":50,"ricinoleic":0,"oleic":40,"linoleic":6,"linolenic":0,"builtin":true},
    {"name":"Illipe Butter","sap_naoh":0.126,"lauric":0,"myristic":0,"palmitic":16,"stearic":40,"ricinoleic":0,"oleic":40,"linoleic":4,"linolenic":0,"builtin":true},
    {"name":"Cocoa Butter Deodorized","sap_naoh":0.138,"lauric":0,"myristic":0,"palmitic":25,"stearic":35,"ricinoleic":0,"oleic":34,"linoleic":3,"linolenic":0,"builtin":true}
];

// Globální proměnné
let oilRows = [];
let currentRowId = 0;
let editingOilIndex = -1;

// Inicializace aplikace
function initializeApp() {
    console.log('Inicializace aplikace...');
    
    // Přidat první řádek oleje
    addOilRow();
    
    // Event listenery pro základní vstupy
    setupEventListeners();
    
    // Počáteční výpočty
    updateWaterLyeRatio();
    calculateResults();
    updateOilsList();
    
    console.log('Aplikace inicializována');
}

function setupEventListeners() {
    // Základní vstupy
    const weightTypeRadios = document.querySelectorAll('input[name="weightType"]');
    weightTypeRadios.forEach(radio => {
        radio.addEventListener('change', handleWeightTypeChange);
    });
    
    const weightInput = document.getElementById('weightInput');
    const superfatSlider = document.getElementById('superfatSlider');
    const concentrationSlider = document.getElementById('concentrationSlider');
    const fragranceSlider = document.getElementById('fragranceSlider');
    
    if (weightInput) weightInput.addEventListener('input', calculateResults);
    if (superfatSlider) superfatSlider.addEventListener('input', handleSuperfatChange);
    if (concentrationSlider) concentrationSlider.addEventListener('input', handleConcentrationChange);
    if (fragranceSlider) fragranceSlider.addEventListener('input', handleFragranceChange);
    
    // Tlačítka
    const addOilBtn = document.getElementById('addOilBtn');
    const printBtn = document.getElementById('printBtn');
    const manageOilsBtn = document.getElementById('manageOilsBtn');
    
    if (addOilBtn) addOilBtn.addEventListener('click', addOilRow);
    if (printBtn) printBtn.addEventListener('click', () => window.print());
    if (manageOilsBtn) manageOilsBtn.addEventListener('click', openManageOilsModal);
    
    // Modal event listenery
    setupModalEventListeners();
}

function setupModalEventListeners() {
    // Manage Oils Modal
    const closeModalBtn = document.getElementById('closeModalBtn');
    const addNewOilBtn = document.getElementById('addNewOilBtn');
    const exportOilsBtn = document.getElementById('exportOilsBtn');
    const importOilsBtn = document.getElementById('importOilsBtn');
    const oilSearchInput = document.getElementById('oilSearchInput');
    const manageOilsModal = document.getElementById('manageOilsModal');
    
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeManageOilsModal);
    if (addNewOilBtn) addNewOilBtn.addEventListener('click', () => openEditOilModal());
    if (exportOilsBtn) exportOilsBtn.addEventListener('click', exportOilsToJson);
    if (importOilsBtn) importOilsBtn.addEventListener('click', openImportJsonModal);
    if (oilSearchInput) oilSearchInput.addEventListener('input', filterOilsList);
    
    // Edit Oil Modal
    const closeEditModalBtn = document.getElementById('closeEditModalBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const editOilForm = document.getElementById('editOilForm');
    const editOilModal = document.getElementById('editOilModal');
    
    if (closeEditModalBtn) closeEditModalBtn.addEventListener('click', closeEditOilModal);
    if (cancelEditBtn) cancelEditBtn.addEventListener('click', closeEditOilModal);
    if (editOilForm) editOilForm.addEventListener('submit', saveOil);
    
    // Import JSON Modal
    const closeImportModalBtn = document.getElementById('closeImportModalBtn');
    const cancelImportBtn = document.getElementById('cancelImportBtn');
    const loadJsonBtn = document.getElementById('loadJsonBtn');
    const importJsonModal = document.getElementById('importJsonModal');
    
    if (closeImportModalBtn) closeImportModalBtn.addEventListener('click', closeImportJsonModal);
    if (cancelImportBtn) cancelImportBtn.addEventListener('click', closeImportJsonModal);
    if (loadJsonBtn) loadJsonBtn.addEventListener('click', importOilsFromJson);
    
    // Zavírání modálů kliknutím mimo
    if (manageOilsModal) {
        manageOilsModal.addEventListener('click', (e) => {
            if (e.target === manageOilsModal) closeManageOilsModal();
        });
    }
    if (editOilModal) {
        editOilModal.addEventListener('click', (e) => {
            if (e.target === editOilModal) closeEditOilModal();
        });
    }
    if (importJsonModal) {
        importJsonModal.addEventListener('click', (e) => {
            if (e.target === importJsonModal) closeImportJsonModal();
        });
    }
}

function handleWeightTypeChange() {
    const selectedType = document.querySelector('input[name="weightType"]:checked').value;
    const weightLabel = document.getElementById('weightLabel');
    
    if (weightLabel) {
        if (selectedType === 'oils') {
            weightLabel.textContent = 'Hmotnost olejů (g):';
        } else {
            weightLabel.textContent = 'Celková hmotnost dávky (g):';
        }
    }
    calculateResults();
}

function handleSuperfatChange() {
    const superfatSlider = document.getElementById('superfatSlider');
    const superfatValue = document.getElementById('superfatValue');
    
    if (superfatSlider && superfatValue) {
        const value = parseFloat(superfatSlider.value);
        superfatValue.textContent = value;
        calculateResults();
    }
}

function handleConcentrationChange() {
    const concentrationSlider = document.getElementById('concentrationSlider');
    const concentrationValue = document.getElementById('concentrationValue');
    
    if (concentrationSlider && concentrationValue) {
        const value = parseFloat(concentrationSlider.value);
        concentrationValue.textContent = value;
        updateWaterLyeRatio();
        calculateResults();
    }
}

function handleFragranceChange() {
    const fragranceSlider = document.getElementById('fragranceSlider');
    const fragranceValue = document.getElementById('fragranceValue');
    
    if (fragranceSlider && fragranceValue) {
        const value = parseFloat(fragranceSlider.value);
        fragranceValue.textContent = value;
        calculateResults();
    }
}

function updateWaterLyeRatio() {
    const concentrationSlider = document.getElementById('concentrationSlider');
    const waterLyeRatio = document.getElementById('waterLyeRatio');
    
    if (concentrationSlider && waterLyeRatio) {
        const concentration = parseFloat(concentrationSlider.value);
        const ratio = (100 / concentration - 1);
        waterLyeRatio.textContent = ratio.toFixed(2);
    }
}

function addOilRow() {
    const rowId = currentRowId++;
    const oilsTableBody = document.getElementById('oilsTableBody');
    
    if (!oilsTableBody) return;
    
    const row = document.createElement('tr');
    row.setAttribute('data-row-id', rowId);
    
    row.innerHTML = `
        <td>
            <select class="oil-select" data-row-id="${rowId}">
                <option value="">Vyberte olej...</option>
                ${oilsDatabase.map(oil => `<option value="${oil.name}">${oil.name}</option>`).join('')}
            </select>
        </td>
        <td>
            <input type="number" class="percentage-input" data-row-id="${rowId}" min="0" max="100" step="0.1" value="" placeholder="0">
        </td>
        <td>
            <input type="number" class="grams-input readonly-input" data-row-id="${rowId}" readonly placeholder="0">
        </td>
        <td>
            <button type="button" class="delete-btn" data-row-id="${rowId}">Smazat</button>
        </td>
    `;
    
    oilsTableBody.appendChild(row);
    
    // Event listenery pro nový řádek
    const oilSelect = row.querySelector('.oil-select');
    const percentageInput = row.querySelector('.percentage-input');
    const deleteBtn = row.querySelector('.delete-btn');
    
    if (oilSelect) oilSelect.addEventListener('change', calculateResults);
    if (percentageInput) percentageInput.addEventListener('input', calculateResults);
    if (deleteBtn) deleteBtn.addEventListener('click', () => deleteOilRow(rowId));
    
    // Přidat do pole řádků
    oilRows.push({
        id: rowId,
        element: row,
        oilSelect: oilSelect,
        percentageInput: percentageInput
    });
    
    console.log('Přidán nový řádek oleje:', rowId);
}

function deleteOilRow(rowId) {
    const rowIndex = oilRows.findIndex(row => row.id === rowId);
    if (rowIndex !== -1) {
        oilRows[rowIndex].element.remove();
        oilRows.splice(rowIndex, 1);
        calculateResults();
        console.log('Smazán řádek oleje:', rowId);
    }
}

function calculateResults() {
    console.log('Provádím výpočty...');
    
    // Získat základní hodnoty
    const weightType = document.querySelector('input[name="weightType"]:checked')?.value || 'oils';
    const weightInput = document.getElementById('weightInput');
    const superfatSlider = document.getElementById('superfatSlider');
    const concentrationSlider = document.getElementById('concentrationSlider');
    const fragranceSlider = document.getElementById('fragranceSlider');
    
    const inputWeight = parseFloat(weightInput?.value) || 0;
    const superfat = parseFloat(superfatSlider?.value) / 100 || 0.05;
    const concentration = parseFloat(concentrationSlider?.value) / 100 || 0.33;
    const fragrancePercent = parseFloat(fragranceSlider?.value) / 100 || 0.03;
    
    // Získat data o olejích a procentech
    const oilsData = [];
    let totalPercent = 0;
    
    oilRows.forEach(row => {
        const oilName = row.oilSelect?.value;
        const percentage = parseFloat(row.percentageInput?.value) || 0;
        
        if (oilName && percentage > 0) {
            const oilInfo = oilsDatabase.find(oil => oil.name === oilName);
            if (oilInfo) {
                oilsData.push({
                    ...oilInfo,
                    percentage: percentage
                });
                totalPercent += percentage;
            }
        }
    });
    
    // Aktualizovat zobrazení celkového procenta
    const totalPercentage = document.getElementById('totalPercentage');
    const percentageWarning = document.getElementById('percentageWarning');
    
    if (totalPercentage) totalPercentage.textContent = totalPercent.toFixed(1);
    
    // Zkontrolovat, zda je součet 100%
    const isValid = Math.abs(totalPercent - 100) <= 0.1;
    
    if (percentageWarning) {
        if (isValid) {
            percentageWarning.classList.add('hidden');
        } else {
            percentageWarning.classList.remove('hidden');
        }
    }
    
    // Aktualizovat gramy v tabulce
    updateTableGrams(inputWeight, totalPercent, weightType, superfat, concentration, oilsData);
    
    // Pokud není validní nebo nemáme data, vymazat výsledky
    if (!isValid || oilsData.length === 0 || inputWeight < 100) {
        clearResults();
        return;
    }
    
    // Vypočítat SAP mix
    const sapMix = oilsData.reduce((sum, oil) => {
        return sum + (oil.percentage / 100) * oil.sap_naoh;
    }, 0);
    
    // Vypočítat hmotnost olejů
    let oilsWeight;
    if (weightType === 'oils') {
        oilsWeight = inputWeight;
    } else {
        oilsWeight = inputWeight / (1 + sapMix * (1 - superfat) * (1 / concentration));
    }
    
    // Výpočty
    const naohWeight = oilsWeight * sapMix * (1 - superfat);
    const waterWeight = naohWeight * (1 / concentration - 1);
    const fragranceWeight = oilsWeight * fragrancePercent;
    const finalBatchWeight = oilsWeight + naohWeight + waterWeight + fragranceWeight;
    const waterLyeRatioValue = waterWeight / naohWeight;
    
    // Aktualizovat výsledky
    updateResultsDisplay(oilsWeight, naohWeight, waterWeight, fragranceWeight, finalBatchWeight, waterLyeRatioValue);
    
    // Vypočítat kvalitu mýdla
    calculateSoapQuality(oilsData);
    
    console.log('Výpočty dokončeny');
}

function updateTableGrams(inputWeight, totalPercent, weightType, superfat, concentration, oilsData) {
    if (inputWeight >= 100) {
        let currentSapMix = 0;
        if (oilsData.length > 0 && totalPercent > 0) {
            currentSapMix = oilsData.reduce((sum, oil) => {
                return sum + (oil.percentage / totalPercent) * oil.sap_naoh;
            }, 0);
        }
        
        let oilsWeightForTable;
        if (weightType === 'oils') {
            oilsWeightForTable = inputWeight;
        } else if (currentSapMix > 0) {
            oilsWeightForTable = inputWeight / (1 + currentSapMix * (1 - superfat) * (1 / concentration));
        } else {
            oilsWeightForTable = inputWeight * 0.7;
        }
        
        oilRows.forEach(row => {
            const oilName = row.oilSelect?.value;
            const percentage = parseFloat(row.percentageInput?.value) || 0;
            const gramsInput = row.element?.querySelector('.grams-input');
            
            if (gramsInput) {
                if (oilName && percentage > 0) {
                    const grams = (oilsWeightForTable * percentage / 100).toFixed(2);
                    gramsInput.value = grams;
                } else {
                    gramsInput.value = '';
                }
            }
        });
        
        const totalGrams = document.getElementById('totalGrams');
        if (totalGrams) {
            const totalGramsForCurrent = totalPercent > 0 ? (oilsWeightForTable * totalPercent / 100).toFixed(2) : '0.00';
            totalGrams.textContent = totalGramsForCurrent;
        }
    } else {
        oilRows.forEach(row => {
            const gramsInput = row.element?.querySelector('.grams-input');
            if (gramsInput) gramsInput.value = '';
        });
        
        const totalGrams = document.getElementById('totalGrams');
        if (totalGrams) totalGrams.textContent = '0.00';
    }
}

function updateResultsDisplay(oilsWeight, naohWeight, waterWeight, fragranceWeight, finalBatchWeight, waterLyeRatioValue) {
    const resultElements = {
        oilsWeight: document.getElementById('resultOilsWeight'),
        naoh: document.getElementById('resultNaOH'),
        water: document.getElementById('resultWater'),
        fragrance: document.getElementById('resultFragrance'),
        batchWeight: document.getElementById('resultBatchWeight'),
        waterLyeRatio: document.getElementById('resultWaterLyeRatio')
    };
    
    if (resultElements.oilsWeight) resultElements.oilsWeight.textContent = oilsWeight.toFixed(2);
    if (resultElements.naoh) resultElements.naoh.textContent = naohWeight.toFixed(2);
    if (resultElements.water) resultElements.water.textContent = waterWeight.toFixed(2);
    if (resultElements.fragrance) resultElements.fragrance.textContent = fragranceWeight.toFixed(2);
    if (resultElements.batchWeight) resultElements.batchWeight.textContent = finalBatchWeight.toFixed(2);
    if (resultElements.waterLyeRatio) resultElements.waterLyeRatio.textContent = waterLyeRatioValue.toFixed(2);
}

function calculateSoapQuality(oilsData) {
    // Zkontrolovat, zda všechny oleje mají kompletní data mastných kyselin
    let hasIncompleteData = false;
    
    const qualities = {
        lauric: 0, myristic: 0, palmitic: 0, stearic: 0,
        ricinoleic: 0, oleic: 0, linoleic: 0, linolenic: 0
    };
    
    oilsData.forEach(oil => {
        const weight = oil.percentage / 100;
        
        // Zkontrolovat, zda má olej všechny potřebné hodnoty
        const fattyAcids = ['lauric', 'myristic', 'palmitic', 'stearic', 'ricinoleic', 'oleic', 'linoleic', 'linolenic'];
        const hasMissingData = fattyAcids.some(acid => oil[acid] === undefined || oil[acid] === null);
        
        if (hasMissingData) {
            hasIncompleteData = true;
        }
        
        qualities.lauric += (oil.lauric || 0) * weight;
        qualities.myristic += (oil.myristic || 0) * weight;
        qualities.palmitic += (oil.palmitic || 0) * weight;
        qualities.stearic += (oil.stearic || 0) * weight;
        qualities.ricinoleic += (oil.ricinoleic || 0) * weight;
        qualities.oleic += (oil.oleic || 0) * weight;
        qualities.linoleic += (oil.linoleic || 0) * weight;
        qualities.linolenic += (oil.linolenic || 0) * weight;
    });
    
    const qualityElements = {
        hardness: document.getElementById('qualityHardness'),
        cleansing: document.getElementById('qualityCleansing'),
        conditioning: document.getElementById('qualityConditioning'),
        bubbly: document.getElementById('qualityBubbly'),
        creamy: document.getElementById('qualityCreamy'),
        iodine: document.getElementById('qualityIodine'),
        ins: document.getElementById('qualityINS')
    };
    
    const qualityWarning = document.getElementById('qualityWarning');
    
    if (hasIncompleteData) {
        // Zobrazit varování a pomlčky
        if (qualityWarning) qualityWarning.classList.remove('hidden');
        Object.values(qualityElements).forEach(element => {
            if (element) element.textContent = '—';
        });
        return;
    } else {
        if (qualityWarning) qualityWarning.classList.add('hidden');
    }
    
    // Vypočítat vlastnosti mýdla podle SoapCalc vzorců
    const hardness = qualities.lauric + qualities.myristic + qualities.palmitic + qualities.stearic;
    const cleansing = qualities.lauric + qualities.myristic;
    const conditioning = qualities.oleic + qualities.linoleic + qualities.linolenic + qualities.ricinoleic;
    const bubbly = qualities.lauric + qualities.myristic + qualities.ricinoleic;
    const creamy = qualities.palmitic + qualities.stearic + qualities.ricinoleic;
    
    // Aproximace pro jodové číslo a INS
    const iodine = qualities.oleic * 0.86 + qualities.linoleic * 1.73 + qualities.linolenic * 2.62;
    const ins = (qualities.lauric + qualities.myristic) * 2 + (qualities.palmitic + qualities.stearic) - iodine;
    
    // Aktualizovat zobrazení
    if (qualityElements.hardness) qualityElements.hardness.textContent = hardness.toFixed(0);
    if (qualityElements.cleansing) qualityElements.cleansing.textContent = cleansing.toFixed(0);
    if (qualityElements.conditioning) qualityElements.conditioning.textContent = conditioning.toFixed(0);
    if (qualityElements.bubbly) qualityElements.bubbly.textContent = bubbly.toFixed(0);
    if (qualityElements.creamy) qualityElements.creamy.textContent = creamy.toFixed(0);
    if (qualityElements.iodine) qualityElements.iodine.textContent = iodine.toFixed(0);
    if (qualityElements.ins) qualityElements.ins.textContent = ins.toFixed(0);
}

function clearResults() {
    const resultElements = [
        'resultOilsWeight', 'resultNaOH', 'resultWater', 'resultFragrance', 
        'resultBatchWeight', 'resultWaterLyeRatio'
    ];
    
    const qualityElements = [
        'qualityHardness', 'qualityCleansing', 'qualityConditioning', 
        'qualityBubbly', 'qualityCreamy', 'qualityIodine', 'qualityINS'
    ];
    
    [...resultElements, ...qualityElements].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = '-';
    });
    
    const qualityWarning = document.getElementById('qualityWarning');
    if (qualityWarning) qualityWarning.classList.add('hidden');
}

// Modal funkce pro správu olejů
function openManageOilsModal() {
    const manageOilsModal = document.getElementById('manageOilsModal');
    if (manageOilsModal) {
        manageOilsModal.classList.remove('hidden');
        updateOilsList();
        console.log('Otevřen modal správy olejů');
    }
}

function closeManageOilsModal() {
    const manageOilsModal = document.getElementById('manageOilsModal');
    const oilSearchInput = document.getElementById('oilSearchInput');
    
    if (manageOilsModal) manageOilsModal.classList.add('hidden');
    if (oilSearchInput) oilSearchInput.value = '';
    
    console.log('Zavřen modal správy olejů');
}

function updateOilsList() {
    const oilSearchInput = document.getElementById('oilSearchInput');
    const oilsList = document.getElementById('oilsList');
    
    if (!oilsList) return;
    
    const searchTerm = oilSearchInput?.value.toLowerCase() || '';
    const filteredOils = oilsDatabase.filter(oil => 
        oil.name.toLowerCase().includes(searchTerm)
    );
    
    oilsList.innerHTML = '';
    
    filteredOils.forEach((oil) => {
        const oilItem = document.createElement('div');
        oilItem.className = `oil-item ${oil.builtin ? 'oil-builtin' : ''}`;
        
        const oilIndex = oilsDatabase.indexOf(oil);
        
        oilItem.innerHTML = `
            <div class="oil-info">
                <div class="oil-name">${oil.name}</div>
                <div class="oil-sap">SAP: ${oil.sap_naoh.toFixed(3)}</div>
            </div>
            <div class="oil-actions">
                <button type="button" class="btn btn--secondary" onclick="editOil(${oilIndex})" ${oil.builtin ? 'disabled' : ''}>Upravit</button>
                <button type="button" class="btn btn--outline" onclick="deleteOil(${oilIndex})" ${oil.builtin ? 'disabled' : ''}>Smazat</button>
            </div>
        `;
        
        oilsList.appendChild(oilItem);
    });
}

function filterOilsList() {
    updateOilsList();
}

function openEditOilModal(oilIndex = -1) {
    editingOilIndex = oilIndex;
    const editOilModal = document.getElementById('editOilModal');
    const editOilTitle = document.getElementById('editOilTitle');
    const editOilForm = document.getElementById('editOilForm');
    
    if (!editOilModal || !editOilTitle || !editOilForm) return;
    
    if (oilIndex >= 0) {
        // Upravit existující olej
        const oil = oilsDatabase[oilIndex];
        editOilTitle.textContent = 'Upravit olej';
        
        const fields = {
            'editOilName': oil.name,
            'editOilSap': oil.sap_naoh,
            'editOilLauric': oil.lauric || '',
            'editOilMyristic': oil.myristic || '',
            'editOilPalmitic': oil.palmitic || '',
            'editOilStearic': oil.stearic || '',
            'editOilRicinoleic': oil.ricinoleic || '',
            'editOilOleic': oil.oleic || '',
            'editOilLinoleic': oil.linoleic || '',
            'editOilLinolenic': oil.linolenic || ''
        };
        
        Object.entries(fields).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.value = value;
        });
    } else {
        // Přidat nový olej
        editOilTitle.textContent = 'Přidat nový olej';
        editOilForm.reset();
    }
    
    editOilModal.classList.remove('hidden');
    console.log('Otevřen modal úpravy oleje');
}

function closeEditOilModal() {
    const editOilModal = document.getElementById('editOilModal');
    if (editOilModal) {
        editOilModal.classList.add('hidden');
        editingOilIndex = -1;
        console.log('Zavřen modal úpravy oleje');
    }
}

function saveOil(e) {
    e.preventDefault();
    
    const getFieldValue = (id, isNumber = false) => {
        const element = document.getElementById(id);
        if (!element) return isNumber ? 0 : '';
        return isNumber ? (parseFloat(element.value) || 0) : element.value.trim();
    };
    
    const oilData = {
        name: getFieldValue('editOilName'),
        sap_naoh: getFieldValue('editOilSap', true),
        lauric: getFieldValue('editOilLauric', true),
        myristic: getFieldValue('editOilMyristic', true),
        palmitic: getFieldValue('editOilPalmitic', true),
        stearic: getFieldValue('editOilStearic', true),
        ricinoleic: getFieldValue('editOilRicinoleic', true),
        oleic: getFieldValue('editOilOleic', true),
        linoleic: getFieldValue('editOilLinoleic', true),
        linolenic: getFieldValue('editOilLinolenic', true),
        builtin: false
    };
    
    // Validace
    if (!oilData.name || oilData.sap_naoh <= 0) {
        alert('Název a SAP hodnota jsou povinné!');
        return;
    }
    
    // Zkontrolovat duplicitní názvy
    const existingIndex = oilsDatabase.findIndex(oil => oil.name === oilData.name);
    if (existingIndex >= 0 && existingIndex !== editingOilIndex) {
        alert('Olej s tímto názvem již existuje!');
        return;
    }
    
    if (editingOilIndex >= 0) {
        // Upravit existující
        oilsDatabase[editingOilIndex] = oilData;
        console.log('Upraven olej:', oilData.name);
    } else {
        // Přidat nový
        oilsDatabase.push(oilData);
        console.log('Přidán nový olej:', oilData.name);
    }
    
    // Aktualizovat seznam olejů v dropdownech
    updateOilSelects();
    updateOilsList();
    closeEditOilModal();
}

function deleteOil(index) {
    const oil = oilsDatabase[index];
    
    if (!oil) return;
    
    if (oil.builtin) {
        alert('Vestavěné oleje nelze smazat!');
        return;
    }
    
    if (confirm(`Opravdu chcete smazat olej "${oil.name}"?`)) {
        oilsDatabase.splice(index, 1);
        updateOilSelects();
        updateOilsList();
        console.log('Smazán olej:', oil.name);
    }
}

function editOil(index) {
    const oil = oilsDatabase[index];
    
    if (!oil) return;
    
    if (oil.builtin) {
        alert('Vestavěné oleje nelze upravovat!');
        return;
    }
    
    openEditOilModal(index);
}

function updateOilSelects() {
    oilRows.forEach(row => {
        if (row.oilSelect) {
            const currentValue = row.oilSelect.value;
            row.oilSelect.innerHTML = `
                <option value="">Vyberte olej...</option>
                ${oilsDatabase.map(oil => `<option value="${oil.name}">${oil.name}</option>`).join('')}
            `;
            row.oilSelect.value = currentValue;
        }
    });
}

function exportOilsToJson() {
    const dataToExport = {
        oils: oilsDatabase.filter(oil => !oil.builtin) // Exportovat jen custom oleje
    };
    
    const jsonString = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'oils-database.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('Export olejů dokončen');
}

function openImportJsonModal() {
    const importJsonModal = document.getElementById('importJsonModal');
    const importJsonTextarea = document.getElementById('importJsonTextarea');
    
    if (importJsonModal) {
        importJsonModal.classList.remove('hidden');
        if (importJsonTextarea) importJsonTextarea.value = '';
        console.log('Otevřen modal importu JSON');
    }
}

function closeImportJsonModal() {
    const importJsonModal = document.getElementById('importJsonModal');
    if (importJsonModal) {
        importJsonModal.classList.add('hidden');
        console.log('Zavřen modal importu JSON');
    }
}

function importOilsFromJson() {
    const importJsonTextarea = document.getElementById('importJsonTextarea');
    
    if (!importJsonTextarea) return;
    
    const jsonText = importJsonTextarea.value.trim();
    
    if (!jsonText) {
        alert('Vložte JSON data!');
        return;
    }
    
    try {
        const data = JSON.parse(jsonText);
        
        if (!data.oils || !Array.isArray(data.oils)) {
            throw new Error('Neplatný formát JSON - chybí pole "oils"');
        }
        
        // Validovat každý olej
        data.oils.forEach((oil, index) => {
            if (!oil.name || typeof oil.sap_naoh !== 'number') {
                throw new Error(`Olej na pozici ${index + 1} má neplatná data`);
            }
        });
        
        // Přidat nové oleje (nekopírovat duplicity)
        let addedCount = 0;
        data.oils.forEach(importedOil => {
            const exists = oilsDatabase.some(existing => existing.name === importedOil.name);
            if (!exists) {
                oilsDatabase.push({
                    ...importedOil,
                    builtin: false
                });
                addedCount++;
            }
        });
        
        updateOilSelects();
        updateOilsList();
        closeImportJsonModal();
        
        alert(`Úspěšně importováno ${addedCount} nových olejů!`);
        console.log(`Import dokončen: ${addedCount} nových olejů`);
    } catch (error) {
        alert(`Chyba při importu: ${error.message}`);
        console.error('Chyba importu:', error);
    }
}

// Inicializace aplikace po načtení stránky
document.addEventListener('DOMContentLoaded', initializeApp);