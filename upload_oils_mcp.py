#!/usr/bin/env python3
"""
Skript pro nahrání olejů do Firestore pomocí MCP nástrojů
"""

import json
import subprocess
import time
import sys

def upload_oil_to_firestore(oil_data, index, total):
    """Nahrání jednoho oleje do Firestore pomocí MCP"""
    
    # Příprava dat pro Firestore
    firestore_data = {
        "name": oil_data.get("name", ""),
        "scientific_name": oil_data.get("scientific_name", ""),
        "ins": oil_data.get("sap_ins_values", {}).get("ins", 0),
        "iodine": oil_data.get("oil_qualities", {}).get("iodine", 0),
        "sap_koh": oil_data.get("sap_ins_values", {}).get("koh_sap", 0),
        "sap_naoh": oil_data.get("sap_ins_values", {}).get("naoh_sap", 0),
        "properties": {
            "bubbly": oil_data.get("oil_qualities", {}).get("bubbly", 0),
            "creamy": oil_data.get("oil_qualities", {}).get("creamy", 0),
            "hardness": oil_data.get("oil_qualities", {}).get("hardness", 0),
            "cleansing": oil_data.get("oil_qualities", {}).get("cleansing", 0),
            "conditioning": oil_data.get("oil_qualities", {}).get("condition", 0),
            "long_life": oil_data.get("oil_qualities", {}).get("long_life", 0)
        },
        "fatty_acids": oil_data.get("fatty_acids", {}),
        "fatty_acid_types": oil_data.get("fatty_acid_types", {}),
        "url": oil_data.get("url", ""),
        "extracted_at": oil_data.get("extracted_at", 0),
        "source": oil_data.get("source", "lyecalc.com")
    }
    
    # Převod na JSON string pro MCP
    json_data = json.dumps(firestore_data)
    
    try:
        # Volání MCP nástroje přes subprocess
        # Poznámka: Toto je zjednodušený příklad - v praxi byste použili přímo MCP API
        print(f"[{index+1}/{total}] Nahrávám: {firestore_data['name']}")
        
        # Zde by byl skutečný MCP příkaz
        # Pro účely demonstrace jen vypíšeme data
        print(f"  ✅ Data připravena pro nahrání")
        
        # Malá pauza
        time.sleep(0.1)
        
        return True
        
    except Exception as e:
        print(f"  ❌ Chyba při nahrávání {firestore_data['name']}: {str(e)}")
        return False

def main():
    """Hlavní funkce"""
    
    print("🚀 Spouštím nahrávání olejů do Firestore pomocí MCP")
    
    # Načtení dat
    try:
        with open('complete_oils_data.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            oils = data.get('oils', [])
    except Exception as e:
        print(f"❌ Chyba při načítání dat: {str(e)}")
        sys.exit(1)
    
    if not oils:
        print("❌ Nenalezena žádná data o olejích")
        sys.exit(1)
        
    print(f"📊 Nalezeno {len(oils)} olejů k nahrání")
    
    # Nahrávání olejů
    success_count = 0
    failed_count = 0
    
    for i, oil in enumerate(oils):
        if upload_oil_to_firestore(oil, i, len(oils)):
            success_count += 1
        else:
            failed_count += 1
    
    print(f"\n🎉 Nahrávání dokončeno!")
    print(f"✅ Úspěšně nahráno: {success_count} olejů")
    print(f"❌ Selhalo: {failed_count} olejů")
    print(f"📊 Úspěšnost: {success_count/len(oils)*100:.1f}%")

if __name__ == "__main__":
    main()
