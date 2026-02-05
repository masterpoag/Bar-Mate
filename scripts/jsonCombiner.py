import json

MAIN_FILE = "src/data/cocktails.json"
TEMP_FILE = "src/data/cocktails_temp.json"


def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)


def merge_cocktails():
    main_data = load_json(MAIN_FILE)
    temp_data = load_json(TEMP_FILE)

    # Build a set of existing cocktail names (lowercase for safety)
    existing_names = {c["name"].strip().lower() for c in main_data}

    added = 0

    for cocktail in temp_data:
        name = cocktail.get("name", "").strip().lower()

        if name and name not in existing_names:
            main_data.append(cocktail)
            existing_names.add(name)
            added += 1

    save_json(MAIN_FILE, main_data)

    print(f"Added {added} new cocktails to {MAIN_FILE}")


def fix_cocktail_data(cocktail):
    # Example fix: Ensure 'amount' field is not incorrectly appended with unit
    for ingredient in cocktail.get("ingredients", []):
        name = ingredient.get("name", "")
        amount = ingredient.get("amount", "")
        if amount == name + " ml":
            ingredient["amount"] = ""
            
    return cocktail


if __name__ == "__main__":
    temp = load_json(TEMP_FILE)
    for _ in temp:
        fix_cocktail_data(_)
    save_json(TEMP_FILE, temp)

    merge_cocktails()
