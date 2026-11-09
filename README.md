# 🎬 FrameSpace — Creative Studio Booking Platform

**FrameSpace** is a peer-to-peer creative workspace and production studio sharing platform designed to connect creative professionals with studio owners. It allows photographers, filmmakers, podcasters, musicians, and other creators to discover and book suitable creative spaces.

Studio owners can list their available spaces, manage studio information, and handle bookings, while creators can explore studios and manage their reservations through a user-friendly platform.

---

## 🌐 Live Demo

- **Live Website:** [Add Your Live Website URL]
- **Frontend Repository:** [Add Frontend GitHub URL]
- **Backend Repository:** [Add Backend GitHub URL]

---

## ✨ Key Features

### 🔐 Authentication & User Management

- Secure account registration and login system.
- Authentication powered by Better Auth.
- User-specific data access and management.
- Protected routes for authenticated users.

### 🏢 Studio Management

- Add new creative studios with detailed information.
- View all available studios.
- Manage personal studio listings.
- Update existing studio information.
- Delete studio listings.
- Display studio details, pricing, location, and amenities.

### 📅 Booking Management

- Book available creative studios.
- View personal booking history.
- Check all booked studios from the My Bookings section.
- Manage booking-related information.
- View studio details before making a reservation.

### 📱 Responsive Design

- Fully responsive user interface.
- Optimized for desktop, tablet, and mobile devices.
- Clean and modern design.
- User-friendly navigation and interactive components.

---

## 🛠️ Technology Stack

| Category       | Technologies           |
| -------------- | ---------------------- |
| Frontend       | Next.js, React         |
| Styling        | Tailwind CSS, DaisyUI  |
| Authentication | Better Auth            |
| Backend        | Node.js, Express.js    |
| Database       | MongoDB                |
| Language       | TypeScript, JavaScript |
| UI Icons       | Lucide React           |
| Notifications  | React Toastify         |

---

## 📂 Core Modules

| Module           | Description                                      |
| ---------------- | ------------------------------------------------ |
| Authentication   | User registration, login, and session management |
| Explore Studios  | Browse and discover available creative spaces    |
| Studio Details   | View studio information, pricing, and amenities  |
| Add Studio       | Create and publish new studio listings           |
| My Listings      | Manage personally added studio listings          |
| My Bookings      | View and manage personal studio bookings         |
| Protected Routes | Restrict private pages to authenticated users    |

---

## ⚙️ Challenges & Technical Implementation

During development, I focused on solving several important technical challenges:

**1. User-Specific Data Management**

- Implementing user-wise data fetching.
- Ensuring users can access only their relevant listings and bookings.
- Managing authenticated user sessions.
- Handling protected routes and authorization.

**2. CRUD Operations**

- Implementing Create, Read, Update, and Delete operations.
- Managing studio listing data efficiently.
- Handling API requests and responses.
- Maintaining consistency between the frontend and MongoDB database.

**3. Authentication & Route Protection**

- Integrating Better Auth with the application.
- Managing authentication states.
- Protecting private pages and user-specific resources.

**4. Responsive UI Development**

- Creating reusable UI components.
- Maintaining consistent layouts across different screen sizes.
- Ensuring a smooth user experience on mobile and desktop devices.

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

- Node.js (LTS recommended)
- npm
- MongoDB database or MongoDB Atlas
- Git

### 1. Clone the Repositories

Clone the frontend and backend repositories separately.

```bash
# Clone frontend
git clone YOUR_FRONTEND_REPOSITORY_URL

# Clone backend
git clone YOUR_BACKEND_REPOSITORY_URL
```

### 2. Install Dependencies

Run the following command inside both frontend and backend project directories:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the frontend project root.

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret
MONGODB_URI=your_mongodb_connection_string
```

Configure the backend environment variables according to your backend configuration.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

**Note:** Replace the placeholder values with your actual credentials. Never commit your `.env` file or expose sensitive information.

### 4. Run the Backend Server

```bash
npm run dev
```

The backend server should start at:

```text
http://localhost:5000
```

### 5. Run the Frontend Application

Open another terminal and navigate to the frontend directory.

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

---

## 🎯 Project Goals

The primary goal of FrameSpace is to simplify the process of finding and booking creative workspaces.

By connecting studio owners and creative professionals through one platform, FrameSpace aims to make creative space discovery, studio management, and booking more accessible and convenient.

---

## 👨‍💻 Developer

**Md. Sumon**

Frontend Developer | Shopify & Web Development

- GitHub: [Your GitHub Profile](https://github.com/)
- LinkedIn: [Md. Sumon](https://www.linkedin.com/in/md-sumondev/)

---

## 📄 License

This project was developed for educational and portfolio purposes.
