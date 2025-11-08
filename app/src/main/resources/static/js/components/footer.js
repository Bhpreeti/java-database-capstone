// footer.js
// This script dynamically injects a footer section on every page where <div id="footer"></div> exists.

// Function to render the footer content
function renderFooter() {
    // Step 1: Access footer container
    const footer = document.getElementById("footer");

    // Exit if no footer container is found (e.g., on login page)
    if (!footer) return;

    // Step 2: Inject HTML template into footer container
    footer.innerHTML = `
        <footer class="footer">
            <div class="footer-container">

                <!-- Branding Section -->
                <div class="footer-logo">
                    <img src="../assets/images/logo/logo.png" alt="Clinic Logo" class="footer-logo-img" />
                    <p>© 2025 Clinic Management System. All Rights Reserved.</p>
                </div>

                <!-- Company Links -->
                <div class="footer-column">
                    <h4>Company</h4>
                    <a href="#">About</a>
                    <a href="#">Careers</a>
                    <a href="#">Press</a>
                </div>

                <!-- Support Links -->
                <div class="footer-column">
                    <h4>Support</h4>
                    <a href="#">Account</a>
                    <a href="#">Help Center</a>
                    <a href="#">Contact</a>
                </div>

                <!-- Legal Links -->
                <div class="footer-column">
                    <h4>Legals</h4>
                    <a href="#">Terms</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Licensing</a>
                </div>
            </div>
        </footer>
    `;
}

// Step 3: Auto-call the render function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", renderFooter);
