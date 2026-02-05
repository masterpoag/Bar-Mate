import json
import os
import requests
from bs4 import BeautifulSoup

BASE_URL = "https://iba-world.com/cocktails/all-cocktails/page/1/"
JSON_FILE = "src/data/cocktails.json"
TEMP_FILE = "src/data/cocktails_temp.json"



def search_pages():
    def fetch_cocktails_on_page(soup):
        return [h2.get_text(strip=True) for h2 in soup.find_all("h2")]
    page = 1
    all_cocktails = []

    for i in range(1,6):
        url = f"https://iba-world.com/cocktails/all-cocktails/page/{page}/"
        response = requests.get(url)
        if response.status_code != 200:
            break

        soup = BeautifulSoup(response.content, "html.parser")
        cocktails = fetch_cocktails_on_page(soup)
        if not cocktails:
            break
        all_cocktails.extend(cocktails)
        page += 1

    return all_cocktails




def get_info(drink):
    url = f"https://iba-world.com/iba-cocktail/{drink.replace(' ', '-')}/"
    response = requests.get(url)
    if response.status_code != 200:
        return None

    soup = BeautifulSoup(response.content, "html.parser")

    def get_ingredients_list(soup):
        header = soup.find(lambda tag: tag.name in ["h2", "h3", "h4"] 
                                and "ingredient" in tag.get_text().lower())
        ul = header.find_next("ul")
        if not ul:
            print("❌ Ingredient UL not found")
            return []
        ingredients = [li.get_text(strip=True) for li in ul.find_all("li")]

        for i in ingredients:
            name = i.split("ml")[-1].strip()
            measure = i.split("ml")[0].strip() + " ml"
            if name:
                ingredients[ingredients.index(i)] = {
                    "name": name.strip(),
                    "amount": measure.strip() if measure else ""
                }
        return ingredients
    
    def get_image_url(soup):
        img = soup.find(
        "img",
        class_=[
            "attachment-medium_large",
            "size-medium_large",
            "wp-image-299"
        ]
        )

        if img:
            image_url = img.get("src")
        else:
            print("❌ Image not found")
        return image_url if img else ""
    
    def get_decription(soup):

        result = {}

        for heading_text in ["method", "garnish"]:
            header = soup.find(
                lambda tag: tag.name in ["h3", "h4"] 
                and heading_text in tag.get_text(strip=True).lower()
            )

            if not header:
                result[heading_text] = ""
                continue

            # Get the next shortcode div
            shortcode_div = header.find_next("div", class_="elementor-shortcode")
            if not shortcode_div:
                result[heading_text] = ""
                continue

            paragraphs = [p.get_text(strip=True) for p in shortcode_div.find_all("p")]
            result[heading_text] = " ".join(paragraphs)

        instructions = result.get("method", "") + " " + result.get("garnish", "")
        return instructions.strip()

    cocktail = {
        "name": drink,
        "ingredients": get_ingredients_list(soup),
        "instructions": get_decription(soup),
        "description": "N/A",
        "image": get_image_url(soup),
        "glass": "N/A",
        "category": "IBA Official",
        "alcoholic": "Alcoholic"
    }
    return cocktail


def save_cocktails(cocktails, filename):
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(cocktails, f, indent=2, ensure_ascii=False)
    print(f"Saved {len(cocktails)} cocktails to {filename}")

cocktails = []

for url in search_pages():
    info = get_info(url)
    cocktails.append(info)


added = 0
existing_cocktails = []
existing_names = set()


for cocktail in cocktails:
    print(cocktail)
    if cocktail and cocktail['name'] not in existing_names:
        existing_cocktails.append(cocktail)
        existing_names.add(cocktail['name'])
        added += 1
    else:
        print(f"Skipped duplicate: {cocktail['name'] if cocktail else 'None'}")

save_cocktails(existing_cocktails, TEMP_FILE)


