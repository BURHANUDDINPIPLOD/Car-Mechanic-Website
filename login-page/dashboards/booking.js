// ✅ Use latest Firebase SDK (10.13.2 instead of 10.7.1)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// 🔹 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCEVdqRtNc1LDZAK76PXnG8QWZJLfQz_fY",
  authDomain: "autoconnect-fs4ij.firebaseapp.com",
  projectId: "autoconnect-fs4ij",
  storageBucket: "autoconnect-fs4ij.firebasestorage.app",
  messagingSenderId: "48085992311",
  appId: "1:48085992311:web:d8ba8d76cee96d67ac5772"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Elements
const upcomingCountEl = document.getElementById("upcomingCount");
const completedCountEl = document.getElementById("completedCount");
const tableBody = document.getElementById("bookingTableBody");

// Chart context
const ctx = document.getElementById("bookingChart").getContext("2d");
let chartInstance;

// 🔄 Auth state watcher
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert("Please log in first!");
    window.location.href = "../login-page/login.html";
    return;
  }

  console.log("✅ Logged in as:", user.uid);

  try {
    // 🔄 Fetch bookings for logged-in user
    const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);

    let bookings = [];
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() }); // ✅ Keep doc.id for reference
    });

    renderBookings(bookings);
  } catch (err) {
    console.error("🔥 Error fetching bookings:", err);
  }
});

// 🔄 Render function
function renderBookings(bookings) {
  if (!bookings.length) {
    tableBody.innerHTML = `<tr><td colspan="4">No bookings yet.</td></tr>`;
    upcomingCountEl.textContent = 0;
    completedCountEl.textContent = 0;
    return;
  }

  // ✅ Flexible status handling (case insensitive)
  const upcomingCount = bookings.filter(b => (b.status || "").toLowerCase() === "upcoming").length;
  const completedCount = bookings.filter(b => (b.status || "").toLowerCase() === "completed").length;

  upcomingCountEl.textContent = upcomingCount;
  completedCountEl.textContent = completedCount;

  // Fill table
  tableBody.innerHTML = "";
  bookings.forEach(b => {
    const row = `<tr>
      <td>${b.service || "N/A"}</td>
      <td>${b.vehicle || "N/A"}</td>
      <td>${b.status || "Pending"}</td>
      <td>${b.date || "Not set"}</td>
    </tr>`;
    tableBody.innerHTML += row;
  });

  // Chart
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Upcoming", "Completed"],
      datasets: [{
        data: [upcomingCount, completedCount],
        backgroundColor: ["#fbbf24", "#10b981"]
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom" } }
    }
  });
}

// Logout
function logout() {
  signOut(auth).then(() => {
    window.location.href = "../login-page/login.html"; // 🔄 Redirect to login (instead of logout.html)
  }).catch((error) => {
    console.error("Logout error", error);
  });
}
window.logout = logout;
