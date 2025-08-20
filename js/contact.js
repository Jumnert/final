function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

function toggleFAQ(element) {
  const item = element.parentElement;
  const answer = item.querySelector(".faq-answer");
  const icon = element.querySelector(".faq-icon");

  item.classList.toggle("active");
  answer.classList.toggle("active");
  icon.classList.toggle("active");
}
document.addEventListener("DOMContentLoaded", function () {
  // --- Dark Mode Toggle Functionality ---
  const themeToggle = document.getElementById("dark-mode-toggle");
  const htmlEl = document.documentElement;

  const setTheme = (theme) => {
    htmlEl.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    setTheme(savedTheme);
  } else if (prefersDark) {
    setTheme("dark");
  } else {
    setTheme("light");
  }

  themeToggle.addEventListener("click", () => {
    const currentTheme = htmlEl.getAttribute("data-theme");
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });

  // --- Mobile Navigation Toggle ---
  const mobileToggle = document.getElementById("mobile-toggle");

  mobileToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const icon = mobileToggle.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Close mobile menu when clicking on links
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("active");
      const icon = mobileToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // --- Form Validation and Submission ---
  const contactForm = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");
  const btnText = document.getElementById("btn-text");
  const btnIcon = document.getElementById("btn-icon");
  const successMessage = document.getElementById("success-message");

  // Validation patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;

  // Real-time validation
  const inputs = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "subject",
    "message",
    "privacy",
  ];

  inputs.forEach((field) => {
    const input = document.getElementById(field);
    if (input) {
      input.addEventListener("blur", () => validateField(field));
      input.addEventListener("input", () => clearFieldError(field));
    }
  });

  function validateField(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + "-error");
    let isValid = true;
    let errorMessage = "";

    switch (fieldName) {
      case "firstName":
      case "lastName":
        if (!field.value.trim()) {
          errorMessage = `Please enter your ${
            fieldName === "firstName" ? "first" : "last"
          } name`;
          isValid = false;
        } else if (field.value.trim().length < 2) {
          errorMessage = "Name must be at least 2 characters long";
          isValid = false;
        }
        break;

      case "email":
        if (!field.value.trim()) {
          errorMessage = "Please enter your email address";
          isValid = false;
        } else if (!emailRegex.test(field.value)) {
          errorMessage = "Please enter a valid email address";
          isValid = false;
        }
        break;

      case "phone":
        if (field.value.trim() && !phoneRegex.test(field.value)) {
          errorMessage = "Please enter a valid phone number";
          isValid = false;
        }
        break;

      case "subject":
        if (!field.value) {
          errorMessage = "Please select a subject";
          isValid = false;
        }
        break;

      case "message":
        if (!field.value.trim()) {
          errorMessage = "Please enter your message";
          isValid = false;
        } else if (field.value.trim().length < 10) {
          errorMessage = "Message must be at least 10 characters long";
          isValid = false;
        }
        break;

      case "privacy":
        if (!field.checked) {
          errorMessage = "Please accept our privacy policy";
          isValid = false;
        }
        break;
    }

    updateFieldValidation(field, errorElement, isValid, errorMessage);
    return isValid;
  }

  function updateFieldValidation(field, errorElement, isValid, errorMessage) {
    if (isValid) {
      field.classList.remove("error");
      field.classList.add("success");
      errorElement.classList.remove("show");
    } else {
      field.classList.remove("success");
      field.classList.add("error");
      errorElement.textContent = errorMessage;
      errorElement.classList.add("show");
    }
  }

  function clearFieldError(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + "-error");
    field.classList.remove("error");
    errorElement.classList.remove("show");
  }

  // Form submission
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validate all fields
    let isFormValid = true;
    inputs.forEach((field) => {
      if (!validateField(field)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      // Scroll to first error
      const firstError = document.querySelector(
        ".form-input.error, .form-textarea.error, .form-select.error"
      );
      if (firstError) {
        firstError.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        firstError.focus();
      }
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    btnText.textContent = "Sending...";
    btnIcon.classList.add("btn-loading");

    // Simulate form submission (replace with actual API call)
    try {
      await simulateFormSubmission();

      // Show success message
      successMessage.classList.add("show");
      contactForm.reset();

      // Reset all field styles
      inputs.forEach((field) => {
        const input = document.getElementById(field);
        if (input) {
          input.classList.remove("success", "error");
        }
      });

      // Scroll to success message
      successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } catch (error) {
      alert(
        "There was an error sending your message. Please try again or contact us directly."
      );
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      btnText.textContent = "Send Message";
      btnIcon.classList.remove("btn-loading");
    }
  });

  function simulateFormSubmission() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  // --- FAQ Accordion Functionality ---
  window.toggleFAQ = function (element) {
    const faqItem = element.parentElement;
    const faqAnswer = faqItem.querySelector(".faq-answer");
    const faqIcon = element.querySelector(".faq-icon");

    // Close all other FAQ items
    const allFaqItems = document.querySelectorAll(".faq-item");
    allFaqItems.forEach((item) => {
      if (item !== faqItem) {
        item.classList.remove("active");
        item.querySelector(".faq-answer").classList.remove("active");
      }
    });

    // Toggle current FAQ item
    faqItem.classList.toggle("active");
    faqAnswer.classList.toggle("active");
  };

  // --- Smooth Scrolling for Navigation ---
  window.scrollToSection = function (sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 100; // Account for fixed navbar
      const targetPosition = section.offsetTop - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  // --- Scheduler Functions ---
  window.openScheduler = function (type) {
    const messages = {
      video:
        "Video consultation scheduled! We'll send you a calendar invite within 24 hours.",
      person:
        "Office visit scheduled! We'll confirm the appointment time via email.",
      phone: "Callback requested! We'll call you within 2 business hours.",
    };

    // In a real application, this would open a scheduling widget
    alert(messages[type] || "Scheduling request received!");
  };

  // --- Dynamic Content Loading (Optional) ---
  const loadingObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Observe sections for fade-in animation
  document
    .querySelectorAll(".contact-info-card, .faq-item, .hero-card")
    .forEach((el) => {
      loadingObserver.observe(el);
    });

  // --- Interactive Map Enhancement ---
  const mapIframe = document.querySelector(".map-iframe");
  if (mapIframe) {
    mapIframe.addEventListener("load", () => {
      mapIframe.style.opacity = "1";
    });
  }

  // --- Form Auto-save (Optional) ---
  let autoSaveTimeout;
  const formFields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "subject",
    "message",
  ];

  formFields.forEach((field) => {
    const input = document.getElementById(field);
    if (input) {
      input.addEventListener("input", () => {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
          saveFormData();
        }, 1000);
      });
    }
  });

  function saveFormData() {
    const formData = {};
    formFields.forEach((field) => {
      const input = document.getElementById(field);
      if (input && input.value) {
        formData[field] = input.value;
      }
    });

    if (Object.keys(formData).length > 0) {
      localStorage.setItem("contactFormData", JSON.stringify(formData));
    }
  }

  function loadFormData() {
    const savedData = localStorage.getItem("contactFormData");
    if (savedData) {
      try {
        const formData = JSON.parse(savedData);
        Object.keys(formData).forEach((field) => {
          const input = document.getElementById(field);
          if (input && formData[field]) {
            input.value = formData[field];
          }
        });
      } catch (e) {
        console.log("Could not load saved form data");
      }
    }
  }

  // Load saved form data on page load
  loadFormData();

  // Clear saved form data on successful submission
  contactForm.addEventListener("submit", () => {
    localStorage.removeItem("contactFormData");
  });

  // --- Advanced Navigation Highlighting ---
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const highlightNavigation = () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.clientHeight;

      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", highlightNavigation);
  highlightNavigation(); // Run on load

  // --- Animated Counters for Stats (if any) ---
  const animateValue = (element, start, end, duration, suffix = "") => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // --- Contact Form Character Counter ---
  const messageField = document.getElementById("message");
  if (messageField) {
    const maxLength = 500;
    const counterElement = document.createElement("div");
    counterElement.className = "character-counter";
    counterElement.style.cssText = `
            font-size: 0.8rem;
            color: var(--text-secondary);
            text-align: right;
            margin-top: 5px;
          `;
    messageField.parentNode.appendChild(counterElement);

    const updateCounter = () => {
      const remaining = maxLength - messageField.value.length;
      counterElement.textContent = `${remaining} characters remaining`;

      if (remaining < 50) {
        counterElement.style.color = "var(--warning-color)";
      } else if (remaining < 0) {
        counterElement.style.color = "var(--error-color)";
      } else {
        counterElement.style.color = "var(--text-secondary)";
      }
    };

    messageField.addEventListener("input", updateCounter);
    messageField.setAttribute("maxlength", maxLength);
    updateCounter();
  }

  // --- Enhanced Loading States ---
  const createLoadingState = () => {
    const loading = document.createElement("div");
    loading.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
              <div class="spinner" style="
                width: 16px;
                height: 16px;
                border: 2px solid transparent;
                border-top: 2px solid currentColor;
                border-radius: 50%;
                animation: spin 1s linear infinite;
              "></div>
              <span>Loading...</span>
            </div>
          `;
    return loading;
  };

  // --- Form Field Focus Enhancement ---
  const enhanceFormFields = () => {
    const formInputs = document.querySelectorAll(
      ".form-input, .form-textarea, .form-select"
    );

    formInputs.forEach((input) => {
      // Add floating label effect
      input.addEventListener("focus", () => {
        input.parentNode.classList.add("focused");
      });

      input.addEventListener("blur", () => {
        if (!input.value) {
          input.parentNode.classList.remove("focused");
        }
      });

      // Check if field has value on load
      if (input.value) {
        input.parentNode.classList.add("focused");
      }
    });
  };

  enhanceFormFields();

  // --- Progressive Enhancement for Images ---
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.style.opacity = "0";
    img.style.transition = "opacity 0.3s ease";

    img.addEventListener("load", () => {
      img.style.opacity = "1";
    });
  });

  // --- Accessibility Enhancements ---

  // Skip to main content link
  const skipLink = document.createElement("a");
  skipLink.href = "#contact";
  skipLink.textContent = "Skip to main content";
  skipLink.className = "skip-link";
  skipLink.style.cssText = `
          position: absolute;
          top: -40px;
          left: 6px;
          background: var(--primary-dark);
          color: white;
          padding: 8px;
          text-decoration: none;
          border-radius: 4px;
          z-index: 1001;
          transition: top 0.3s ease;
        `;

  skipLink.addEventListener("focus", () => {
    skipLink.style.top = "6px";
  });

  skipLink.addEventListener("blur", () => {
    skipLink.style.top = "-40px";
  });

  document.body.insertBefore(skipLink, document.body.firstChild);

  // Keyboard navigation for FAQ
  document.addEventListener("keydown", (e) => {
    if (e.target.classList.contains("faq-question")) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleFAQ(e.target);
      }
    }
  });

  // Make FAQ questions focusable
  document.querySelectorAll(".faq-question").forEach((question) => {
    question.setAttribute("tabindex", "0");
    question.setAttribute("role", "button");
    question.setAttribute("aria-expanded", "false");
  });

  // --- Performance Optimizations ---

  // Lazy load iframe
  const mapObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const iframe = entry.target;
        if (iframe.dataset.src) {
          iframe.src = iframe.dataset.src;
          iframe.removeAttribute("data-src");
          mapObserver.unobserve(iframe);
        }
      }
    });
  });

  const mapIframeElement = document.querySelector(".map-iframe");
  if (mapIframeElement && mapIframeElement.dataset.src) {
    mapObserver.observe(mapIframeElement);
  }

  // --- Error Handling and Feedback ---
  window.addEventListener("error", (e) => {
    console.error("JavaScript error:", e.error);
    // In production, you might want to send this to an error tracking service
  });

  // --- Service Worker Registration (for offline functionality) ---
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch((err) => {
      console.log("ServiceWorker registration failed: ", err);
    });
  }

  console.log("Contact page fully loaded and interactive!");
});

// --- Additional Utility Functions ---

// Debounce function for performance
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Format phone number as user types
function formatPhoneNumber(value) {
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  }
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6, 10)}`;
}

// Apply phone formatting
document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      e.target.value = formatPhoneNumber(e.target.value);
    });
  }
});
/* add google sheet */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("success-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default submission

    // Collect form data
    const formData = {
      firstName: document.getElementById("firstName").value.trim(),
      lastName: document.getElementById("lastName").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value.trim(),
      newsletter: document.getElementById("newsletter").checked,
      privacy: document.getElementById("privacy").checked,
    };

    // Basic validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.subject ||
      !formData.message ||
      !formData.privacy
    ) {
      alert(
        "Please fill in all required fields and accept the privacy policy."
      );
      return;
    }

    // Send data to Google Sheets via Web App
    fetch(
      "https://script.google.com/macros/s/AKfycbwDjIvmgCsHXpOvjVJ4e-S3YLm8CQ0Uv2xdbu_yeICboF4pggIOW7lG7cHVaIDNiMaozA/exec",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result === "success") {
          successMessage.style.display = "block";
          form.reset();
        } else {
          console.error("Server error:", data.error);
          alert("There was an error sending your message. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        alert("There was an error sending your message. Please try again.");
      });
  });
});
