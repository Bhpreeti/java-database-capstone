// doctorCard.js
// This component dynamically creates a reusable doctor card with role-based actions.

import { deleteDoctor } from "../services/doctorServices.js";
import { getPatientData } from "../services/patientServices.js";
import { showBookingOverlay } from "../components/modals.js";

// Named export — allows other files to import this function
export function createDoctorCard(doctor) {
  // Step 1: Create main card container
  const card = document.createElement("div");
  card.classList.add("doctor-card");

  // Step 2: Fetch user role from localStorage
  const role = localStorage.getItem("userRole");

  // Step 3: Create Doctor Info Section
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("doctor-info");

  // Doctor name
  const name = document.createElement("h3");
  name.textContent = doctor.name || "Unknown Doctor";

  // Doctor specialization
  const specialization = document.createElement("p");
  specialization.textContent = `Specialty: ${doctor.specialization || "N/A"}`;

  // Doctor email
  const email = document.createElement("p");
  email.textContent = `Email: ${doctor.email || "Not Provided"}`;

  // Doctor availability (e.g., ["Morning", "Evening"])
  const availability = document.createElement("p");
  if (doctor.availability && Array.isArray(doctor.availability)) {
    availability.textContent = `Available: ${doctor.availability.join(", ")}`;
  } else {
    availability.textContent = `Available: ${doctor.availability || "Not specified"}`;
  }

  // Append all doctor info elements to infoDiv
  infoDiv.appendChild(name);
  infoDiv.appendChild(specialization);
  infoDiv.appendChild(email);
  infoDiv.appendChild(availability);

  // Step 4: Create Actions Section
  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("card-actions");

  // Step 5: Conditionally Add Buttons Based on Role
  // ADMIN — Can delete doctor
  if (role === "admin") {
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Delete";
    removeBtn.classList.add("btn", "btn-danger");

    removeBtn.addEventListener("click", async () => {
      const confirmDelete = confirm(`Are you sure you want to delete Dr. ${doctor.name}?`);
      if (!confirmDelete) return;

      const token = localStorage.getItem("token");
      try {
        const response = await deleteDoctor(doctor.id, token);
        if (response.success) {
          alert("Doctor deleted successfully!");
          card.remove(); // Remove the doctor card from the UI
        } else {
          alert("Failed to delete doctor.");
        }
      } catch (error) {
        console.error("Error deleting doctor:", error);
        alert("Error deleting doctor. Please try again later.");
      }
    });

    actionsDiv.appendChild(removeBtn);
  }

  // PATIENT (not logged in) — Can only see the Book Now button with alert
  else if (role === "patient") {
    const bookNow = document.createElement("button");
    bookNow.textContent = "Book Now";
    bookNow.classList.add("btn", "btn-primary");

    bookNow.addEventListener("click", () => {
      alert("Please log in to book an appointment.");
    });

    actionsDiv.appendChild(bookNow);
  }

  // LOGGED-IN PATIENT — Can book appointments
  else if (role === "loggedPatient") {
    const bookNow = document.createElement("button");
    bookNow.textContent = "Book Now";
    bookNow.classList.add("btn", "btn-primary");

    bookNow.addEventListener("click", async (e) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Session expired. Please log in again.");
          window.location.href = "/";
          return;
        }

        const patientData = await getPatientData(token);
        showBookingOverlay(e, doctor, patientData);
      } catch (error) {
        console.error("Error during booking:", error);
        alert("Unable to load booking modal. Try again later.");
      }
    });

    actionsDiv.appendChild(bookNow);
  }

  // Step 6: Assemble final card
  card.appendChild(infoDiv);
  card.appendChild(actionsDiv);

  // Step 7: Return the completed card
  return card;
}
