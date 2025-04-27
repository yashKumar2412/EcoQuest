# EcoQuest 🌎

EcoQuest is a gamified community-driven platform designed to keep our city of San Jose clean, one cleanup at a time!  
Users can report pollution sightings, earn points and badges, view leaderboards, and track their environmental impact — all through a simple and fun web app experience.

---

## 🌟 About the App

EcoQuest encourages local communities to actively participate in cleaning up their environment.  
By making environmental action **fun, trackable, and rewarding**, we aim to create a stronger bond between people and their surroundings.

Check out the [Youtube Video](https://youtu.be/842AK8k3-_I?si=2CL9FMEn8XOAoKj4) & [Presentation](https://docs.google.com/presentation/d/1bypuOZK_MpyPuDk7_ehjRW469wWCU4ChBJJqVqGNOwg/edit?usp=sharing) for walkthrough & details!

---

## 🚀 Features

- 📸 Report pollution spots with photo uploads and geolocation tagging
- 🟨 Visualize cleanup locations on an interactive Google Map
- 🏆 Earn points and unlock badges as you contribute
- 📋 View your personal cleanup history
- 🏅 Compete on the live community leaderboard
- 💖 Collect unique badges based on your contributions
- 🚹 Real-time updates without any page reloads
---

## 🛠️ Technologies Used

| Layer | Technologies |
|:---|:---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Python (FastAPI) |
| Database | Google Firebase Firestore |
| Maps | Google Maps JavaScript API |
| Authentication | (Planned future enhancement) |
| Hosting | Localhost (demo version) |

---

## 🛠️ Installation & Setup

1. **Clone the Repository**

```bash
git clone https://github.com/your-username/ecoquest.git
cd ecoquest/backend
```

2. **Install Python dependencies**

```bash
pip install -r requirements.txt
```

3. **Set up Firebase**
- Create a Firestore database from the Firebase Console.
- Download your **serviceAccountKey.json** and place it in `app/secrets/`.
- Update the SERVICE_ACCOUNT_PATH variable in db.py with appropriate Firebase API key.

4. **Upload Sample Data (Optional)**
- Create a folder 'images' inside your backend/app folder with stock images (1.jpeg to 5.jpeg).
- Create a folder 'uploads' inside your backend folder for image storage per report.
- Run the script to load default users and generate cleanup reports:

```bash
cd app
python load_data.py
```

5. **Configure Google Maps API Key**
- Create a new API key from Google Cloud Console.
- Enable Maps JavaScript API for your project.
- In frontend/secrets/config.js, add your API key like:

```javascript
const GOOGLE_MAPS_API_KEY = "your-api-key-here";
const BACKEND_URL = "http://127.0.0.1:8000";
const LOGGED_IN_USERNAME = "YourUsername";
```

6. **Run FastAPI Server**

```bash
uvicorn app.main:app --reload
```

7. **Frontend Access**
- Open `frontend/index.html` directly in your browser.
- Make sure the `BACKEND_URL` in your `config.js` matches your FastAPI server (e.g., `http://127.0.0.1:8000`).

---

## 📋 Usage Instructions

- Click **"Report Cleanup"** to drop a pin and submit a pollution report with a photo.
- View your **Leaderboard** position as you collect points.
- Check your **Badges** as you unlock environmental achievements.
- Visit **My Reports** to see all cleanups you contributed to!

---

## 🚀 Planned Future Enhancements

- 🛡️ User login/signup (authentication)
- 🌐 Deploy backend and frontend to cloud hosting (e.g., AWS, GCP)
- 📱 Responsive mobile UI improvements
- 📣 Social media sharing (Facebook, Twitter integrations)
- 🌆 City-wide cleanup events and leaderboards

---

## 🤝 Contributing

We welcome contributions to EcoQuest!

- Fork the repository
- Create your feature branch: `git checkout -b my-feature`
- Commit your changes: `git commit -m 'Add some feature'`
- Push to the branch: `git push origin my-feature`
- Open a Pull Request 🚀

---

## 📜 License

This project is open source under the [MIT License](LICENSE).

---

### 🌎 EcoQuest — Gamify Cleanups. Empower Communities. 🪹
