# 🔁 Data Pipelines

This folder contains scripts and workflows that gather, clean, and transform public or campaign-generated data into actionable formats.

We use these pipelines to power dashboards, track field progress, and keep the campaign rooted in real, local knowledge—not guesswork or donor-class assumptions.

---

## 📦 What Belongs Here

| Type | Examples |
|------|----------|
| ✅ Public civic data | GA SOS voter rolls (non-PII), census blocks, precinct maps |
| ✅ Aggregated campaign data | Weekly canvass stats, anonymized yard sign logs |
| ✅ Public benefit datasets | Food banks, transit routes, community clinics |
| ✅ Extract/Transform/Load (ETL) scripts | Python, Node, or bash scripts for cleaning and reshaping data |

---

## 📁 Folder Structure

```text
data-pipelines/
├─ sources/
│   ├─ ga-voter-data/
│   ├─ ga-precincts-2024/
│   └─ census/
├─ scripts/
│   ├─ clean_fieldlogs.py
│   ├─ yard_sign_map.csv → geojson
│   └─ voter-roll-simplify.js
└─ outputs/
    ├─ cleaned/
    ├─ geojson/
    └─ dashboards-ready/
````

---

## 🚦 Privacy Redlines

* Do **not** store PII (names, phone numbers, addresses)
* Do **not** commit raw campaign data unless it’s redacted or aggregated
* Do **not** scrape or pull data without clear licensing or terms of use

If you're not sure, ask in [Discussions](https://discord.gg/ep6dBqPjhG/categories/tech-and-data)

---

## 🛠️ Getting Started

1. Choose an open Issue labeled `data`, `pipeline`, or `help wanted`
2. Clone or fork this repo
3. Add your ETL script to `scripts/`
4. Document your source in `sources/README.md`
5. Commit outputs to `outputs/cleaned/` or `outputs/dashboards-ready/`

---

## 📚 Suggested Tasks for First-Time Contributors

* Write a script to normalize ZIP code formats in canvass logs
* Convert census block shapefiles to simplified GeoJSON for maps
* Build a CLI tool that checks public datasets for daily updates

---

## 🤝 Contributor Norms

* All scripts should include inline comments + a docstring header
* File names use `snake_case`, outputs use `kebab-case`
* Use `outputs/` for versioned snapshots—don’t overwrite historical data
* If you’re working on something long-term, open a tracking issue

---

## 📬 Need Help?

Ask `@data-leads` in GitHub Issues or join the weekly co-working call
We welcome folks with all backgrounds—no stats degree required!

---

**Data in the hands of the people = power. Let’s use it wisely.**