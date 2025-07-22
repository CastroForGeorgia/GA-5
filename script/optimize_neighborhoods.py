#!/usr/bin/env python3
"""
Advanced neighborhood cleanup script for District 5.
Removes neighborhoods that only border the district with minimal overlap.
Keeps neighborhoods with substantial area within the district.
"""

import json
import geopandas as gpd
from shapely.geometry import shape
import pandas as pd
import sys
import os

# Configuration
MIN_OVERLAP_PERCENTAGE = 15.0  # Minimum % of neighborhood that must be within district
MIN_OVERLAP_AREA_SQ_M = 50000   # Minimum absolute area (50,000 sq meters ≈ 12 acres)

def load_geojson(file_path):
    """Load a GeoJSON file and return a GeoDataFrame."""
    with open(file_path, 'r') as f:
        data = json.load(f)
    return gpd.GeoDataFrame.from_features(data['features'])

def calculate_overlap_metrics(neighborhood_geom, district_geom):
    """Calculate overlap percentage and absolute area between neighborhood and district."""
    try:
        # Calculate intersection
        intersection = neighborhood_geom.intersection(district_geom)
        
        # Calculate areas (assuming coordinates are in WGS84, convert to approximate meters)
        # Note: This is an approximation. For precise calculations, we'd need to reproject.
        neighborhood_area = neighborhood_geom.area * 111000 * 111000  # rough conversion to sq meters
        intersection_area = intersection.area * 111000 * 111000
        
        # Calculate percentage
        if neighborhood_area > 0:
            overlap_percentage = (intersection_area / neighborhood_area) * 100
        else:
            overlap_percentage = 0
            
        return overlap_percentage, intersection_area
        
    except Exception as e:
        print(f"Error calculating overlap: {e}")
        return 0, 0

def main():
    print("=== District 5 Neighborhood Optimization Tool ===")
    print(f"Minimum overlap percentage: {MIN_OVERLAP_PERCENTAGE}%")
    print(f"Minimum overlap area: {MIN_OVERLAP_AREA_SQ_M:,} sq meters")
    print()
    
    # Change to project root directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    os.chdir(project_root)
    
    print("Loading District 5 boundary...")
    try:
        district_gdf = load_geojson('_data/district/district5_filtered.json')
        district_geometry = district_gdf.geometry.iloc[0]
    except Exception as e:
        print(f"Error loading district data: {e}")
        return 1
    
    print("Loading neighborhoods data...")
    try:
        neighborhoods_gdf = load_geojson('_data/neighborhoods/neighborhoods_geo.json')
    except Exception as e:
        print(f"Error loading neighborhoods data: {e}")
        return 1
    
    print(f"Current number of neighborhoods: {len(neighborhoods_gdf)}")
    print()
    
    # Analyze each neighborhood
    print("Analyzing neighborhood overlaps...")
    neighborhoods_to_keep = []
    neighborhoods_to_remove = []
    analysis_results = []
    
    for idx, neighborhood in neighborhoods_gdf.iterrows():
        neighborhood_name = neighborhood.get('NAME', f'Neighborhood {idx}')
        neighborhood_geom = neighborhood.geometry
        
        # Skip if geometry is invalid
        if not neighborhood_geom or neighborhood_geom.is_empty:
            print(f"⚠️  Skipping {neighborhood_name} - invalid geometry")
            continue
        
        # Check if neighborhood intersects with district
        if not neighborhood_geom.intersects(district_geometry):
            print(f"❌ {neighborhood_name} - No intersection")
            neighborhoods_to_remove.append({
                'name': neighborhood_name,
                'reason': 'No intersection',
                'overlap_pct': 0,
                'overlap_area': 0
            })
            continue
        
        # Calculate overlap metrics
        overlap_pct, overlap_area = calculate_overlap_metrics(neighborhood_geom, district_geometry)
        
        # Determine if we should keep this neighborhood
        keep_neighborhood = False
        reason = ""
        
        if overlap_pct >= MIN_OVERLAP_PERCENTAGE:
            keep_neighborhood = True
            reason = f"Good overlap: {overlap_pct:.1f}%"
        elif overlap_area >= MIN_OVERLAP_AREA_SQ_M:
            keep_neighborhood = True
            reason = f"Large area: {overlap_area/10000:.1f} hectares"
        else:
            reason = f"Minimal overlap: {overlap_pct:.1f}% / {overlap_area/10000:.1f} hectares"
        
        analysis_results.append({
            'name': neighborhood_name,
            'overlap_pct': overlap_pct,
            'overlap_area': overlap_area,
            'keep': keep_neighborhood,
            'reason': reason
        })
        
        if keep_neighborhood:
            neighborhoods_to_keep.append(idx)
            print(f"✅ {neighborhood_name} - {reason}")
        else:
            neighborhoods_to_remove.append({
                'name': neighborhood_name,
                'reason': reason,
                'overlap_pct': overlap_pct,
                'overlap_area': overlap_area
            })
            print(f"❌ {neighborhood_name} - {reason}")
    
    # Create filtered dataset
    filtered_neighborhoods = neighborhoods_gdf.iloc[neighborhoods_to_keep].copy()
    
    print()
    print("=== OPTIMIZATION SUMMARY ===")
    print(f"Original neighborhoods: {len(neighborhoods_gdf)}")
    print(f"Neighborhoods kept: {len(filtered_neighborhoods)}")
    print(f"Neighborhoods removed: {len(neighborhoods_to_remove)}")
    print(f"Optimization removed: {len(neighborhoods_to_remove)} additional neighborhoods")
    
    if neighborhoods_to_remove:
        print()
        print("Removed neighborhoods:")
        for removal in neighborhoods_to_remove:
            print(f"  - {removal['name']}: {removal['reason']}")
    
    # Ask for confirmation before saving
    print()
    response = input("Save optimized neighborhoods data? (y/N): ").lower().strip()
    
    if response == 'y' or response == 'yes':
        print("\nSaving optimized neighborhoods data...")
        
        # Convert back to GeoJSON format
        geojson_dict = {
            "type": "FeatureCollection",
            "name": "Official_Neighborhoods_-_Open_Data",
            "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
            "features": []
        }
        
        for idx, row in filtered_neighborhoods.iterrows():
            feature = {
                "type": "Feature",
                "properties": row.drop('geometry').to_dict(),
                "geometry": row.geometry.__geo_interface__
            }
            geojson_dict["features"].append(feature)
        
        # Save the optimized data
        with open('_data/neighborhoods/neighborhoods_geo.json', 'w') as f:
            json.dump(geojson_dict, f, separators=(',', ':'))
        
        print(f"✅ Saved optimized neighborhoods data with {len(filtered_neighborhoods)} neighborhoods")
        
        # Save analysis report
        report_path = 'script/neighborhood_optimization_report.json'
        report_data = {
            'analysis_date': pd.Timestamp.now().isoformat(),
            'criteria': {
                'min_overlap_percentage': MIN_OVERLAP_PERCENTAGE,
                'min_overlap_area_sq_m': MIN_OVERLAP_AREA_SQ_M
            },
            'summary': {
                'original_count': len(neighborhoods_gdf),
                'kept_count': len(filtered_neighborhoods),
                'removed_count': len(neighborhoods_to_remove)
            },
            'removed_neighborhoods': neighborhoods_to_remove,
            'analysis_results': analysis_results
        }
        
        with open(report_path, 'w') as f:
            json.dump(report_data, f, indent=2)
        
        print(f"📊 Analysis report saved to: {report_path}")
        
    else:
        print("❌ Operation cancelled. No changes made.")
    
    return 0

if __name__ == "__main__":
    sys.exit(main()) 