#!/usr/bin/env python3
"""
Skript pro získání kompletních dat všech olejů z LyeCalc.com pomocí Firecrawl API
"""

import json
import time
import os
import re
from typing import List, Dict, Any
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv('.env.local')

# Firecrawl API configuration
FIRECRAWL_API_KEY = os.getenv('FIRECRAWL_API_KEY')
FIRECRAWL_BASE_URL = "https://api.firecrawl.dev/v1"

def extract_oil_urls_from_list_page() -> List[str]:
    """Získá všechny URL olejů ze stránky se seznamem"""
    
    headers = {
        "Authorization": f"Bearer {FIRECRAWL_API_KEY}",
        "Content-Type": "application/json"
    }
    
    # Nejdříve získáme markdown ze stránky se seznamem olejů
    payload = {
        "url": "https://www.lyecalc.com/oils",
        "formats": ["markdown"]
    }
    
    response = requests.post(
        f"{FIRECRAWL_BASE_URL}/scrape",
        headers=headers,
        json=payload,
        timeout=30
    )
    
    if response.status_code == 200:
        result = response.json()
        markdown_content = result.get('data', {}).get('markdown', '')
        
        # Extrakce URL pomocí regex
        url_pattern = r'\[([^\]]+)\]\(https://www\.lyecalc\.com/oil/([^)]+)\)'
        matches = re.findall(url_pattern, markdown_content)
        
        urls = [f"https://www.lyecalc.com/oil/{match[1]}" for match in matches]
        oil_names = [match[0] for match in matches]
        
        print(f"Nalezeno {len(urls)} olejů ze stránky se seznamem")
        for i, (name, url) in enumerate(zip(oil_names[:5], urls[:5])):
            print(f"  {i+1}. {name} -> {url}")
        if len(urls) > 5:
            print(f"  ... a dalších {len(urls) - 5} olejů")
            
        return urls
    else:
        print(f"Chyba při získávání seznamu olejů: {response.status_code}")
        return []

def extract_single_oil_data(url: str, oil_name: str = None) -> Dict[str, Any]:
    """Extrakce kompletních dat pro jeden olej"""
    
    headers = {
        "Authorization": f"Bearer {FIRECRAWL_API_KEY}",
        "Content-Type": "application/json"
    }
    
    # Schema pro extrakci dat
    schema = {
        "properties": {
            "name": {"type": "string"},
            "scientific_name": {"type": "string"},
            "fatty_acids": {
                "properties": {
                    "lauric": {"type": "number"},
                    "myristic": {"type": "number"},
                    "palmitic": {"type": "number"},
                    "stearic": {"type": "number"},
                    "oleic": {"type": "number"},
                    "linoleic": {"type": "number"},
                    "linolenic": {"type": "number"},
                    "ricinoleic": {"type": "number"}
                },
                "type": "object"
            },
            "fatty_acid_types": {
                "properties": {
                    "saturated": {"type": "number"},
                    "mono_unsaturated": {"type": "number"},
                    "poly_unsaturated": {"type": "number"}
                },
                "type": "object"
            },
            "sap_ins_values": {
                "properties": {
                    "naoh_sap": {"type": "number"},
                    "koh_sap": {"type": "number"},
                    "ins": {"type": "number"}
                },
                "type": "object"
            },
            "oil_qualities": {
                "properties": {
                    "hardness": {"type": "number"},
                    "cleansing": {"type": "number"},
                    "condition": {"type": "number"},
                    "bubbly": {"type": "number"},
                    "creamy": {"type": "number"},
                    "iodine": {"type": "number"},
                    "long_life": {"type": "number"}
                },
                "type": "object"
            }
        },
        "required": ["name"],
        "type": "object"
    }
    
    payload = {
        "urls": [url],
        "prompt": "Extract complete oil properties data from this LyeCalc.com oil page. Extract: oil name, scientific name (if available), fatty acid percentages (Lauric, Myristic, Palmitic, Stearic, Oleic, Linoleic, Linolenic, Ricinoleic), fatty acid types (Saturated, Mono-Unsaturated, Poly-Unsaturated), SAP values (NaOH SAP, KOH SAP), INS value, and all oil qualities (Hardness, Cleansing, Condition, Bubbly, Creamy, Iodine, Long Life).",
        "schema": schema
    }
    
    try:
        response = requests.post(
            f"{FIRECRAWL_BASE_URL}/extract",
            headers=headers,
            json=payload,
            timeout=60
        )
        
        if response.status_code == 200:
            result = response.json()
            
            # Pokud je to async job, počkáme na dokončení
            if 'id' in result and 'success' in result:
                job_id = result['id']
                print(f"  Čekám na dokončení extrakce pro {oil_name or url}...")
                
                # Čekání na dokončení
                max_wait = 120  # 2 minuty
                start_time = time.time()
                
                while time.time() - start_time < max_wait:
                    status_response = requests.get(
                        f"{FIRECRAWL_BASE_URL}/extract/{job_id}",
                        headers=headers,
                        timeout=30
                    )
                    
                    if status_response.status_code == 200:
                        status_result = status_response.json()
                        
                        if status_result.get('status') == 'completed':
                            if 'data' in status_result:
                                return status_result['data']
                            break
                        elif status_result.get('status') == 'failed':
                            print(f"  ❌ Extrakce failed pro {oil_name}: {status_result.get('error')}")
                            break
                        else:
                            time.sleep(5)
                    else:
                        time.sleep(5)
                        
                print(f"  ⏰ Timeout při čekání na extrakci pro {oil_name}")
                return None
            else:
                # Přímá odpověď
                return result
                
        else:
            print(f"  ❌ HTTP chyba {response.status_code} pro {oil_name or url}")
            return None
            
    except Exception as e:
        print(f"  ❌ Exception při extrakci {oil_name or url}: {str(e)}")
        return None

