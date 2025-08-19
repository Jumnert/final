
      window.addEventListener("load", () => {
        const loader = document.getElementById("loader");
        setTimeout(() => {
          loader.classList.add("hidden");
        }, 500);
      });

      const newsletterForm = document.querySelector(".newsletter-form");
      const newsletterInput = document.querySelector(".newsletter-input");
      const newsletterBtn = document.querySelector(".newsletter-btn");

      newsletterBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const email = newsletterInput.value.trim();
        if (email && email.includes("@")) {
          newsletterBtn.textContent = "Subscribed!";
          newsletterBtn.style.background =
            "linear-gradient(135deg, #10b981, #059669)";
          newsletterInput.value = "";
          setTimeout(() => {
            newsletterBtn.textContent = "Subscribe";
            newsletterBtn.style.background =
              "linear-gradient(135deg, var(--primary-light), var(--primary-medium))";
          }, 2000);
        } else {
          newsletterInput.style.borderColor = "#ef4444";
          setTimeout(() => {
            newsletterInput.style.borderColor = "transparent";
          }, 1000);
        }
      });

      const darkModeToggle = document.getElementById("darkModeToggle");
      const body = document.body;
      const currentTheme = localStorage.getItem("theme") || "light";
      body.setAttribute("data-theme", currentTheme);

      function updateToggleIcon(theme) {
        darkModeToggle.innerHTML =
          theme === "dark"
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fa-regular fa-moon"></i>';
      }

      updateToggleIcon(currentTheme);

      darkModeToggle.addEventListener("click", () => {
        const currentTheme = body.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateToggleIcon(newTheme);
      });

      const texts = [
        "Transform Your Ideas Into Reality",
        "Create Amazing Digital Experiences",
        "Build The Future Together",
        "Innovation Starts Here",
      ];
      let textIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      const typingElement = document.getElementById("typingText");

      function typeText() {
        const currentText = texts[textIndex];
        if (isDeleting) {
          typingElement.textContent = currentText.substring(0, charIndex - 1);
          charIndex--;
          if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeText, 500);
            return;
          }
        } else {
          typingElement.textContent = currentText.substring(0, charIndex + 1);
          charIndex++;
          if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeText, 2000);
            return;
          }
        }
        setTimeout(typeText, isDeleting ? 50 : 100);
      }

      document.addEventListener("DOMContentLoaded", () => {
        setTimeout(typeText, 1000);
      });

      const mobileToggle = document.getElementById("mobileToggle");
      const navLinks = document.getElementById("navLinks");

      mobileToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });

      navLinks.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
          if (e.target.getAttribute("href") === "#") {
            e.preventDefault();
          }
          navLinks.classList.remove("active");
        }
      });

      document.addEventListener("click", (e) => {
        if (!e.target.closest(".navbar")) {
          navLinks.classList.remove("active");
        }
      });

      window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".navbar");
        const currentTheme = body.getAttribute("data-theme");
        if (window.scrollY > 100) {
          if (currentTheme === "dark") {
            navbar.style.background = "rgba(255, 255, 255, 0.15)";
            navbar.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.3)";
          } else {
            navbar.style.background = "rgba(255, 255, 255, 0.95)";
            navbar.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.15)";
          }
        } else {
          navbar.style.background =
            currentTheme === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)";
          navbar.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)";
        }
      });

      const navLinksElements = document.querySelectorAll(".nav-links a");
      navLinksElements.forEach((link) => {
        link.addEventListener("click", (e) => {
          if (link.getAttribute("href") === "#") {
            e.preventDefault();
          }
          navLinksElements.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        });
      });