const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('/Users/jangajdos/Downloads/soap-calc-plus-1753694585-firebase-adminsdk-fbsvc-c4351c01a7.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function checkFirestoreData() {
  try {
    console.log('🔍 Kontroluji data v Firestore...\n');
    
    // Check oils collection
    const oilsSnapshot = await db.collection('oils').limit(5).get();
    console.log(`📊 Kolekce 'oils' obsahuje ${oilsSnapshot.size} dokumentů (zobrazuji prvních 5):`);
    
    oilsSnapshot.forEach(doc => {
      const data = doc.data();
      console.log(`  ✓ ${data.name} (${data.scientific_name || 'bez vědeckého názvu'})`);
      console.log(`    INS: ${data.ins}, Iodine: ${data.iodine}, SAP NaOH: ${data.sap_naoh}`);
    });
    
    // Get total count
    const allOilsSnapshot = await db.collection('oils').count().get();
    console.log(`\n📈 Celkový počet olejů v databázi: ${allOilsSnapshot.data().count}`);
    
    // Check recipes collection
    const recipesSnapshot = await db.collection('recipes').limit(3).get();
    console.log(`\n📝 Kolekce 'recipes' obsahuje ${recipesSnapshot.size} dokumentů (zobrazuji prvních 3):`);
    
    recipesSnapshot.forEach(doc => {
      const data = doc.data();
      console.log(`  ✓ ${data.name || doc.id} (vytvořen: ${data.createdAt ? data.createdAt.toDate() : 'neznámo'})`);
    });
    
    console.log('\n✅ Kontrola dokončena!');
    
  } catch (error) {
    console.error('❌ Chyba při kontrole:', error.message);
  }
}

checkFirestoreData()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('❌ Neočekávaná chyba:', error);
    process.exit(1);
  });
