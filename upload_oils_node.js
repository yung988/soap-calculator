const admin = require('firebase-admin');
const fs = require('fs');

// Inicializace Firebase Admin SDK
// Použije service account key
const serviceAccount = require('/Users/jangajdos/Downloads/soap-calc-plus-1753694585-firebase-adminsdk-fbsvc-c4351c01a7.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function uploadOilsToFirestore() {
  try {
    console.log('🚀 Spouštím nahrávání olejů do Firestore');
    
    // Načtení dat
    const data = JSON.parse(fs.readFileSync('complete_oils_data.json', 'utf8'));
    const oils = data.oils;
    
    if (!oils || oils.length === 0) {
      throw new Error('Nenalezena žádná data o olejích');
    }
    
    console.log(`📊 Nalezeno ${oils.length} olejů k nahrání`);
    
    // Batch operace pro rychlejší nahrávání
    const batchSize = 500; // Firestore limit je 500 operací na batch
    let totalUploaded = 0;
    let totalFailed = 0;
    
    for (let i = 0; i < oils.length; i += batchSize) {
      const batch = db.batch();
      const currentBatch = oils.slice(i, i + batchSize);
      
      console.log(`\n📦 Zpracovávám batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(oils.length/batchSize)}`);
      console.log(`   Oleji ${i + 1}-${Math.min(i + batchSize, oils.length)} z ${oils.length}`);
      
      for (const oil of currentBatch) {
        try {
          // Příprava dat pro Firestore
          const oilData = {
            name: oil.name || '',
            scientific_name: oil.scientific_name || null,
            ins: oil.sap_ins_values?.ins || 0,
            iodine: oil.oil_qualities?.iodine || 0,
            sap_koh: oil.sap_ins_values?.koh_sap || 0,
            sap_naoh: oil.sap_ins_values?.naoh_sap || 0,
            properties: {
              bubbly: oil.oil_qualities?.bubbly || 0,
              creamy: oil.oil_qualities?.creamy || 0,
              hardness: oil.oil_qualities?.hardness || 0,
              cleansing: oil.oil_qualities?.cleansing || 0,
              conditioning: oil.oil_qualities?.condition || 0,
              long_life: oil.oil_qualities?.long_life || 0
            },
            fatty_acids: {
              oleic: oil.fatty_acids?.oleic || 0,
              lauric: oil.fatty_acids?.lauric || 0,
              stearic: oil.fatty_acids?.stearic || 0,
              linoleic: oil.fatty_acids?.linoleic || 0,
              myristic: oil.fatty_acids?.myristic || 0,
              palmitic: oil.fatty_acids?.palmitic || 0,
              linolenic: oil.fatty_acids?.linolenic || 0,
              ricinoleic: oil.fatty_acids?.ricinoleic || 0
            },
            fatty_acid_types: {
              saturated: oil.fatty_acid_types?.saturated || 0,
              mono_unsaturated: oil.fatty_acid_types?.mono_unsaturated || 0,
              poly_unsaturated: oil.fatty_acid_types?.poly_unsaturated || 0
            },
            url: oil.url || null,
            extracted_at: oil.extracted_at ? new Date(oil.extracted_at * 1000) : null,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            source: oil.source || 'lyecalc.com'
          };
          
          // Přidání do batch
          const docRef = db.collection('oils').doc();
          batch.set(docRef, oilData);
          
        } catch (error) {
          console.log(`   ❌ Chyba při přípravě oleje "${oil.name}": ${error.message}`);
          totalFailed++;
        }
      }
      
      // Commit batch
      try {
        await batch.commit();
        totalUploaded += currentBatch.length;
        console.log(`   ✅ Batch úspěšně nahrán (${currentBatch.length} olejů)`);
      } catch (error) {
        console.log(`   ❌ Chyba při nahrávání batch: ${error.message}`);
        totalFailed += currentBatch.length;
      }
      
      // Malá pauza mezi batches
      if (i + batchSize < oils.length) {
        console.log('   ⏳ Pauza 1 sekunda...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    console.log(`\n🎉 Nahrávání dokončeno!`);
    console.log(`✅ Úspěšně nahráno: ${totalUploaded} olejů`);
    console.log(`❌ Selhalo: ${totalFailed} olejů`);
    console.log(`📊 Úspěšnost: ${(totalUploaded/(totalUploaded + totalFailed)*100).toFixed(1)}%`);
    
  } catch (error) {
    console.error('❌ Kritická chyba:', error.message);
    process.exit(1);
  }
}

// Spuštění
uploadOilsToFirestore()
  .then(() => {
    console.log('✅ Skript dokončen');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Neočekávaná chyba:', error);
    process.exit(1);
  });
