// ===============================
// 📦 IMPORTS
// ===============================
import { openModal, closeModal } from "./components/modals.js";
import { getDoctors, filterDoctors, saveDoctor } from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";

// ===============================
// 🩺 LOAD DOCTORS ON PAGE LOAD
// ===============================
window.addEventListener("DOMContentLoaded", () => {
  loadDoctorCards();

  // Bind event listeners for search and filters
  document.getElementById("searchBar").addEventListener("input", filterDoctorsOnChange);
  document.getElementById("filterTime").addEventListener("change", filterDoctorsOnChange);
  document.getElementById("filterSpecialty").addEventListener("change", filterDoctorsOnChange);

  // Bind event listener for Add Doctor button
  const addDoctorBtn = document.getElementById("addDocBtn");
  if (addDoctorBtn) {
    addDoctorBtn.addEventListener("click", () => openModal("addDoctor"));
  }

  // Bind submit event for Add Doctor form
  const addDoctorForm = document.getElementById("addDoctorForm");
  if (addDoctorForm) {
    addDoctorForm.addEventListener("submit", adminAddDoctor);
  }
});

// ===============================
// 📋 LOAD AND RENDER DOCTORS
// ===============================
async function loadDoctorCards() {
  const contentDiv = document.getElementById("content");
  if (!contentDiv) return;

  contentDiv.innerHTML = "<p>Loading doctors...</p>";

  const doctors = await getDoctors();

  renderDoctorCards(doctors);
}

// ===============================
// 🎨 RENDER DOCTOR CARDS
// ===============================
function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  if (!contentDiv) return;

  contentDiv.innerHTML = ""; // Clear previous content

  if (!doctors || doctors.length === 0) {
    contentDiv.innerHTML = `<p class="text-center text-gray-500 mt-4">No doctors found</p>`;
    return;
  }

  doctors.forEach((doctor) => {
    const card = createDoctorCard(doctor);
    contentDiv.appendChild(card);
  });
}

// ===============================
// 🔍 SEARCH & FILTER LOGIC
// ===============================
async function filterDoctorsOnChange() {
  const searchName = document.getElementById("searchBar").value.trim();
  const filterTime = document.getElementById("filterTime").value.trim();
  const filterSpecialty = document.getElementById("filterSpecialty").value.trim();

  try {
    const filteredDoctors = await filterDoctors(searchName, filterTime, filterSpecialty);
    renderDoctorCards(filteredDoctors);
  } catch (error) {
    console.error("Error filtering doctors:", error);
    alert("An error occurred while filtering doctors. Please try again.");
  }
}

// ===============================
// ➕ ADD NEW DOCTOR (ADMIN ACTION)
// ===============================
async function adminAddDoctor(event) {
  event.preventDefault();

  // Collect form data
  const name = document.getElementById("doctorName").value.trim();
  const specialty = document.getElementById("doctorSpecialty").value.trim();
  const email = document.getElementById("doctorEmail").value.trim();
  const password = document.getElementById("doctorPassword").value.trim();
  const mobile = document.getElementById("doctorMobile").value.trim();
  const availability = document.getElementById("doctorAvailability").value.trim();

  // Retrieve token from localStorage (for authentication)
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You are not authorized. Please log in as admin.");
    return;
  }

  // Construct doctor object
  const doctor = {
    name,
    specialty,
    email,
    password,
    mobile,
    availability,
  };

  try {
    const response = await saveDoctor(doctor, token);

    if (response.success) {
      alert(response.message || "Doctor added successfully!");
      closeModal("addDoctor");
      await loadDoctorCards(); // Refresh the doctor list
    } else {
      alert(response.message || "Failed to add doctor. Please try again.");
    }
  } catch (error) {
    console.error("Error adding doctor:", error);
    alert("An unexpected error occurred while adding doctor.");
  }
}