def main():
    """Hlavní funkce"""
    
    if not FIRECRAWL_API_KEY:
        print("❌ FIRECRAWL_API_KEY není nastaven")
        exit(1)
    
    print("🚀 Spouštím extrakci všech olejů z LyeCalc.com")
    
    # 1. Získání všech URL olejů
    print("\n📋 Získávám seznam všech olejů...")
    oil_urls = extract_oil_urls_from_list_page()
    
    if not oil_urls:
        print("❌ Nepodařilo se získat seznam olejů")
        exit(1)
        
    print(f"✅ Nalezeno {len(oil_urls)} olejů")
    
    # 2. Extrakce dat pro každý olej
    print("\n🔍 Začínám extrakci detailních dat...")
    all_oils = []
    failed_oils = []
    
    for i, url in enumerate(oil_urls, 1):
        oil_name = url.split('/')[-1].replace('-', ' ').title()
        print(f"\n[{i}/{len(oil_urls)}] Zpracovávám: {oil_name}")
        print(f"  URL: {url}")
        
        oil_data = extract_single_oil_data(url, oil_name)
        
        if oil_data:
            # Přidání metadata
            oil_data['url'] = url
            oil_data['extracted_at'] = time.time()
            oil_data['source'] = 'lyecalc.com'
            
            all_oils.append(oil_data)
            print(f"  ✅ Úspěšně extrahováno")
        else:
            failed_oils.append(url)
            print(f"  ❌ Extrakce selhala")
        
        # Pauza mezi požadavky
        if i < len(oil_urls):
            print("  ⏳ Pauza 3 sekundy...")
            time.sleep(3)
    
    # 3. Uložení výsledků
    print(f"\n💾 Ukládám výsledky...")
    
    # Uložení úspěšných extrakcí
    result = {
        "oils": all_oils,
        "total_extracted": len(all_oils),
        "total_requested": len(oil_urls),
        "success_rate": f"{len(all_oils)/len(oil_urls)*100:.1f}%",
        "extracted_at": time.time(),
        "source": "lyecalc.com"
    }
    
    with open('complete_oils_data.json', 'w', encoding='utf-8') as f:
        json.dump(result, f, indent=2, ensure_ascii=False)
    
    # Uložení neúspěšných URL pro případné opakování
    if failed_oils:
        with open('failed_oils_urls.json', 'w', encoding='utf-8') as f:
            json.dump({"failed_urls": failed_oils}, f, indent=2)
    
    # Souhrn
    print(f"\n🎉 Extrakce dokončena!")
    print(f"✅ Úspěšně extrahováno: {len(all_oils)} olejů")
    print(f"❌ Neúspěšných: {len(failed_oils)} olejů")
    print(f"📊 Úspěšnost: {len(all_oils)/len(oil_urls)*100:.1f}%")
    print(f"💾 Data uložena do: complete_oils_data.json")
    
    if failed_oils:
        print(f"⚠️  Neúspěšné URL uloženy do: failed_oils_urls.json")

if __name__ == "__main__":
    main()
