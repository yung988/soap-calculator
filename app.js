// Globální proměnné
let oilsDatabase = []; // bude načteno z Firebase
let recipesDatabase = []; // bude načteno z Firebase
let oilRows = [];
let currentRowId = 0;
let editingOilIndex = -1;

// Inicializace aplikace
async function initializeApp() {
    console.log('Inicializace aplikace...');

    // Načíst data z Firebase
    await Promise.all([
        loadOilsFromFirebase(),
        loadRecipesFromFirebase()
    ]);
    
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

// Načtení olejů z Firebase s mapováním na správnou strukturu
async function loadOilsFromFirebase() {
    try {
        const snapshot = await db.collection('oils').get();
        oilsDatabase = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            // Mapování z Firebase struktury na očekávanou strukturu
            const mappedOil = {
                id: doc.id,
                name: data.name,
                sap_naoh: data.sap_naoh || 0,
                // Mastné kyseliny z fatty_acids objektu
                lauric: data.fatty_acids?.lauric || 0,
                myristic: data.fatty_acids?.myristic || 0,
                palmitic: data.fatty_acids?.palmitic || 0,
                stearic: data.fatty_acids?.stearic || 0,
                ricinoleic: data.fatty_acids?.ricinoleic || 0,
                oleic: data.fatty_acids?.oleic || 0,
                linoleic: data.fatty_acids?.linoleic || 0,
                linolenic: data.fatty_acids?.linolenic || 0,
                builtin: false // všechny oleje z Firebase považujeme za editovatelné
            };
            oilsDatabase.push(mappedOil);
        });
        console.log('Oleje načteny z Firebase:', oilsDatabase.length);
    } catch (error) {
        console.error('Chyba při načítání olejů z Firebase:', error);
        alert('Nepodařilo se načíst databázi olejů. Zkuste to prosím později.');
    }
}

