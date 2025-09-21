# 🚗 MechFix Platform - User & Mechanic Dashboards

**MechFix** is a web-based platform that connects **users** with **mechanics** for vehicle repair and emergency services.  
The project has **two dashboards**:
- 👤 **User Dashboard** → Book services, manage vehicles, payments, and profile.  
- 🛠️ **Mechanic Dashboard** → Manage incoming service requests, update job statuses, and track payments.  

Built using **HTML, CSS, JavaScript**, and **Firebase (Authentication + Firestore)**.

---

## 📂 Project Structure

/project-root
│── login-page/
│ ├── login.html # User login
│ ├── signup.html # User signup
│ ├── mech-login.html # Mechanic login
│ ├── mech-signup.html # Mechanic signup
│── dashboards/
│ ├── user-dashboard.html
│ ├── mechanic-dashboard.html
│ ├── booking.html
│ ├── profile.html
│ └── logout.html
│── index.html # Landing page
│── README.md


---

## ⚙️ Features

### 👤 User Dashboard
- **Welcome Banner** → Shows user’s name & profile picture.  
- **Book a Service** → Choose service type, add vehicle, describe issue.  
- **My Bookings** → Track upcoming & past bookings.  
- **Saved Vehicles** → Store car/bike details.  
- **Payment History** → View transactions.  
- **Profile Settings** → Update name, phone, etc.  
- **Logout** → Secure sign-out.  

### 🛠️ Mechanic Dashboard
- **Welcome Banner** → Mechanic name + profile picture.  
- **Service Requests** → List of assigned bookings, accept/decline option.  
- **Completed Jobs** → Track completed services.  
- **Payment History** → Show payments received.  
- **Profile Section** → Manage specialization, experience, contact.  
- **Charts & Analytics** → Visualize job trends with Chart.js.  
- **Logout** → Secure sign-out.  

---

## 🔧 Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Auth:** Firebase Authentication  
- **Database:** Firebase Firestore  
- **Charts:** Chart.js  

---

## 🗂️ Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/).  
2. Create a new project (`MechFix`).  
3. Enable **Authentication** → Email/Password.  
4. Create **Firestore Database** (Start in Test Mode).  
5. Add **Web App** and copy your Firebase config keys.  
6. Replace the config inside all `<script type="module">` blocks:

```js
const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "YOUR-PROJECT.firebaseapp.com",
  projectId: "YOUR-PROJECT-ID",
  storageBucket: "YOUR-PROJECT.appspot.com",
  messagingSenderId: "YOUR-SENDER-ID",
  appId: "YOUR-APP-ID"
};


users/
   {userId}/
      name: "John Doe"
      email: "john@example.com"
      phone: "1234567890"
      profilePic: "url"

mechanics/
   {mechId}/
      name: "Mike Smith"
      email: "mike@workshop.com"
      specialization: "Car Repair"
      experience: "5 years"
      profilePic: "url"

bookings/
   {bookingId}/
      userId: "..."
      mechId: "..."
      serviceType: "Car Repair"
      vehicle: "Honda City 2019"
      issue: "Engine noise"
      status: "Pending"
      date: "2025-09-13"

payments/
   {paymentId}/
      userId: "..."
      mechId: "..."
      amount: 1200
      status: "Completed"
      date: "2025-09-13"

📄 License

This project is open-source under the Un-License.
Free to use, modify, and distribute.
