# 🚀 InsightForge AI

InsightForge AI is a full-stack dataset analytics platform that allows users to upload CSV files and instantly generate dataset profiles, quality metrics, and exploratory insights.

## 🌐 Live Demo

Frontend:
https://insight-forage-ai.vercel.app

Backend:
https://insightforage-ai.onrender.com

---

## ✨ Features

- Upload CSV datasets
- Automatic dataset profiling
- Row and column statistics
- Missing value analysis
- Duplicate detection
- Dataset catalog sidebar
- Responsive modern UI
- Cloud deployment

---

## 📊 Analytics Generated

For every uploaded dataset:

- Total rows
- Total columns
- Missing values count
- Duplicate records count
- Column listing
- Dataset metadata

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Axios
- CSS

### Backend
- Django
- Django REST Framework
- Pandas

### Deployment
- Vercel (Frontend)
- Render (Backend)
- GitHub

---

## 📂 Project Structure

```text
InsightForge-AI
│
├── frontend/
│   ├── src/
│   └── public/
│
├── backend/
│   ├── analytics/
│   ├── datasets/
│   ├── users/
│   └── insightforge/
│
└── README.md
```

---

## 🚀 Local Setup

### Clone Repository

```bash
git clone https://github.com/nidhi0325-source/InsightForage-AI.git
cd InsightForage-AI
```

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 🎯 Future Enhancements

- Interactive charts
- AI-generated dataset insights
- Authentication system
- PostgreSQL database
- Report export (PDF)
- Dataset comparison dashboard

---

## 👩‍💻 Author

Nidhi

Built as a full-stack portfolio project demonstrating React, Django REST Framework, Pandas, cloud deployment, and data analytics workflows.
