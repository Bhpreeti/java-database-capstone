// ===============================
// index.js — Role-Based Login Handler
// ===============================

// Import required modules
import { openModal } from "../components/modals.js";
import { API_BASE_URL } from "../config/config.js";
import { selectRole } from "../render.js"; // ensures role is stored & proper UI shown

// Define API endpoints
const ADMIN_API = API_BASE_URL + "/admin";
const DOCTOR_API = API_BASE_URL + "/doctor/login";

// ===============================
// Initialize Event Listeners
// ===============================
window.onload = function () {
  const adminBtn = document.getElementById("adminLogin");
  const doctorBtn = document.getElementById("doctorLogin");

  // When Admin button is clicked → open Admin Login Modal
  if (adminBtn) {
    adminBtn.addEventListener("click", () => {
      openModal("adminLogin");
    });
  }

  // When Doctor button is clicked → open Doctor Login Modal
  if (doctorBtn) {
    doctorBtn.addEventListener("click", () => {
      openModal("doctorLogin");
    });
  }
};

// ===============================
// Admin Login Handler
// ===============================
export async function adminLoginHandler() {
  try {
    // Read input values from Admin Login Modal
    const username = document.getElementById("adminUsername").value.trim();
    const password = document.getElementById("adminPassword").value.trim();

    if (!username || !password) {
      alert("Please enter both username and password!");
      return;
    }

    // Create admin object
    const admin = { username, password };

    // Send POST request to Admin API
    const response = await fetch(`${ADMIN_API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(admin),
    });

    if (response.ok) {
      const data = await response.json();

      // Save token in localStorage
      localStorage.setItem("token", data.token);

      // Set role and redirect to Admin Dashboard
      selectRole("admin");
      alert("Admin login successful!");
      window.location.href = "/admin/dashboard.html";
    } else {
      alert("Invalid credentials! Please try again.");
    }
  } catch (error) {
    console.error("Admin login error:", error);
    alert("An error occurred during admin login.");
  }
}

// Make globally accessible (for inline HTML handlers)
window.adminLoginHandler = adminLoginHandler;

// ===============================
// Doctor Login Handler
// ===============================
export async function doctorLoginHandler() {
  try {
    // Read input values from Doctor Login Modal
    const email = document.getElementById("doctorEmail").value.trim();
    const password = document.getElementById("doctorPassword").value.trim();

    if (!email || !password) {
      alert("Please enter both email and password!");
      return;
    }

    // Create doctor object
    const doctor = { email, password };

    // Send POST request to Doctor API
    const response = await fetch(DOCTOR_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctor),
    });

    if (response.ok) {
      const data = await response.json();

      // Save token in localStorage
      localStorage.setItem("token", data.token);

      // Set role and redirect to Doctor Dashboard
      selectRole("doctor");
      alert("Doctor login successful!");
      window.location.href = "/doctor/dashboard.html";
    } else {
      alert("Invalid credentials! Please try again.");
    }
  } catch (error) {
    console.error("Doctor login error:", error);
    alert("An error occurred during doctor login.");
  }
}

// Make globally accessible (for inline HTML handlers)
window.doctorLoginHandler = doctorLoginHandler;
