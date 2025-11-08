// Import Base API URL from config file
import { API_BASE_URL } from "../config/config.js";

// Define Doctor API Base Endpoint
const DOCTOR_API = `${API_BASE_URL}/doctor`;

/**
 * ✅ Get All Doctors
 * Fetches the list of all doctors from the backend.
 */
export async function getDoctors() {
  try {
    const response = await fetch(DOCTOR_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch doctors. Status:", response.status);
      return [];
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
}

/**
 * 🗑️ Delete Doctor by ID
 * Deletes a doctor record (Admin only).
 * @param {number|string} id - Doctor ID
 * @param {string} token - Auth token
 */
export async function deleteDoctor(id, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || "Failed to delete doctor" };
    }

    return { success: true, message: data.message || "Doctor deleted successfully" };
  } catch (error) {
    console.error("Error deleting doctor:", error);
    return { success: false, message: "An error occurred while deleting the doctor" };
  }
}

/**
 * ➕ Save (Add) a New Doctor
 * Adds a new doctor to the system (Admin only).
 * @param {object} doctor - Doctor details
 * @param {string} token - Auth token
 */
export async function saveDoctor(doctor, token) {
  try {
    const response = await fetch(DOCTOR_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(doctor),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || "Failed to save doctor" };
    }

    return { success: true, message: data.message || "Doctor added successfully" };
  } catch (error) {
    console.error("Error saving doctor:", error);
    return { success: false, message: "An error occurred while saving the doctor" };
  }
}

/**
 * 🔍 Filter Doctors
 * Fetch doctors based on filters like name, time, and specialty.
 * @param {string} name - Doctor name (optional)
 * @param {string} time - Available time (optional)
 * @param {string} specialty - Doctor specialty (optional)
 */
export async function filterDoctors(name = "", time = "", specialty = "") {
  try {
    const queryParams = new URLSearchParams({
      name: name || "",
      time: time || "",
      specialty: specialty || "",
    });

    const response = await fetch(`${DOCTOR_API}/filter?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to filter doctors. Status:", response.status);
      return [];
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error filtering doctors:", error);
    return [];
  }
}
