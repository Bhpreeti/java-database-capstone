// ============================================
// 📦 IMPORTS
// ============================================
import { getDoctors, filterDoctors } from './services/doctorServices.js';
import { openModal } from './components/modals.js';
import { createDoctorCard } from './components/doctorCard.js';
import { patientSignup, patientLogin } from './services/patientServices.js';

// ============================================
// 🚀 PAGE INITIALIZATION
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  loadDoctorCards();

  // Bind Signup Modal
  const signupBtn = document.getElementById("patientSignup");
  if (signupBtn) {
    signupBtn.addEventListener("click", () => openModal("patientSignup"));
  }

  // Bind Login Modal
  const loginBtn = document.getElementById("patientLogin");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => openModal("patientLogin"));
  }

  // Bind Search & Filter Listeners
  const searchBar = document.getElementById("searchBar");
  const filterTime = document.getElementById("filterTime");
  const filterSpecialty = document.getElementById("filterSpecialty");

  if (searchBar) searchBar.addEventListener("input", filterDoctorsOnChange);
  if (filterTime) filterTime.addEventListener("change", filterDoctorsOnChange);
  if (filterSpecialty) filterSpecialty.addEventListener("change", filterDoctorsOnChange);
});

// ============================================
// 🩺 LOAD ALL DOCTORS ON PAGE LOAD
// ============================================
async function loadDoctorCards() {
  const contentDiv = document.getElementById("content");
  if (!contentDiv) return;

  try {
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
  } catch (error) {
    console.error("Failed to load doctors:", error);
    contentDiv.innerHTML = `
      <p class="text-center text-red-500 mt-4">
        Failed to load doctors. Please try again later.
      </p>`;
  }
}

// ============================================
// 🔍 FILTER DOCTORS
// ============================================
async function filterDoctorsOnChange() {
  const contentDiv = document.getElementById("content");
  if (!contentDiv) return;

  const name = document.getElementById("searchBar")?.value.trim() || null;
  const time = document.getElementById("filterTime")?.value || null;
  const specialty = document.getElementById("filterSpecialty")?.value || null;

  try {
    const response = await filterDoctors(name, time, specialty);
    const doctors = response.doctors || response || [];

    if (doctors.length > 0) {
      renderDoctorCards(doctors);
    } else {
      contentDiv.innerHTML = `<p class="text-center text-gray-500">No doctors found with the given filters.</p>`;
    }
  } catch (error) {
    console.error("Error filtering doctors:", error);
    alert("❌ An error occurred while filtering doctors.");
  }
}

// ============================================
// 🧩 RENDER DOCTOR CARDS
// ============================================
function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  if (!contentDiv) return;

  contentDiv.innerHTML = "";
  doctors.forEach((doctor) => {
    const card = createDoctorCard(doctor);
    contentDiv.appendChild(card);
  });
}

// ============================================
// 🧍‍♀️ PATIENT SIGNUP HANDLER
// ============================================
window.signupPatient = async function () {
  try {
    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const address = document.getElementById("address")?.value.trim();

    if (!name || !email || !password || !phone || !address) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    const { success, message } = await patientSignup({ name, email, password, phone, address });

    if (success) {
      alert(message || "Signup successful!");
      document.getElementById("modal").style.display = "none";
      window.location.reload();
    } else {
      alert(message || "Signup failed. Please try again.");
    }
  } catch (error) {
    console.error("Signup failed:", error);
    alert("❌ An error occurred while signing up.");
  }
};

// ============================================
// 🔐 PATIENT LOGIN HANDLER
// ============================================
window.loginPatient = async function () {
  try {
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    if (!email || !password) {
      alert("⚠️ Please enter both email and password.");
      return;
    }

    const response = await patientLogin({ email, password });

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem("token", result.token);
      alert("✅ Login successful!");
      window.location.href = "/pages/loggedPatientDashboard.html";
    } else {
      alert("❌ Invalid credentials! Please try again.");
    }
  } catch (error) {
    console.error("Login failed:", error);
    alert("❌ Failed to login. Please try again later.");
  }
};
// ============================================
// 📦 IMPORTS
// ============================================
import { getDoctors, filterDoctors } from './services/doctorServices.js';
import { openModal } from './components/modals.js';
import { createDoctorCard } from './components/doctorCard.js';
import { patientSignup, patientLogin } from './services/patientServices.js';

