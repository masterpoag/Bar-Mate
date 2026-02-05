# Contribution Guidelines

Thank you for your interest in contributing to this project!

This project aims to provide a high-quality, accurate, and useful cocktail database and bar management tool. To keep the data clean and the app performant, we follow strict contribution rules.

---

## Before Contributing

Please make sure:

- Your drink is a real, documented cocktail
- The drink is not already in the database
- All fields match the required JSON format exactly
- Ingredient amounts use recognizable units (oz, ml, cl, tbsp, tsp, dash, splash, twist, etc.)
- Instructions are clear and readable
- The image is a valid public URL

---

## Verification Process (Important)

All user-submitted drinks are placed into a temporary JSON file.

A validation script is run to:

- Check for duplicate drinks
- Detect fake or nonsense submissions
- Validate the JSON structure
- Ensure ingredient formatting is correct
- Confirm the drink exists in reputable sources (IBA, CocktailDB, Difford’s, etc.)

Only drinks that pass this script are merged into the main database.

---

## Required JSON Format

Every drink must follow this structure exactly:

```json
{
  "name": "Drink Name",
  "ingredients": [
    {
      "name": "Ingredient",
      "amount": "1 oz"
    }
  ],
  "instructions": "Step by step instructions.",
  "description": "IBA | Classic | Modern | etc.",
  "image": "https://image-url.jpg",
  "glass": "Glass type",
  "category": "Cocktail",
  "alcoholic": "Alcoholic | Non alcoholic"
}
```
--- 
## Submissions That Will Be Rejected

Fake drinks

Meme drinks

Missing fields

Incorrect formatting

Duplicate drinks

“Personal creations” without documentation

Ingredients without amounts

Broken image links

---

## Good Submission Example

Well known cocktail

Proper measurements

Proper instructions

Valid image

Clean formatting

---

## How to Contribute

Clone The Git

Make Edits (UI, Adding Drink, Adding Features)

Open a Pull Request referencing the submission

Wait For Me To Test and Approve It

---

## Goal of This Project

Accuracy over quantity

Quality over spam

Real cocktails only
