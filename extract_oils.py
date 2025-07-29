#!/usr/bin/env python3
"""
Script to extract oil properties data from LyeCalc.com using Firecrawl API
This script processes oils in batches and saves the results to JSON files.
"""

import json
import time
import os
from typing import List, Dict, Any
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()  # Load .env
load_dotenv('.env.local')  # Load .env.local (overrides .env)

# Firecrawl API configuration
FIRECRAWL_API_KEY = os.getenv('FIRECRAWL_API_KEY')
FIRECRAWL_BASE_URL = "https://api.firecrawl.dev/v1"

# Oil URLs to extract - expand this list as needed
OIL_URLS = [
    "https://www.lyecalc.com/oil/coconut-oil-76-deg",
    "https://www.lyecalc.com/oil/coconut-oil-virgin", 
    "https://www.lyecalc.com/oil/olive-oil-all-grades",
    "https://www.lyecalc.com/oil/palm-oil",
    "https://www.lyecalc.com/oil/palm-kernel-oil",
    "https://www.lyecalc.com/oil/castor-seed-oil",
    "https://www.lyecalc.com/oil/avocado-oil",
    "https://www.lyecalc.com/oil/shea-butter",
    "https://www.lyecalc.com/oil/cocoa-butter",
    "https://www.lyecalc.com/oil/sunflower-seed-oil",
    "https://www.lyecalc.com/oil/safflower-oil-high-linoleic",
    "https://www.lyecalc.com/oil/jojoba-seed-oil-natural-all-grades",
    "https://www.lyecalc.com/oil/sweet-almond-oil",
    "https://www.lyecalc.com/oil/rice-bran-oil",
    "https://www.lyecalc.com/oil/lard",
    "https://www.lyecalc.com/oil/tallow-beef",
    "https://www.lyecalc.com/oil/mango-butter",
    "https://www.lyecalc.com/oil/babassu-oil",
    "https://www.lyecalc.com/oil/evening-primrose",
    "https://www.lyecalc.com/oil/rosehip-seed-oil",
    "https://www.lyecalc.com/oil/macadamia-nut-oil",
    "https://www.lyecalc.com/oil/hemp-seed-butter-oil",
    "https://www.lyecalc.com/oil/grapeseed-oil",
    "https://www.lyecalc.com/oil/sesame-seed-oil",
    "https://www.lyecalc.com/oil/apricot-kernel-oil",
    "https://www.lyecalc.com/oil/hazelnut-oil",
    "https://www.lyecalc.com/oil/walnut-oil",
    "https://www.lyecalc.com/oil/peanut-oil",
    "https://www.lyecalc.com/oil/corn-oil",
    "https://www.lyecalc.com/oil/canola-oil"
]

# Extraction schema
EXTRACTION_SCHEMA = {
    "properties": {
        "oils": {
            "items": {
                "properties": {
                    "fatty_acid_types": {
                        "properties": {
                            "mono_unsaturated": {
                                "description": "Mono-unsaturated fatty acids percentage",
                                "type": "number"
                            },
                            "poly_unsaturated": {
                                "description": "Poly-unsaturated fatty acids percentage", 
                                "type": "number"
                            },
                            "saturated": {
                                "description": "Saturated fatty acids percentage",
                                "type": "number"
                            },
                            "saturated_unsaturated_ratio": {
                                "description": "Saturated to unsaturated ratio",
                                "type": "string"
                            }
                        },
                        "type": "object"
                    },
                    "fatty_acids": {
                        "properties": {
                            "lauric": {"description": "Lauric acid percentage", "type": "number"},
                            "linoleic": {"description": "Linoleic acid percentage", "type": "number"},
                            "linolenic": {"description": "Linolenic acid percentage", "type": "number"},
                            "myristic": {"description": "Myristic acid percentage", "type": "number"},
                            "oleic": {"description": "Oleic acid percentage", "type": "number"},
                            "palmitic": {"description": "Palmitic acid percentage", "type": "number"},
                            "ricinoleic": {"description": "Ricinoleic acid percentage", "type": "number"},
                            "stearic": {"description": "Stearic acid percentage", "type": "number"}
                        },
                        "type": "object"
                    },
                    "name": {
                        "description": "Oil name from the page title",
                        "type": "string"
                    },
                    "oil_qualities": {
                        "properties": {
                            "bubbly": {"description": "Bubbly lather value", "type": "number"},
                            "cleansing": {"description": "Cleansing value", "type": "number"},
                            "condition": {"description": "Conditioning value", "type": "number"},
                            "creamy": {"description": "Creamy lather value", "type": "number"},
                            "hardness": {"description": "Hardness value", "type": "number"},
                            "iodine": {"description": "Iodine value", "type": "number"},
                            "long_life": {"description": "Longevity value", "type": "number"}
                        },
                        "type": "object"
                    },
                    "sap_ins_values": {
                        "properties": {
                            "ins": {"description": "INS value", "type": "number"},
                            "koh_sap": {"description": "KOH SAP value", "type": "number"},
                            "naoh_sap": {"description": "NaOH SAP value", "type": "number"}
                        },
                        "type": "object"
                    }
                },
                "required": ["name", "fatty_acids", "sap_ins_values", "oil_qualities"],
                "type": "object"
            },
            "type": "array"
        }
    },
    "type": "object"
}

