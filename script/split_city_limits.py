#!/usr/bin/env python3
"""
Split City_Limits.geojson into individual city GeoJSON files.
Each city will be saved as a separate file in _data/{city_name}/ directory.
"""

import json
import os
import re

def slugify(name):
    """Convert city name to a slug for directory/file naming."""
    slug = name.lower().strip()
    slug = re.sub(r'[^a-z0-9]+', '_', slug)
    slug = slug.strip('_')
    return slug

def main():
    # Change to project root directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    os.chdir(project_root)
    
    print("=== City Limits GeoJSON Splitter ===")
    print()
    
    # Load the City_Limits.geojson file
    input_file = '_data/City_Limits.geojson'
    
    print(f"Loading {input_file}...")
    with open(input_file, 'r') as f:
        data = json.load(f)
    
    features = data.get('features', [])
    print(f"Found {len(features)} cities in the file.")
    print()
    
    # Process each feature (city)
    for feature in features:
        properties = feature.get('properties', {})
        city_name = properties.get('Name', 'Unknown')
        
        # Create slug for directory name
        city_slug = slugify(city_name)
        
        print(f"Processing: {city_name} -> {city_slug}")
        
        # Create directory for the city
        city_dir = f'_data/{city_slug}'
        os.makedirs(city_dir, exist_ok=True)
        
        # Create individual GeoJSON file for the city
        city_geojson = {
            "type": "FeatureCollection",
            "name": city_name,
            "crs": data.get('crs', {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}}),
            "features": [feature]
        }
        
        # Save the city GeoJSON
        output_file = f'{city_dir}/{city_slug}_geo.json'
        with open(output_file, 'w') as f:
            json.dump(city_geojson, f, separators=(',', ':'))
        
        # Print some stats
        area_sq_mi = properties.get('AreaSqMi', 'N/A')
        area_ac = properties.get('AreaAc', 'N/A')
        
        print(f"  ✅ Saved: {output_file}")
        print(f"     Area: {area_sq_mi} sq mi ({area_ac} acres)")
        print()
    
    print("=== Summary ===")
    print(f"Created {len(features)} city GeoJSON files:")
    for feature in features:
        city_name = feature.get('properties', {}).get('Name', 'Unknown')
        city_slug = slugify(city_name)
        print(f"  - _data/{city_slug}/{city_slug}_geo.json")
    
    print()
    print("Done!")

if __name__ == "__main__":
    main()

