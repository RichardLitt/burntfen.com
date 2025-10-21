import os
import sys
import subprocess
import shutil
import time
import requests
import bibtexparser

CROSSREF_API = "https://api.crossref.org/works/"
DATACITE_API = "https://api.datacite.org/dois/"
DOI_RESOLVER = "https://doi.org/"
OUTPUT_FILE = "publications.bib"

HEADERS = {
    "User-Agent": "BibValidator/1.0 (mailto:you@example.com)",
    "Accept": "application/json, text/html;q=0.9"
}

# ---------------------------------------------------------------------------
# 0) bibtex-tidy integration
# ---------------------------------------------------------------------------

def have_bibtex_tidy():
    """Return command to invoke bibtex-tidy (global or npx fallback)."""
    cmd = shutil.which("bibtex-tidy")
    if cmd:
        return ["bibtex-tidy"]
    return ["npx", "--yes", "bibtex-tidy"]

def tidy_bib_file(path, extra_args=None):
    """Run bibtex-tidy in-place on the file."""
    args = extra_args or [
        "--modify",
        "--wrap=100",
        "--curly",
        "--remove-empty-fields",
        "--sort=key"
    ]
    cmd = have_bibtex_tidy() + args + [path]
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.PIPE,
                       stderr=subprocess.PIPE, text=True)
    except subprocess.CalledProcessError as e:
        print(f"bibtex-tidy failed on {path}:\n{e.stderr}", file=sys.stderr)
        sys.exit(1)

def tidy_all_bib_files(directory):
    for file in os.listdir(directory):
        if file.endswith(".bib") and file != OUTPUT_FILE:
            tidy_bib_file(os.path.join(directory, file))

# ---------------------------------------------------------------------------
# 1) DOI VALIDATION (Crossref → DataCite → doi.org)
# ---------------------------------------------------------------------------

def check_doi(doi):
    """Check DOI via Crossref, then DataCite, then doi.org fallback."""
    apis = (CROSSREF_API, DATACITE_API)
    for api in apis:
        try:
            r = requests.get(api + doi, headers=HEADERS, timeout=10)
            if r.status_code == 200:
                print(f"✔ DOI {doi} found in {api.split('//')[1].split('/')[0]}")
                return True
            elif r.status_code in (403, 404):
                continue
        except requests.RequestException:
            continue

    # Fallback: test doi.org resolution
    try:
        r = requests.head(DOI_RESOLVER + doi, headers={
            **HEADERS,
            "Accept-Language": "en-US,en;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
        }, allow_redirects=True, timeout=10)
        if r.status_code < 400:
            print(f"✔ DOI {doi} resolves via doi.org → {r.url}")
            return True
        else:
            print(f"✘ DOI {doi} failed via doi.org ({r.status_code})")
    except requests.RequestException as e:
        print(f"⚠ Error resolving {doi}: {e}")
    return False

# ---------------------------------------------------------------------------
# 2) File-level validation and parsing
# ---------------------------------------------------------------------------

def validate_bibtex_file(file_path):
    """Check all DOIs inside one .bib file."""
    with open(file_path, 'r', encoding='utf-8') as bib_file:
        bib_database = bibtexparser.load(bib_file)
        for entry in bib_database.entries:
            doi = entry.get("doi")
            if doi:
                check_doi(doi)
                time.sleep(0.3)  # Polite rate limit

def validate_bib_file(file_path):
    """Confirm a file parses as valid BibTeX."""
    validate_bibtex_file(file_path)
    try:
        with open(file_path, 'r', encoding='utf-8') as bib_file:
            bibtexparser.load(bib_file)
        return True
    except Exception as e:
        print(f"Error: {file_path} not well-formatted: {e}", file=sys.stderr)
        return False

def validate_all_bib_files(directory):
    """Ensure all .bib files are valid before proceeding."""
    for file in os.listdir(directory):
        if file.endswith(".bib") and file != OUTPUT_FILE:
            if not validate_bib_file(os.path.join(directory, file)):
                sys.exit(1)

# ---------------------------------------------------------------------------
# 3) Merge, sort, save
# ---------------------------------------------------------------------------

def extract_unique_bib_entries(directory):
    """Extract unique BibTeX entries from valid .bib files."""
    all_entries = {}
    parser = bibtexparser.bparser.BibTexParser(common_strings=True)
    parser.expect_multiple_parse = True

    for file in os.listdir(directory):
        if file.endswith(".bib") and file != OUTPUT_FILE:
            path = os.path.join(directory, file)
            with open(path, 'r', encoding='utf-8') as bib_file:
                db = bibtexparser.load(bib_file, parser=parser)
                for entry in db.entries:
                    key = entry.get("ID")
                    if key and key not in all_entries:
                        all_entries[key] = entry
    return list(all_entries.values())

def sort_bib_entries(entries):
    """Sort entries by ascending year, then title."""
    def sorting_key(entry):
        try:
            year = int(str(entry.get("year", "")).strip() or "0")
        except ValueError:
            year = 0
        title = entry.get("title", "").lower()
        return (year if year > 0 else 9999, title)
    return sorted(entries, key=sorting_key)

def save_sorted_bib(entries):
    """Write sorted entries to publications.bib."""
    db = bibtexparser.bibdatabase.BibDatabase()
    db.entries = entries
    with open(OUTPUT_FILE, "w", encoding="utf-8") as out:
        out.write(bibtexparser.dumps(db).strip() + "\n")

# ---------------------------------------------------------------------------
# 4) Orchestration
# ---------------------------------------------------------------------------

def main():
    directory = "."

    print("Tidying .bib files with bibtex-tidy...")
    tidy_all_bib_files(directory)

    print("Validating DOIs and BibTeX structure...")
    validate_all_bib_files(directory)

    print("Extracting unique entries...")
    entries = extract_unique_bib_entries(directory)

    print(f"Found {len(entries)} unique entries. Sorting...")
    sorted_entries = sort_bib_entries(entries)

    print(f"Writing merged bibliography to {OUTPUT_FILE}...")
    save_sorted_bib(sorted_entries)

    print(f"✅ Done. {len(sorted_entries)} unique entries merged into {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
