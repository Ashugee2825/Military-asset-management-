# Military Asset Management System

A comprehensive web application for managing military assets including weapons, vehicles, ammunition, and other equipment across multiple bases. Built with React frontend and Node.js backend with MySQL database.

## 🚀 Features

- **Dashboard Overview**: Real-time view of opening balances, purchases, transfers, assignments, and expenditures
- **Asset Purchases**: Record new asset acquisitions for specific bases
- **Asset Transfers**: Transfer assets between different bases with full tracking
- **Asset Assignments**: Assign equipment to personnel with accountability
- **Asset Expenditures**: Track consumed/expended assets
- **Role-Based Access Control**: Different permissions for Admin, Commander, and Logistics roles
- **Secure Authentication**: JWT-based authentication system
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React.js** - User interface framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Styling with inline styles for simplicity

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MySQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
military-asset-management/
├── backend/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   ├── purchases.js
│   │   ├── transfers.js
│   │   ├── assignments.js
│   │   └── expenditures.js
│   ├── middleware/
│   │   └── auth.js
│   ├── index.js
│   ├── db.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Purchases.js
│   │   │   ├── Transfers.js
│   │   │   ├── Assignments.js
│   │   │   └── Expenditures.js
│   │   ├── App.js
│   │   ├── api.js
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── vercel.json
├── database/
│   └── create_tables.sql
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ashugee2825/Military-asset-management-.git
   cd Military-asset-management-
   ```

2. **Set up the database**
   ```sql
   -- Run the SQL commands in database/create_tables.sql
   CREATE DATABASE IF NOT EXISTS military_asset_db;
   USE military_asset_db;
   -- ... (rest of the SQL commands)
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Configure environment variables**
   
   Create `.env` file in backend directory:
   ```env
   PORT=5000
   JWT_SECRET=your_secret_key_here
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=military_asset_db
   ```

6. **Start the servers**
   
   Backend:
   ```bash
   cd backend
   npm start
   ```
   
   Frontend:
   ```bash
   cd frontend
   npm start
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🔐 Authentication & Roles

### User Roles
- **Admin**: Full access to all features and data
- **Commander**: Access to assignments and expenditures for their base
- **Logistics**: Access to purchases and transfers

### Default Login
- Username: `john`
- Password: `secret123`
- Role: `admin`

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Dashboard
- `GET /api/dashboard` - Get dashboard data

### Asset Management
- `POST /api/purchases` - Record new purchase
- `GET /api/purchases` - Get all purchases (admin only)
- `POST /api/transfers` - Record asset transfer
- `POST /api/assignments` - Record asset assignment
- `POST /api/expenditures` - Record asset expenditure

## 🌐 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variable: `REACT_APP_API_URL` = your backend URL
3. Deploy

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set environment variables for database connection
3. Deploy

## 📝 Database Schema

The system uses the following main tables:
- `bases` - Military bases
- `users` - System users with roles
- `assets` - Current asset inventory
- `purchases` - Asset purchase records
- `transfers` - Asset transfer records
- `assignments` - Asset assignment records
- `expenditures` - Asset expenditure records

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Ashutosh** - [GitHub](https://github.com/Ashugee2825)

## 🙏 Acknowledgments

- React.js community
- Node.js community
- MySQL documentation
- All contributors and testers 