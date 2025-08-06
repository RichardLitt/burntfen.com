# Just edit the individual bib file, and then concat them all into this one file.

import os
import sys
import bibtexparser
import requests

CROSSREF_API = "https://api.crossref.org/works/"

def validate_bibtex_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as bib_file:
        bib_database = bibtexparser.load(bib_file)

        for entry in bib_database.entries:
            doi = entry.get("doi")
            if doi:
                response = requests.get(CROSSREF_API + doi)
                if response.status_code == 200:
                    print(f"✔ DOI {doi} is valid.")
                else:
                    print(f"✘ DOI {doi} is invalid or not found.")

OUTPUT_FILE = "publications.bib"

def validate_bib_file(file_path):
    validate_bibtex_file(file_path)
    """Check if a .bib file is well-formatted."""
    try:
        with open(file_path, 'r', encoding='utf-8') as bib_file:
            bibtexparser.load(bib_file)
        return True
    except Exception as e:
        print(f"Error: {file_path} is not well-formatted: {e}", file=sys.stderr)
        return False

def validate_all_bib_files(directory):
    """Ensure all .bib files in the directory are valid before proceeding."""
    for file in os.listdir(directory):
        if file.endswith(".bib") and file != OUTPUT_FILE:
            if not validate_bib_file(os.path.join(directory, file)):
                sys.exit(1)  # Exit early if any file is malformed

def extract_unique_bib_entries(directory):
    """Extracts all unique BibTeX entries from valid .bib files."""
    all_entries = {}
    parser = bibtexparser.bparser.BibTexParser(common_strings=True)
    parser.expect_multiple_parse = True

    for file in os.listdir(directory):
        if file.endswith(".bib") and file != OUTPUT_FILE:
            file_path = os.path.join(directory, file)
            with open(file_path, 'r', encoding='utf-8') as bib_file:
                bib_database = bibtexparser.load(bib_file, parser=parser)

                for entry in bib_database.entries:
                    key = entry.get("ID")  # BibTeX keys should be unique
                    if key and key not in all_entries:
                        all_entries[key] = entry  # Store only unique entries

    return list(all_entries.values())

def sort_bib_entries(entries):
    """Sorts BibTeX entries: newest year last, then by title alphabetically."""
    def sorting_key(entry):
        year = int(entry.get("year", "0000"))  # Default to 0 if missing
        title = entry.get("title", "").lower()  # Ensure case-insensitive title sorting
        return (-year, title)  # Sort year descending, title ascending

    return sorted(entries, key=sorting_key)

def save_sorted_bib(entries):
    """Writes sorted BibTeX entries to the output file."""
    bib_database = bibtexparser.bibdatabase.BibDatabase()
    bib_database.entries = entries  # Assign sorted, unique entries

    with open(OUTPUT_FILE, "w", encoding="utf-8") as output_file:
        output_file.write(bibtexparser.dumps(bib_database).strip() + "\n\n")  # Ensure proper spacing

def main():
    """Main function: Validate, extract, deduplicate, sort, and merge BibTeX files."""
    directory = "."

    # Check if bibtexparser is installed
    try:
        import bibtexparser
    except ImportError:
        print("Error: The Python module 'bibtexparser' is not installed.", file=sys.stderr)
        print("Install it using: pip install bibtexparser", file=sys.stderr)
        sys.exit(1)

    print("Checking .bib files for formatting errors...")
    validate_all_bib_files(directory)

    print("All .bib files are well-formatted. Extracting unique entries...")
    entries = extract_unique_bib_entries(directory)

    print(f"Found {len(entries)} unique entries. Sorting them...")
    sorted_entries = sort_bib_entries(entries)

    print("Saving sorted entries to publications.bib...")
    save_sorted_bib(sorted_entries)

    print(f"Merged and sorted {len(sorted_entries)} unique BibTeX entries into {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
