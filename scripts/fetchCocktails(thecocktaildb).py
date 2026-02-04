import requests
import json
import os

API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
JSON_FILE = "src/data/cocktails.json"

def fetch_random_cocktail():
    response = requests.get(API_URL)
    response.raise_for_status()
    data = response.json()

    drinks = data.get("drinks", [])
    if not drinks:
        return None

    drink = drinks[0]

    # Collect ingredients with measurements
    ingredients = []
    for i in range(1, 16):
        name = drink.get(f"strIngredient{i}")
        measure = drink.get(f"strMeasure{i}")
        if name:
            ingredients.append({
                "name": name.strip(),
                "amount": measure.strip() if measure else ""
            })

    cocktail = {
        "name": drink.get("strDrink"),
        "ingredients": ingredients,
        "instructions": drink.get("strInstructions"),
        "description": drink.get("strTags") or "",
        "image": drink.get("strDrinkThumb"),
        "glass": drink.get("strGlass"),
        "category": drink.get("strCategory"),
        "alcoholic": drink.get("strAlcoholic")
    }

    return cocktail

def load_existing_cocktails(filename):
    if not os.path.exists(filename):
        return []
    with open(filename, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []

def save_cocktails(cocktails, filename):
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(cocktails, f, indent=2, ensure_ascii=False)
    print(f"Saved {len(cocktails)} cocktails to {filename}")

def main():
    times = int(input("How many random cocktails do you want to fetch? "))
    existing_cocktails = load_existing_cocktails(JSON_FILE)
    existing_names = {c['name'] for c in existing_cocktails}

    added = 0
    for _ in range(times):
        cocktail = fetch_random_cocktail()
        if cocktail and cocktail['name'] not in existing_names:
            existing_cocktails.append(cocktail)
            existing_names.add(cocktail['name'])
            added += 1
        else:
            print(f"Skipped duplicate: {cocktail['name'] if cocktail else 'None'}")

    save_cocktails(existing_cocktails, JSON_FILE)
    print(f"Added {added} new cocktails.")

if __name__ == "__main__":
    main()