// ============================================
// 🚀 PAGE INITIALIZATION
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  loadDoctorCards();

  // Bind Signup Modal
  const signupBtn = document.getElementById("patientSignup");
  if (signupBtn) {
    signupBtn.addEventListener("click", () => openModal("patientSignup"));
  }

  // Bind Login Modal
  const loginBtn = document.getElementById("patientLogin");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => openModal("patientLogin"));
  }

  // Bind Search & Filter Listeners
  const searchBar = document.getElementById("searchBar");
  const filterTime = document.getElementById("filterTime");
  const filterSpecialty = document.getElementById("filterSpecialty");

  if (searchBar) searchBar.addEventListener("input", filterDoctorsOnChange);
  if (filterTime) filterTime.addEventListener("change", filterDoctorsOnChange);
  if (filterSpecialty) filterSpecialty.addEventListener("change", filterDoctorsOnChange);
});

// ============================================
// 🩺 LOAD ALL DOCTORS ON PAGE LOAD
// ============================================
async function loadDoctorCards() {
  const contentDiv = document.getElementById("content");
  if (!contentDiv) return;

  try {
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
  } catch (error) {
    console.error("Failed to load doctors:", error);
    contentDiv.innerHTML = `
      <p class="text-center text-red-500 mt-4">
        Failed to load doctors. Please try again later.
      </p>`;
  }
}

// ============================================
// 🔍 FILTER DOCTORS
// ============================================
async function filterDoctorsOnChange() {
  const contentDiv = document.getElementById("content");
  if (!contentDiv) return;

  const name = document.getElementById("searchBar")?.value.trim() || null;
  const time = document.getElementById("filterTime")?.value || null;
  const specialty = document.getElementById("filterSpecialty")?.value || null;

  try {
    const response = await filterDoctors(name, time, specialty);
    const doctors = response.doctors || response || [];

    if (doctors.length > 0) {
      renderDoctorCards(doctors);
    } else {
      contentDiv.innerHTML = `<p class="text-center text-gray-500">No doctors found with the given filters.</p>`;
    }
  } catch (error) {
    console.error("Error filtering doctors:", error);
    alert("❌ An error occurred while filtering doctors.");
  }
}

// ============================================
// 🧩 RENDER DOCTOR CARDS
// ============================================
function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  if (!contentDiv) return;

  contentDiv.innerHTML = "";
  doctors.forEach((doctor) => {
    const card = createDoctorCard(doctor);
    contentDiv.appendChild(card);
  });
}

// ============================================
// 🧍‍♀️ PATIENT SIGNUP HANDLER
// ============================================
window.signupPatient = async function () {
  try {
    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const address = document.getElementById("address")?.value.trim();

    if (!name || !email || !password || !phone || !address) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    const { success, message } = await patientSignup({ name, email, password, phone, address });

    if (success) {
      alert(message || "Signup successful!");
      document.getElementById("modal").style.display = "none";
      window.location.reload();
    } else {
      alert(message || "Signup failed. Please try again.");
    }
  } catch (error) {
    console.error("Signup failed:", error);
    alert("❌ An error occurred while signing up.");
  }
};

// ============================================
// 🔐 PATIENT LOGIN HANDLER
// ============================================
window.loginPatient = async function () {
  try {
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    if (!email || !password) {
      alert("⚠️ Please enter both email and password.");
      return;
    }

    const response = await patientLogin({ email, password });

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem("token", result.token);
      alert("✅ Login successful!");
      window.location.href = "/pages/loggedPatientDashboard.html";
    } else {
      alert("❌ Invalid credentials! Please try again.");
    }
  } catch (error) {
    console.error("Login failed:", error);
    alert("❌ Failed to login. Please try again later.");
  }
};
