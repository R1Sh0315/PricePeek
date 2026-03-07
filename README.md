# PricePeek India 🇮🇳

PricePeek is a high-performance price comparison and price tracking platform built on the MERN stack. It aggregates real-time data from major Indian retailers to help users find the absolute best deal.

## 🚀 Live Demo
- **Frontend**: [https://price-peek-five.vercel.app/](https://price-peek-five.vercel.app/)
- **Backend API**: [https://pricepeek-api.onrender.com/](https://pricepeek-api.onrender.com/)

---

## 💎 Features
- **Real-Time Price Comparison**: Instantly compare prices across **Amazon India**, **Flipkart**, **Croma**, and **Reliance Digital**.
- **Historical Price Charts**: Interactive line charts powered by `recharts` to identify the lowest historical price point.
- **Price Drop Alerts**: Set target prices and receive automated HTML email notifications via `nodemailer` when a threshold is met.
- **Affiliate Links**: "Buy on Store" external action CTA driving direct conversions.
- **Indian Market Localization**: All currency seamlessly formatted into Indian Rupees (INR) with `.toLocaleString('en-IN')` API.
- **SEO Optimization**: Client-side SEO routing managed through `react-helmet-async`.
- **Admin Dashboard**: Full CRUD management of users, products, stores, and insights.

## 🛠️ Tech Stack
**Frontend:**
- React (Vite)
- Tailwind CSS
- React Router 
- Context API
- Recharts (Data Visualization)
- Lucide React (Icons)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (Authentication)
- Nodemailer (Notifications)

---

## 🏃‍♂️ Running Locally

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/R1Sh0315/PricePeek.git
   cd PricePeek
   \`\`\`

2. **Backend Setup**
   \`\`\`bash
   cd backend
   npm install
   # Create a .env file with your MONGO_URI, JWT_SECRET, etc.
   npm run dev
   \`\`\`

3. **Frontend Setup**
   \`\`\`bash
   cd frontend
   npm install
   # Ensure Vite proxy points to your local backend, or set VITE_API_URL
   npm run dev
   \`\`\`

4. **Database Seeding**
   To populate the backend with the default Indian catalog:
   \`\`\`bash
   cd backend
   npm run data:import
   \`\`\`
