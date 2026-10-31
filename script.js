/* =========================================
   MODERA — INTERACTIVE FEATURES
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // 1. Initialise Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }


    // 2. Mobile Navigation Menu

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navigationLinks = document.querySelectorAll(".nav-link");

    function closeMenu() {
        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        menuToggle.innerHTML = '<i data-lucide="menu"></i>';

        if (window.lucide) {
            lucide.createIcons();
        }
    }

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.innerHTML = isOpen
            ? '<i data-lucide="x"></i>'
            : '<i data-lucide="menu"></i>';

        if (window.lucide) {
            lucide.createIcons();
        }

    });


    // Close menu when a navigation link is clicked

    navigationLinks.forEach((link) => {

        link.addEventListener("click", () => {

            closeMenu();

            navigationLinks.forEach((item) => {
                item.classList.remove("active");
            });

            link.classList.add("active");

        });

    });


    // Close menu when clicking outside the navigation

    document.addEventListener("click", (event) => {

        const clickedInsideNavbar = event.target.closest(".navbar");

        if (!clickedInsideNavbar && navLinks.classList.contains("open")) {
            closeMenu();
        }

    });


    // Close mobile navigation when resizing to desktop

    window.addEventListener("resize", () => {

        if (window.innerWidth > 760) {
            closeMenu();
        }

    });


    // 3. Automatically Update Footer Year

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // 4. Newsletter Form Validation

    const newsletterForm = document.getElementById("newsletterForm");
    const emailInput = document.getElementById("email");
    const formMessage = document.getElementById("formMessage");

    newsletterForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const email = emailInput.value.trim();

        // Check that an email address has been entered

        if (!email || !emailInput.checkValidity()) {

            formMessage.textContent =
                "Please enter a valid email address.";

            emailInput.focus();

            return;

        }

        // Demo success message
        // A backend or email service is needed to save subscriptions.

        formMessage.textContent =
            "Thank you for stopping by MODERA! ♡";

        newsletterForm.reset();

    });


    // 5. Update Active Navigation Link While Scrolling

    const sections = document.querySelectorAll(
        "main section[id], header[id], footer[id]"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        const sectionId = entry.target.id;

                        navigationLinks.forEach((link) => {

                            const isActive =
                                link.getAttribute("href") === `#${sectionId}`;

                            link.classList.toggle("active", isActive);

                        });

                    }

                });

            },
            {
                rootMargin: "-25% 0px -65% 0px"
            }
        );

        sections.forEach((section) => {
            observer.observe(section);
        });

    }

});