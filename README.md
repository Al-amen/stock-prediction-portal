
# 📈 Stock Prediction Portal

A full-stack stock price prediction platform built with Django, React, and LSTM-based Deep Learning model. Authenticated users can input a stock ticker symbol (e.g., AAPL, GOOG) and visualize predictive insights based on historical data.



## Features
- User Authentication (Register/Login)
- Stock Price Prediction using LSTM
- Dynamic data visualization with plots:
  - Closing Price Trend
  - 100-day & 200-day Moving Averages
  - LSTM Predicted vs Actual Prices
- Real-time data fetching from Yahoo Finance
- RESTful API integration between Django backend & React frontend
## 🧠 Technologies Used

**Frontend:**
- React.js
- Axios
- React Router
- Bootstrap 

**Backend:**
- Django
- Django REST Framework
- JWT Authentication
- Matplotlib & Pandas
- TensorFlow / Keras (for LSTM model)
- yFinance (to fetch stock data)

**Model:**
- LSTM (Long Short-Term Memory) Neural Network for time-series prediction

---
## 🚀 Live Demo

🔗 [View Live Project](https://stock-prediction-portal-frontend-al.vercel.app/)


## Installation

🔙 Backend (Django)

```bash
cd backend-drf
python -m venv env
source env/bin/activate  # For Windows: env\Scripts\activate
pip install -r requirements.txt

# Run migrations and start server
python manage.py migrate
python manage.py runserver
```

🌐 Frontend (React)

```bash
cd frontend-react
npm install
npm run dev
```



## 🔧 Backend Environment Variables

Create a `.env` file in the `backend/` directory and add the following:

- `SECRET_KEY=your_django_secret_key`
- `DEBUG=True`
- `EMAIL_HOST_USER=testuser@gmail.com`
- `EMAIL_HOST_PASSWORD=APP_Password`
- `DEFAULT_FROM_EMAIL=testuser@gmail.com`

## 🌐 Frontend Environment Variables

Create a `.env` file in the `frontend/` directory and add the following:

- `VITE_BACKEND_BASE_API=Backend_URL/api/v1`
- `VITE_BACKEND_ROOT=Backend_URL`
## 🧪 How It Works

- User Authentication via JWT
- Enter stock ticker (e.g., AAPL, GOOG, TSLA)
- Real-time data is fetched using yFinance
- Data is preprocessed and passed to an LSTM model for prediction
- Graphs are rendered:
  - Closing Price
  - 100/200-Day Moving Averages
  - Predicted vs Actual Prices
- Results are displayed with metrics like MSE, RMSE, and R²

## 🔒 Authentication

- This portal uses JWT Authentication
- Sign Up and Login
- Token stored securely
- Protected API access

