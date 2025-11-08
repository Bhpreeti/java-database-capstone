// Import API Base URL from configuration
import { API_BASE_URL } from "../config/config.js";

// Define the base endpoint for all patient-related operations
const PATIENT_API = `${API_BASE_URL}/patient`;

/**
 * 🧾 Patient Signup
 * Registers a new patient with the provided data.
 * @param {object} data - Patient signup details (name, email, password, etc.)
 * @returns {object} - { success, message }
 */
export async function patientSignup(data) {
  try {
    const response = await fetch(`${PATIENT_API}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, message: result.message || "Signup failed. Please try again." };
    }

    return { success: true, message: result.message || "Signup successful!" };
  } catch (error) {
    console.error("Error during patient signup:", error);
    return { success: false, message: "An error occurred during signup." };
  }
}

/**
 * 🔐 Patient Login
 * Logs in a patient using email and password credentials.
 * @param {object} data - Login credentials { email, password }
 * @returns {object} - The raw response data (including token if successful)
 */
export async function patientLogin(data) {
  try {
    const response = await fetch(`${PATIENT_API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, message: result.message || "Login failed. Please check your credentials." };
    }

    // Include token and patient info if returned by API
    return { success: true, message: result.message || "Login successful!", data: result };
  } catch (error) {
    console.error("Error during patient login:", error);
    return { success: false, message: "An error occurred during login." };
  }
}

/**
 * 👤 Get Logged-in Patient Data
 * Fetches patient details using a valid token.
 * @param {string} token - JWT authentication token
 * @returns {object|null} - Patient data or null if request fails
 */
export async function getPatientData(token) {
  try {
    const response = await fetch(`${PATIENT_API}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch patient data. Status:", response.status);
      return null;
    }

    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return null;
  }
}

/**
 * 📅 Get Patient Appointments
 * Fetches appointments for a given patient or doctor (based on role).
 * @param {number|string} id - Patient or Doctor ID
 * @param {string} token - Authentication token
 * @param {string} user - Role ("patient" or "doctor")
 * @returns {array|null} - List of appointments or null if failed
 */
export async function getPatientAppointments(id, token, user) {
  try {
    // Construct dynamic endpoint based on user type
    const url = `${PATIENT_API}/appointments/${user}/${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch appointments. Status:", response.status);
      return null;
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    return null;
  }
}

/**
 * 🔍 Filter Appointments
 * Filters appointments based on condition (pending/consulted) and patient/doctor name.
 * @param {string} condition - Appointment condition ("pending", "consulted", etc.)
 * @param {string} name - Name filter
 * @param {string} token - Authentication token
 * @returns {array} - Filtered list of appointments or an empty list
 */
export async function filterAppointments(condition = "", name = "", token) {
  try {
    const queryParams = new URLSearchParams({
      condition: condition || "",
      name: name || "",
    });

    const response = await fetch(`${PATIENT_API}/appointments/filter?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to filter appointments. Status:", response.status);
      return [];
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error filtering appointments:", error);
    return [];
  }
}