// Načtení receptů z Firebase
async function loadRecipesFromFirebase() {
    try {
        const snapshot = await db.collection('recipes').orderBy('createdAt', 'desc').get();
        recipesDatabase = [];
        snapshot.forEach(doc => {
            recipesDatabase.push({ id: doc.id, ...doc.data() });
        });
        console.log('Recepty načteny z Firebase:', recipesDatabase.length);
    } catch (error) {
        console.error('Chyba při načítání receptů z Firebase:', error);
        // Tichá chyba, aplikace bude fungovat i bez receptů
    }
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
    
    // Tlačítka pro recepty
    const saveRecipeBtn = document.getElementById('saveRecipeBtn');
    const loadRecipeBtn = document.getElementById('loadRecipeBtn');
    
    if (saveRecipeBtn) saveRecipeBtn.addEventListener('click', openSaveRecipeModal);
    if (loadRecipeBtn) loadRecipeBtn.addEventListener('click', openLoadRecipeModal);
    
    // Modal event listenery
    setupModalEventListeners();
    setupRecipeEventListeners();
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

// Funkce pro práci s recepty
function openSaveRecipeModal() {
    const saveRecipeModal = document.getElementById('saveRecipeModal');
    if (saveRecipeModal) {
        saveRecipeModal.classList.remove('hidden');
        const nameInput = document.getElementById('recipeNameInput');
        if (nameInput) nameInput.focus();
    }
}

function closeSaveRecipeModal() {
    const saveRecipeModal = document.getElementById('saveRecipeModal');
    if (saveRecipeModal) {
        saveRecipeModal.classList.add('hidden');
        document.getElementById('saveRecipeForm').reset();
    }
}

async function saveCurrentRecipe(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('recipeNameInput');
    const descriptionInput = document.getElementById('recipeDescriptionInput');
    
    if (!nameInput || !nameInput.value.trim()) {
        alert('Zadejte název receptu!');
        return;
    }
    
    // Získat aktuální stav aplikace
    const weightType = document.querySelector('input[name="weightType"]:checked')?.value || 'oils';
    const weightInput = document.getElementById('weightInput');
    const superfatSlider = document.getElementById('superfatSlider');
    const concentrationSlider = document.getElementById('concentrationSlider');
    const fragranceSlider = document.getElementById('fragranceSlider');
    
    // Získat data o olejích
    const oilsData = [];
    oilRows.forEach(row => {
        const oilName = row.oilSelect?.value;
        const percentage = parseFloat(row.percentageInput?.value) || 0;
        
        if (oilName && percentage > 0) {
            const oilInfo = oilsDatabase.find(oil => oil.name === oilName);
            if (oilInfo) {
                oilsData.push({
                    name: oilName,
                    percentage: percentage,
                    sapValue: oilInfo.sap_naoh
                });
            }
        }
    });
    
    if (oilsData.length === 0) {
        alert('Přidejte alespoň jeden olej do receptu!');
        return;
    }
    
    // Získat výsledky výpočtů
    const results = {
        oilsWeight: document.getElementById('resultOilsWeight')?.textContent || '-',
        naoh: document.getElementById('resultNaOH')?.textContent || '-',
        water: document.getElementById('resultWater')?.textContent || '-',
        fragrance: document.getElementById('resultFragrance')?.textContent || '-',
        batchWeight: document.getElementById('resultBatchWeight')?.textContent || '-',
        waterLyeRatio: document.getElementById('resultWaterLyeRatio')?.textContent || '-'
    };
    
    // Získat kvalitu mýdla
    const quality = {
        hardness: document.getElementById('qualityHardness')?.textContent || '-',
        cleansing: document.getElementById('qualityCleansing')?.textContent || '-',
        conditioning: document.getElementById('qualityConditioning')?.textContent || '-',
        bubbly: document.getElementById('qualityBubbly')?.textContent || '-',
        creamy: document.getElementById('qualityCreamy')?.textContent || '-',
        iodine: document.getElementById('qualityIodine')?.textContent || '-',
        ins: document.getElementById('qualityINS')?.textContent || '-'
    };
    
    const recipe = {
        name: nameInput.value.trim(),
        description: descriptionInput?.value.trim() || '',
        weightType: weightType,
        totalWeight: parseFloat(weightInput?.value) || 0,
        superfat: parseFloat(superfatSlider?.value) || 5,
        concentration: parseFloat(concentrationSlider?.value) || 33,
        fragrance: parseFloat(fragranceSlider?.value) || 3,
        oils: oilsData,
        results: results,
        quality: quality
    };
    
    try {
        // Přidat timestamp
        recipe.createdAt = firebase.firestore.Timestamp.now();
        recipe.updatedAt = firebase.firestore.Timestamp.now();
        
        const docRef = await db.collection('recipes').add(recipe);
        const savedRecipe = { id: docRef.id, ...recipe };
        recipesDatabase.unshift(savedRecipe);
        
        console.log('Recept uložen:', savedRecipe);
        alert('Recept byl úspěšně uložen!');
        closeSaveRecipeModal();
    } catch (error) {
        console.error('Chyba při ukládání receptu:', error);
        alert('Chyba při ukládání receptu: ' + error.message);
    }
}

function openLoadRecipeModal() {
    const loadRecipeModal = document.getElementById('loadRecipeModal');
    if (loadRecipeModal) {
        loadRecipeModal.classList.remove('hidden');
        updateRecipesList();
    }
}

function closeLoadRecipeModal() {
    const loadRecipeModal = document.getElementById('loadRecipeModal');
    if (loadRecipeModal) {
        loadRecipeModal.classList.add('hidden');
    }
}

function updateRecipesList() {
    const recipesList = document.getElementById('recipesList');
    if (!recipesList) return;
    
    recipesList.innerHTML = '';
    
    if (recipesDatabase.length === 0) {
        recipesList.innerHTML = '<div class="no-recipes">Žádné uložené recepty</div>';
        return;
    }
    
    recipesDatabase.forEach(recipe => {
        const recipeItem = document.createElement('div');
        recipeItem.className = 'recipe-item';
        
        const createdAt = recipe.createdAt && recipe.createdAt.toDate ? 
            recipe.createdAt.toDate().toLocaleDateString() : 
            new Date(recipe.createdAt).toLocaleDateString();
        
        recipeItem.innerHTML = `
            <div class="recipe-info">
                <div class="recipe-name">${recipe.name}</div>
                <div class="recipe-description">${recipe.description || 'Bez popisu'}</div>
                <div class="recipe-meta">
                    Vytvořeno: ${createdAt} | 
                    Olejů: ${recipe.oils ? recipe.oils.length : 0} | 
                    Hmotnost: ${recipe.totalWeight}g
                </div>
            </div>
            <div class="recipe-actions">
                <button type="button" class="btn btn--primary" onclick="loadRecipe('${recipe.id}')">Načíst</button>
                <button type="button" class="btn btn--outline" onclick="deleteRecipeWithConfirm('${recipe.id}')">Smazat</button>
            </div>
        `;
        
        recipesList.appendChild(recipeItem);
    });
}

function loadRecipe(recipeId) {
    const recipe = recipesDatabase.find(r => r.id === recipeId);
    if (!recipe) {
        alert('Recept nenalezen!');
        return;
    }
    
    try {
        // Nastavit základní hodnoty
        const weightTypeRadio = document.querySelector(`input[name="weightType"][value="${recipe.weightType}"]`);
        if (weightTypeRadio) weightTypeRadio.checked = true;
        
        const weightInput = document.getElementById('weightInput');
        if (weightInput) weightInput.value = recipe.totalWeight;
        
        const superfatSlider = document.getElementById('superfatSlider');
        if (superfatSlider) {
            superfatSlider.value = recipe.superfat;
            const superfatValue = document.getElementById('superfatValue');
            if (superfatValue) superfatValue.textContent = recipe.superfat;
        }
        
        const concentrationSlider = document.getElementById('concentrationSlider');
        if (concentrationSlider) {
            concentrationSlider.value = recipe.concentration;
            const concentrationValue = document.getElementById('concentrationValue');
            if (concentrationValue) concentrationValue.textContent = recipe.concentration;
        }
        
        const fragranceSlider = document.getElementById('fragranceSlider');
        if (fragranceSlider) {
            fragranceSlider.value = recipe.fragrance;
            const fragranceValue = document.getElementById('fragranceValue');
            if (fragranceValue) fragranceValue.textContent = recipe.fragrance;
        }
        
        // Vymazat současné oleje
        oilRows.forEach(row => {
            if (row.element) row.element.remove();
        });
        oilRows = [];
        currentRowId = 0;
        
        // Načíst oleje z receptu
        if (recipe.oils && Array.isArray(recipe.oils)) {
            recipe.oils.forEach(oil => {
                addOilRow();
                const lastRow = oilRows[oilRows.length - 1];
                if (lastRow) {
                    if (lastRow.oilSelect) lastRow.oilSelect.value = oil.name;
                    if (lastRow.percentageInput) lastRow.percentageInput.value = oil.percentage;
                }
            });
        }
        
        // Přepočítat výsledky
        handleWeightTypeChange();
        updateWaterLyeRatio();
        calculateResults();
        
        closeLoadRecipeModal();
        alert('Recept byl načten!');
        
    } catch (error) {
        console.error('Chyba při načítání receptu:', error);
        alert('Chyba při načítání receptu: ' + error.message);
    }
}

async function deleteRecipeWithConfirm(recipeId) {
    const recipe = recipesDatabase.find(r => r.id === recipeId);
    if (!recipe) return;
    
    if (confirm(`Opravdu chcete smazat recept \"${recipe.name}\"?`)) {
        try {
            await db.collection('recipes').doc(recipeId).delete();
            recipesDatabase = recipesDatabase.filter(r => r.id !== recipeId);
            updateRecipesList();
            alert('Recept byl smazán!');
        } catch (error) {
            console.error('Chyba při mazání receptu:', error);
            alert('Chyba při mazání receptu: ' + error.message);
        }
    }
}

// Přidat event listenery pro modály receptů
function setupRecipeEventListeners() {
    // Save Recipe Modal
    const closeSaveRecipeBtn = document.getElementById('closeSaveRecipeBtn');
    const cancelSaveRecipeBtn = document.getElementById('cancelSaveRecipeBtn');  
    const saveRecipeForm = document.getElementById('saveRecipeForm');
    const saveRecipeModal = document.getElementById('saveRecipeModal');
    
    if (closeSaveRecipeBtn) closeSaveRecipeBtn.addEventListener('click', closeSaveRecipeModal);
    if (cancelSaveRecipeBtn) cancelSaveRecipeBtn.addEventListener('click', closeSaveRecipeModal);
    if (saveRecipeForm) saveRecipeForm.addEventListener('submit', saveCurrentRecipe);
    
    // Load Recipe Modal
    const closeLoadRecipeBtn = document.getElementById('closeLoadRecipeBtn');
    const loadRecipeModal = document.getElementById('loadRecipeModal');
    
    if (closeLoadRecipeBtn) closeLoadRecipeBtn.addEventListener('click', closeLoadRecipeModal);
    
    // Zavírání modálů kliknutím mimo
    if (saveRecipeModal) {
        saveRecipeModal.addEventListener('click', (e) => {
            if (e.target === saveRecipeModal) closeSaveRecipeModal();
        });
    }
    if (loadRecipeModal) {
        loadRecipeModal.addEventListener('click', (e) => {
            if (e.target === loadRecipeModal) closeLoadRecipeModal();
        });
    }
}

// Inicializace aplikace po načtení stránky
document.addEventListener('DOMContentLoaded', initializeApp);
