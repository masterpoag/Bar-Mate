# 🍹 Bar Mate

![GitHub repo size](https://img.shields.io/github/repo-size/masterpoag/Bar-Mate)
![GitHub contributors](https://img.shields.io/github/contributors/masterpoag/Bar-Mate)
![GitHub license](https://img.shields.io/github/license/masterpoag/Bar-Mate)
---

Welcome to **Bar Mate**! This is a free, open-source project that lets you explore, search, and discover cocktails. You can check what cocktails you can make with your current bar stock, search by ingredients or names, and get detailed instructions for each drink.  

This project is completely free to use, and contributions are very welcome!

---
## Live Server

You can use this website for free with no ads at https://bar.ravstormdev.top

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

### Easiest

1. Clone the repository:

```bash
git clone https://github.com/masterpoag/Bar-Mate.git
cd Bar-Mate
npm install
npm run dev -- --host --port {PORT}
```

The app should now be running at http://localhost:{PORT}.

### Harder (Requires MongoDB)
---

1. Clone the repository:

```bash
git clone -b json-only-branch https://github.com/masterpoag/Bar-Mate.git
cd Bar-Mate
npm install
```

2. Create your .env:

Create file named .env in the root and have it point to your mongoDB with MONGO_URI=


3. Populate the database: 

```bash
node backend/migrate.js
```

4. Finally Run
```bash
npm run dev:full
```

The app should now be running at http://localhost:7687.
The API should now be running on http://localhost:5000.

---

## 💡 Contribution

Contributions are welcome! Head to [CONTRIBUTION.md](https://github.com/masterpoag/Bar-Mate/blob/main/CONTRIBUTION.md) for more information.
