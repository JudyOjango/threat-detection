# Threat Detection System – Frontend

This repository hosts the **frontend** of the Threat Detection System, a web-based interface developed using **React**. It connects to the Django backend to provide users with secure access to authentication, threat analysis tools, and reports.

---

## Technologies Used

- React.js (with Create React App)
- JavaScript (ES6+)
- Axios for API communication
- React Router for routing
- Bootstrap/TailwindCSS (if used)
- CORS-compliant backend integration

---

## Getting Started

Follow the instructions below to clone, install, and run the React frontend locally.

### 1. Clone the Repository

```bash
git clone https://github.com/JudyOjango/threat-detection.git
cd threat-detection
```

### 2. Install Dependencies

Ensure you have Node.js and npm installed. Then install required packages:

```bash
npm install
```

### 3. Run the Development Server

Start the React development server:

```bash
npm start
```

By default, the app will be available at:  
 `http://localhost:3000`

Ensure your backend server is also running at `http://localhost:8000` or the URL defined in your `.env` or API base path.

---

##  API Integration

The frontend is configured to communicate with the Django backend hosted at:

🔗 `https://backend-sc9k.onrender.com`

Ensure **CORS** is properly configured in the backend to allow requests from the frontend's origin.

---

## Project Structure

```
threat-detection/
│
├── public/               # Static public files
├── src/                  # Application source code
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page-level components
│   ├── services/         # API service functions (e.g., Axios)
│   ├── App.js            # Main application wrapper
│   └── index.js          # Entry point
├── .env                  # Environment variables (API URLs, etc.)
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

---

## Developer

**Judith Achieng' Ambogo**  
Frontend Developer | React Enthusiast | Cybersecurity Advocate  
[GitHub Profile](https://github.com/JudyOjango)

---

## License

This project is licensed under MIT.  
```

