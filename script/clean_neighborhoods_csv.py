#!/usr/bin/env python3
"""
Clean neighborhoods_info.csv to match the neighborhoods kept in neighborhoods_geo.json.
Remove rows for neighborhoods that were filtered out during geo cleanup.
"""

import json
import pandas as pd
import sys

def load_geo_neighborhood_names():
    """Load neighborhood names from the cleaned geo file."""
    print("Loading neighborhood names from geo file...")
    with open('_data/neighborhoods/neighborhoods_geo.json', 'r') as f:
        geo_data = json.load(f)
    
    # Extract neighborhood names from the geo features
    geo_names = set()
    for feature in geo_data['features']:
        name = feature['properties'].get('NAME')
        if name:
            geo_names.add(name.strip())
    
    print(f"Found {len(geo_names)} neighborhoods in geo file")
    return geo_names

def clean_csv_file():
    """Clean the CSV file to match geo neighborhoods."""
    print("Loading CSV file...")
    
    # Load the CSV file
    csv_file = '_data/neighborhoods/neighborhoods_info.csv'
    df = pd.read_csv(csv_file)
    
    print(f"Original CSV rows: {len(df)}")
    
    # Get neighborhood names from geo file
    geo_names = load_geo_neighborhood_names()
    
    # Filter CSV to only include neighborhoods that exist in geo file
    # Match on the 'NAME' column
    df_filtered = df[df['NAME'].str.strip().isin(geo_names)]
    
    print(f"Filtered CSV rows: {len(df_filtered)}")
    print(f"Removed: {len(df) - len(df_filtered)} rows")
    
    # Check for any mismatches
    csv_names = set(df_filtered['NAME'].str.strip())
    geo_only = geo_names - csv_names
    csv_only = csv_names - geo_names
    
    if geo_only:
        print(f"⚠️  Warning: {len(geo_only)} neighborhoods in geo but not in CSV:")
        for name in sorted(geo_only):
            print(f"  - {name}")
    
    if csv_only:
        print(f"⚠️  Warning: {len(csv_only)} neighborhoods in CSV but not in geo:")
        for name in sorted(csv_only):
            print(f"  - {name}")
    
    # Create backup of original file
    backup_file = '_data/neighborhoods/neighborhoods_info_backup.csv'
    df.to_csv(backup_file, index=False)
    print(f"📁 Backup saved to: {backup_file}")
    
    # Save the cleaned file
    df_filtered.to_csv(csv_file, index=False)
    print(f"✅ Cleaned CSV saved to: {csv_file}")
    
    return len(df), len(df_filtered)

def main():
    """Main function."""
    print("🧹 Cleaning neighborhoods_info.csv to match geo data...")
    print("=" * 50)
    
    try:
        original_count, cleaned_count = clean_csv_file()
        
        print("\n" + "=" * 50)
        print("✅ CSV Cleanup Complete!")
        print(f"📊 Original neighborhoods: {original_count}")
        print(f"📊 Cleaned neighborhoods: {cleaned_count}")
        print(f"📊 Removed: {original_count - cleaned_count}")
        
    except Exception as e:
        print(f"❌ Error during cleanup: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 