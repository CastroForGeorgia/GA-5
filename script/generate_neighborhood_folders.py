#!/usr/bin/env python3
"""
Generate neighborhood folders and README.md files for all neighborhoods in District 5.
Creates folder structure and files following the Oakland City template format.
"""

import pandas as pd
import os
import re
import sys
from pathlib import Path

def slugify(text):
    """Convert text to URL-friendly slug."""
    if pd.isna(text) or text == '':
        return 'unknown'
    
    # Convert to lowercase and replace spaces/special chars with hyphens
    slug = re.sub(r'[^\w\s-]', '', str(text).lower())
    slug = re.sub(r'[-\s]+', '-', slug)
    slug = slug.strip('-')
    
    # Handle edge cases
    if not slug:
        return 'unnamed'
    
    return slug

def get_npu_link(npu):
    """Generate NPU link based on NPU value."""
    if pd.isna(npu) or npu == '':
        return "[NPU Info](https://www.atlantaga.gov/government/departments/city-planning/neighborhood-planning-units/neighborhood-and-npu-contacts)"
    
    npu_clean = str(npu).strip().upper()
    npu_url = f"https://www.atlantaga.gov/government/departments/city-planning/neighborhood-planning-units/neighborhood-and-npu-contacts"
    return f"[NPU-{npu_clean}]({npu_url})"

def clean_value(value):
    """Clean and format values from CSV."""
    if pd.isna(value):
        return ''
    return str(value).strip()

def generate_readme_content(row):
    """Generate README.md content for a neighborhood."""
    
    neighborhood_name = clean_value(row['NAME'])
    slug = slugify(neighborhood_name)
    
    # Extract values with proper handling of NaN
    neighborhood_id = row['OBJECTID'] if not pd.isna(row['OBJECTID']) else 'unknown'
    acres = row['ACRES'] if not pd.isna(row['ACRES']) else 'unknown'
    square_miles = row['SQMILES'] if not pd.isna(row['SQMILES']) else 'unknown'
    npu = clean_value(row['NPU']) if not pd.isna(row['NPU']) else ''
    geotype = clean_value(row['GEOTYPE'])
    oldname = clean_value(row['OLDNAME']) if not pd.isna(row['OLDNAME']) else neighborhood_name
    
    # Generate content
    content = f"""---
layout: neighborhoods
title: "{neighborhood_name} Organizing"
description: "Local organizing hub for {neighborhood_name} neighborhood. Connect with field operations, mutual aid, and community organizing efforts."
permalink: /neighborhoods/{slug}/
# Neighborhood metadata from neighborhoods_info.csv
neighborhood_id: {neighborhood_id}
neighborhood_name: "{neighborhood_name}"
acres: {acres}
square_miles: {square_miles}
npu: "{npu}"
geotype: "{geotype}"
oldname: "{oldname}"
---

### **{neighborhood_name}: A Community Snapshot**

  * **Neighborhood Planning Unit:** {get_npu_link(npu)}
  * **City Council District:** [District 5](https://citycouncil.atlantaga.gov/council-members/antonio-lewis)
  * **Area:** {acres} acres ({square_miles} sq. miles)

- 🚧 **Coming soon — this hub is still under construction.**
- Check back shortly for updates, resources, and ways to get involved.

## Quick Links

- [Field Operations](./field-ops/)
- [Mutual Aid](./mutual-aid/)

## Get Involved

Interested in volunteering or sharing feedback? Reach out to the campaign and help shape the future of {neighborhood_name}.
"""
    
    return content, slug

def create_neighborhood_folders():
    """Create neighborhood folders and README files."""
    
    # Load the CSV file
    csv_file = '_data/neighborhoods/neighborhoods_info.csv'
    print(f"Loading neighborhoods from {csv_file}...")
    
    try:
        df = pd.read_csv(csv_file)
        print(f"Found {len(df)} neighborhoods to process")
    except Exception as e:
        print(f"❌ Error loading CSV: {e}")
        return False
    
    base_dir = Path('content/_campaign/neighborhoods')
    base_dir.mkdir(parents=True, exist_ok=True)
    
    created_count = 0
    skipped_count = 0
    errors = []
    
    for index, row in df.iterrows():
        try:
            # Generate content and slug
            readme_content, slug = generate_readme_content(row)
            
            # Create neighborhood directory
            neighborhood_dir = base_dir / slug
            neighborhood_dir.mkdir(exist_ok=True)
            
            # Create README.md file
            readme_path = neighborhood_dir / 'README.md'
            
            if readme_path.exists():
                print(f"⚠️  Skipping {slug} - README.md already exists")
                skipped_count += 1
                continue
            
            with open(readme_path, 'w', encoding='utf-8') as f:
                f.write(readme_content)
            
            print(f"✅ Created: {slug}")
            created_count += 1
            
        except Exception as e:
            neighborhood_name = clean_value(row.get('NAME', 'unknown'))
            error_msg = f"Error processing {neighborhood_name}: {e}"
            errors.append(error_msg)
            print(f"❌ {error_msg}")
    
    # Summary
    print(f"\n{'='*60}")
    print(f"✅ Successfully created: {created_count} neighborhoods")
    print(f"⚠️  Skipped (already exists): {skipped_count} neighborhoods")
    
    if errors:
        print(f"❌ Errors: {len(errors)}")
        for error in errors:
            print(f"   - {error}")
    
    total_expected = len(df)
    total_processed = created_count + skipped_count + len(errors)
    
    if total_processed == total_expected:
        print(f"🎉 All {total_expected} neighborhoods processed successfully!")
        return True
    else:
        print(f"⚠️  Expected {total_expected}, processed {total_processed}")
        return False

def main():
    """Main function."""
    print("🏘️  Generating neighborhood folders and README files...")
    print("="*60)
    
    try:
        success = create_neighborhood_folders()
        if success:
            print("\n🎉 Neighborhood generation complete!")
        else:
            print("\n⚠️  Generation completed with issues")
            sys.exit(1)
            
    except Exception as e:
        print(f"❌ Fatal error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 