def wait_for_extraction_completion(job_id: str, batch_name: str, max_wait_time: int = 300) -> Dict[str, Any]:
    """Wait for async extraction job to complete and return results"""
    
    headers = {
        "Authorization": f"Bearer {FIRECRAWL_API_KEY}",
        "Content-Type": "application/json"
    }
    
    start_time = time.time()
    
    while time.time() - start_time < max_wait_time:
        try:
            response = requests.get(
                f"{FIRECRAWL_BASE_URL}/extract/{job_id}",
                headers=headers,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                
                if result.get('status') == 'completed':
                    print(f"✅ {batch_name} extraction completed!")
                    if 'data' in result:
                        return result['data']
                    else:
                        print(f"Warning: No data in completed result for {batch_name}")
                        return {'oils': []}
                        
                elif result.get('status') == 'failed':
                    print(f"❌ {batch_name} extraction failed: {result.get('error', 'Unknown error')}")
                    return None
                    
                else:
                    status = result.get('status', 'unknown')
                    print(f"⏳ {batch_name} status: {status}, waiting...")
                    time.sleep(10)
                    
            else:
                print(f"❌ Error checking {batch_name} status: {response.status_code}")
                time.sleep(10)
                
        except Exception as e:
            print(f"❌ Exception checking {batch_name} status: {str(e)}")
            time.sleep(10)
    
    print(f"⏰ Timeout waiting for {batch_name} completion")
    return None

def extract_oils_batch(urls: List[str], batch_name: str) -> Dict[str, Any]:
    """Extract oil data from a batch of URLs using Firecrawl API"""
    
    if not FIRECRAWL_API_KEY:
        raise ValueError("FIRECRAWL_API_KEY environment variable not set")
    
    headers = {
        "Authorization": f"Bearer {FIRECRAWL_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "urls": urls,
        "prompt": "Extract oil properties data from these LyeCalc.com oil pages. For each oil extract: oil name, fatty acid percentages (Lauric, Myristic, Palmitic, Stearic, Oleic, Linoleic, Linolenic, Ricinoleic), fatty acid type percentages (Saturated, Mono-Unsaturated, Poly-Unsaturated), SAP values (NaOH SAP, KOH SAP), INS value, and oil quality values (Hardness, Cleansing, Condition, Bubbly, Creamy, Iodine, Long Life).",
        "schema": EXTRACTION_SCHEMA
    }
    
    print(f"Extracting batch: {batch_name}")
    print(f"URLs: {len(urls)} oils")
    
    try:
        response = requests.post(
            f"{FIRECRAWL_BASE_URL}/extract",
            headers=headers,
            json=payload,
            timeout=120
        )
        
        if response.status_code == 200:
            result = response.json()
            
            # Check if this is an async job response
            if 'id' in result and 'success' in result:
                job_id = result['id']
                print(f"⏳ Async job started for {batch_name}, ID: {job_id}")
                
                # Wait for job completion
                final_result = wait_for_extraction_completion(job_id, batch_name)
                return final_result
            else:
                print(f"✅ Successfully extracted {batch_name}")
                print(f"Debug: Response keys: {list(result.keys()) if result else 'None'}")
                if result and 'oils' in result:
                    print(f"Debug: Found {len(result['oils'])} oils in response")
                else:
                    print(f"Debug: No 'oils' key in response: {result}")
                return result
        else:
            print(f"❌ Error extracting {batch_name}: {response.status_code}")
            print(f"Response: {response.text}")
            return None
            
    except Exception as e:
        print(f"❌ Exception during extraction of {batch_name}: {str(e)}")
        return None

def chunk_list(lst: List, chunk_size: int) -> List[List]:
    """Split list into chunks of specified size"""
    return [lst[i:i + chunk_size] for i in range(0, len(lst), chunk_size)]

def main():
    """Main function to extract all oil data"""
    
    # Create output directory
    os.makedirs("data/oils", exist_ok=True)
    
    # Process oils in batches of 10
    batches = chunk_list(OIL_URLS, 10)
    all_oils = []
    
    for i, batch_urls in enumerate(batches, 1):
        batch_name = f"batch_{i}"
        
        # Extract this batch
        result = extract_oils_batch(batch_urls, batch_name)
        
        if result and 'oils' in result:
            batch_oils = result['oils']
            all_oils.extend(batch_oils)
            
            # Save individual batch result
            batch_filename = f"data/oils/{batch_name}.json"
            with open(batch_filename, 'w', encoding='utf-8') as f:
                json.dump(result, f, indent=2, ensure_ascii=False)
            print(f"💾 Saved {batch_name} to {batch_filename}")
            
        # Wait between batches to avoid rate limiting
        if i < len(batches):
            print("⏳ Waiting 5 seconds before next batch...")
            time.sleep(5)
    
    # Save all oils combined
    combined_result = {"oils": all_oils}
    combined_filename = "data/oils/all_oils.json"
    
    with open(combined_filename, 'w', encoding='utf-8') as f:
        json.dump(combined_result, f, indent=2, ensure_ascii=False)
    
    print(f"\n🎉 Extraction complete!")
    print(f"📊 Total oils extracted: {len(all_oils)}")
    print(f"💾 Combined data saved to: {combined_filename}")
    
    # Print summary
    oil_names = [oil.get('name', 'Unknown') for oil in all_oils]
    print(f"\n📋 Extracted oils:")
    for name in sorted(oil_names):
        print(f"  - {name}")

if __name__ == "__main__":
    main()
