# 🍹 Bar Mate

![GitHub repo size](https://img.shields.io/github/repo-size/masterpoag/Bar-Mate)
![GitHub contributors](https://img.shields.io/github/contributors/masterpoag/Bar-Mate)
![GitHub license](https://img.shields.io/github/license/masterpoag/Bar-Mate)

Welcome to **Bar Mate**! This is a free, open-source project that lets you explore, search, and discover cocktails. You can check what cocktails you can make with your current bar stock, search by ingredients or names, and get detailed instructions for each drink.  

This project is completely free to use, and contributions are very welcome!

---

## 🌟 Features

- Browse cocktails with images, instructions, and ingredient lists  
- Search cocktails by **name** or **ingredients** using fuzzy search  
- See which ingredients you’re missing based on your bar stock  
- Dark mode toggle for comfortable viewing  
- Open-source: contribute or suggest new features on GitHub  

---

## 🛠 Tech Stack

- **Frontend:** React  
- **Routing:** React Router  
- **State & Cookies:** React `useState` + `js-cookie`  
- **Search:** Fuse.js for fuzzy searching  
- **Data:** local JSON storage using TheCocktailDB API to fill it out  

---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/masterpoag/Bar-Mate.git
cd Bar-Mate
npm install
npm run dev -- --host --port {PORT}
```

The app should now be running at http://localhost:{PORT}.
🍸 Adding Cocktails

You can fetch random cocktails from TheCocktailDB API using the provided Python script:

python fetch_cocktails.py

This script will save cocktails to cocktails.json including:

    Name

    Ingredients and measurements

    Instructions

    Image

    Glass type

    Category

    Alcoholic status

💡 Contribution

Contributions are welcome! You can:

    Suggest new features

    Fix bugs

    Add more cocktails

    Improve UI/UX

To contribute:

    Fork the repository

    Create a new branch

    Make your changes

    Submit a pull request
