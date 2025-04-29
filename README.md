# Calculator with Audit Logging

<img width="406" alt="calculator-image" src="https://github.com/user-attachments/assets/0722b5ef-7142-4570-a687-b63ddc1c7d51" />



A modern calculator application with full audit logging capabilities, built with React, Node.js, and MongoDB.

## Features

- **Basic Calculator Operations**:
  - Addition, subtraction, multiplication, division
  - Decimal support
  - Clear functionality

- **Audit Logging**:
  - Tracks all user actions in real-time
  - Stores timestamped events in MongoDB
  - Viewable audit trail

- **Responsive Design**:
  - Works on desktop and mobile devices
  - Clean, intuitive interface
    
 - **View Audit logs** 
- https://calculator-audit-log-app-production.up.railway.app/api/audit

## Technologies Used

### Frontend
- React 18
- Vite
- React Testing Library
- Axios

### Backend
- Node.js
- Express
- MongoDB
- Mongoose

## Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance
- Git

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/calculator-audit-logging.git
   cd calculator-audit-logging
   cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB credentials

cd ../frontend
npm install
cp .env
# Edit .env with your API base URL

cd backend
npm start

cd frontend
npm run dev
