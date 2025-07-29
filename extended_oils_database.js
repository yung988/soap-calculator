// Rozšířená databáze olejů - SAP hodnoty a mastné kyseliny ze standardních zdrojů

const extendedOilsDatabase = [
    // === SOUČASNÉ OLEJE (zachováváme) ===
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

    // === NOVÉ OLEJE - TOP PRIORITY (se správnými SAP hodnotami) ===
    {"name":"Abyssinian Seed Oil","sap_naoh":0.137,"lauric":0,"myristic":0,"palmitic":2,"stearic":1,"ricinoleic":0,"oleic":15,"linoleic":25,"linolenic":52,"builtin":false},
    {"name":"Algae Oil","sap_naoh":0.145,"lauric":0,"myristic":0,"palmitic":15,"stearic":8,"ricinoleic":0,"oleic":30,"linoleic":15,"linolenic":12,"builtin":false},
    {"name":"Aloe Vera Butter","sap_naoh":0.135,"lauric":0,"myristic":0,"palmitic":16,"stearic":40,"ricinoleic":0,"oleic":38,"linoleic":6,"linolenic":0,"builtin":false},
    {"name":"Apricot Kernel Oil","sap_naoh":0.135,"lauric":0,"myristic":0,"palmitic":6,"stearic":1,"ricinoleic":0,"oleic":60,"linoleic":30,"linolenic":0,"builtin":false},
    {"name":"Baobab Oil","sap_naoh":0.138,"lauric":0,"myristic":0,"palmitic":22,"stearic":4,"ricinoleic":0,"oleic":35,"linoleic":33,"linolenic":3,"builtin":false},
    {"name":"Black Cumin Seed Oil","sap_naoh":0.134,"lauric":0,"myristic":0,"palmitic":12,"stearic":3,"ricinoleic":0,"oleic":24,"linoleic":56,"linolenic":0,"builtin":false},
    {"name":"Borage Seed Oil","sap_naoh":0.133,"lauric":0,"myristic":0,"palmitic":10,"stearic":4,"ricinoleic":0,"oleic":16,"linoleic":38,"linolenic":24,"builtin":false},
    {"name":"Brazil Nut Oil","sap_naoh":0.135,"lauric":0,"myristic":0,"palmitic":14,"stearic":10,"ricinoleic":0,"oleic":31,"linoleic":42,"linolenic":0,"builtin":false},
    {"name":"Broccoli Seed Oil","sap_naoh":0.124,"lauric":0,"myristic":0,"palmitic":7,"stearic":2,"ricinoleic":0,"oleic":14,"linoleic":11,"linolenic":9,"builtin":false},
    {"name":"Camellia Seed Oil","sap_naoh":0.136,"lauric":0,"myristic":0,"palmitic":8,"stearic":2,"ricinoleic":0,"oleic":78,"linoleic":9,"linolenic":0,"builtin":false},
    {"name":"Cherry Kernel Oil","sap_naoh":0.135,"lauric":0,"myristic":0,"palmitic":7,"stearic":3,"ricinoleic":0,"oleic":42,"linoleic":42,"linolenic":3,"builtin":false},
    {"name":"Emu Oil","sap_naoh":0.135,"lauric":0,"myristic":0,"palmitic":25,"stearic":10,"ricinoleic":0,"oleic":45,"linoleic":15,"linolenic":1,"builtin":false},
    {"name":"Evening Primrose Oil","sap_naoh":0.134,"lauric":0,"myristic":0,"palmitic":6,"stearic":2,"ricinoleic":0,"oleic":6,"linoleic":76,"linolenic":9,"builtin":false},
    {"name":"Hazelnut Oil","sap_naoh":0.136,"lauric":0,"myristic":0,"palmitic":5,"stearic":3,"ricinoleic":0,"oleic":75,"linoleic":15,"linolenic":0,"builtin":false},
    {"name":"Marula Oil","sap_naoh":0.131,"lauric":0,"myristic":0,"palmitic":9,"stearic":7,"ricinoleic":0,"oleic":70,"linoleic":7,"linolenic":0,"builtin":false},
    {"name":"Moringa Oil","sap_naoh":0.137,"lauric":0,"myristic":0,"palmitic":7,"stearic":7,"ricinoleic":0,"oleic":73,"linoleic":1,"linolenic":0,"builtin":false},
    {"name":"Peach Kernel Oil","sap_naoh":0.136,"lauric":0,"myristic":0,"palmitic":6,"stearic":2,"ricinoleic":0,"oleic":65,"linoleic":25,"linolenic":0,"builtin":false},
    {"name":"Pomegranate Seed Oil","sap_naoh":0.137,"lauric":0,"myristic":0,"palmitic":3,"stearic":2,"ricinoleic":0,"oleic":6,"linoleic":7,"linolenic":75,"builtin":false},
    {"name":"Raspberry Seed Oil","sap_naoh":0.135,"lauric":0,"myristic":0,"palmitic":2,"stearic":2,"ricinoleic":0,"oleic":13,"linoleic":55,"linolenic":26,"builtin":false},
    {"name":"Rosehip Seed Oil","sap_naoh":0.137,"lauric":0,"myristic":0,"palmitic":4,"stearic":2,"ricinoleic":0,"oleic":15,"linoleic":45,"linolenic":32,"builtin":false},
    {"name":"Seabuckthorn Oil","sap_naoh":0.138,"lauric":0,"myristic":0,"palmitic":33,"stearic":4,"ricinoleic":0,"oleic":19,"linoleic":6,"linolenic":2,"builtin":false},
    {"name":"Watermelon Seed Oil","sap_naoh":0.135,"lauric":0,"myristic":0,"palmitic":10,"stearic":8,"ricinoleic":0,"oleic":15,"linoleic":63,"linolenic":0,"builtin":false},

    // === EXOTIC BUTTERS ===
    {"name":"Apricot Kernel Butter","sap_naoh":0.135,"lauric":0,"myristic":0,"palmitic":6,"stearic":35,"ricinoleic":0,"oleic":50,"linoleic":8,"linolenic":0,"builtin":false},
    {"name":"Butterfat (Cow)","sap_naoh":0.162,"lauric":3,"myristic":11,"palmitic":27,"stearic":13,"ricinoleic":0,"oleic":28,"linoleic":2,"linolenic":1,"builtin":false},
    {"name":"Butterfat (Goat)","sap_naoh":0.168,"lauric":4,"myristic":12,"palmitic":29,"stearic":11,"ricinoleic":0,"oleic":27,"linoleic":3,"linolenic":1,"builtin":false},
    {"name":"Capuacu Butter","sap_naoh":0.137,"lauric":0,"myristic":0,"palmitic":7,"stearic":35,"ricinoleic":0,"oleic":41,"linoleic":4,"linolenic":0,"builtin":false},
    {"name":"Mafura Butter","sap_naoh":0.138,"lauric":0,"myristic":0,"palmitic":15,"stearic":55,"ricinoleic":0,"oleic":25,"linoleic":3,"linolenic":0,"builtin":false},
    {"name":"Nutmeg Butter","sap_naoh":0.154,"lauric":77,"myristic":13,"palmitic":4,"stearic":2,"ricinoleic":0,"oleic":3,"linoleic":0,"linolenic":0,"builtin":false},
    {"name":"Tucuma Butter","sap_naoh":0.142,"lauric":47,"myristic":18,"palmitic":8,"stearic":3,"ricinoleic":0,"oleic":18,"linoleic":3,"linolenic":0,"builtin":false},

    // Zbytek současných olejů pokračuje...
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

// Export pro použití v aplikaci
if (typeof module !== 'undefined' && module.exports) {
    module.exports = extendedOilsDatabase;
}

console.log(`📊 Rozšířená databáze obsahuje ${extendedOilsDatabase.length} olejů`);
console.log(`🟢 Původní oleje: ${extendedOilsDatabase.filter(oil => oil.builtin).length}`);
console.log(`🆕 Nové oleje: ${extendedOilsDatabase.filter(oil => !oil.builtin).length}`);
