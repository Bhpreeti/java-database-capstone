// ===============================
// 📦 IMPORTS
// ===============================
import { getAllAppointments } from "./services/appointmentRecordService.js";
import { createPatientRow } from "./components/patientRows.js";

// ===============================
// 🌍 GLOBAL VARIABLES
// ===============================
const patientTableBody = document.getElementById("patientTableBody");
let selectedDate = new Date().toISOString().split("T")[0]; // Default: today's date
let token = localStorage.getItem("token");
let patientName = null;

// ===============================
// 🔍 SEARCH BAR FUNCTIONALITY
// ===============================
const searchBar = document.getElementById("searchBar");
if (searchBar) {
  searchBar.addEventListener("input", async (e) => {
    patientName = e.target.value.trim() || null;
    await loadAppointments();
  });
}

// ===============================
// 📅 FILTER CONTROLS
// ===============================

// “Today’s Appointments” button
const todayButton = document.getElementById("todayButton");
if (todayButton) {
  todayButton.addEventListener("click", async () => {
    selectedDate = new Date().toISOString().split("T")[0];
    const datePicker = document.getElementById("datePicker");
    if (datePicker) datePicker.value = selectedDate;
    await loadAppointments();
  });
}

// Date picker change listener
const datePicker = document.getElementById("datePicker");
if (datePicker) {
  datePicker.addEventListener("change", async (e) => {
    selectedDate = e.target.value;
    await loadAppointments();
  });
}

// ===============================
// 📋 LOAD APPOINTMENTS FUNCTION
// ===============================
async function loadAppointments() {
  try {
    if (!token) {
      patientTableBody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center text-red-500 py-3">
            Unauthorized access. Please log in again.
          </td>
        </tr>`;
      return;
    }

    // Fetch data from backend
    const appointments = await getAllAppointments(selectedDate, patientName, token);

    // Clear existing rows
    patientTableBody.innerHTML = "";

    // If no appointments found
    if (!appointments || appointments.length === 0) {
      patientTableBody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center text-gray-500 py-3">
            No appointments found for the selected date.
          </td>
        </tr>`;
      return;
    }

    // Render each appointment as a table row
    appointments.forEach((appointment) => {
      const row = createPatientRow(appointment);
      patientTableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading appointments:", error);
    patientTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-red-500 py-3">
          Failed to load appointments. Please try again later.
        </td>
      </tr>`;
  }
}

// ===============================
// 🚀 INITIAL PAGE LOAD
// ===============================
window.addEventListener("DOMContentLoaded", async () => {
  // Initialize date picker with today's date
  const datePicker = document.getElementById("datePicker");
  if (datePicker) datePicker.value = selectedDate;

  // Load today's appointments by default
  await loadAppointments();
});
