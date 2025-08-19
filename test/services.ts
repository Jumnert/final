// TypeScript version of the provided JavaScript code

// --- Utility Functions ---
function scrollToSection(sectionId: string): void {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

function toggleFAQ(element: HTMLElement): void {
  const item = element.parentElement as HTMLElement;
  const answer = item.querySelector(".faq-answer") as HTMLElement;
  const icon = element.querySelector(".faq-icon") as HTMLElement;

  item.classList.toggle("active");
  answer.classList.toggle("active");
  icon.classList.toggle("active");
}

// --- DOM Loaded Initialization ---
document.addEventListener("DOMContentLoaded", function () {
  // --- Dark Mode Toggle Functionality ---
  const themeToggle = document.getElementById("dark-mode-toggle") as HTMLElement;
  const htmlEl = document.documentElement;

  const setTheme = (theme: string): void => {
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
  const mobileToggle = document.getElementById("mobile-toggle") as HTMLElement;
  const navLinks = document.querySelector(".nav-links") as HTMLElement;

  mobileToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const icon = mobileToggle.querySelector("i") as HTMLElement;
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
    if ((e.target as HTMLElement).tagName === "A") {
      navLinks.classList.remove("active");
      const icon = mobileToggle.querySelector("i") as HTMLElement;
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // --- Form Validation and Submission ---
  const contactForm = document.getElementById("contact-form") as HTMLFormElement;
  const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;
  const btnText = document.getElementById("btn-text") as HTMLElement;
  const btnIcon = document.getElementById("btn-icon") as HTMLElement;
  const successMessage = document.getElementById("success-message") as HTMLElement;

  // Validation patterns
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex: RegExp = /^[\+]?[0-9\s\-\(\)]{8,}$/;

  // Real-time validation
  const inputs: string[] = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "subject",
    "message",
    "privacy",
  ];

  inputs.forEach((field) => {
    const input = document.getElementById(field) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    if (input) {
      input.addEventListener("blur", () => validateField(field));
      input.addEventListener("input", () => clearFieldError(field));
    }
  });

  function validateField(fieldName: string): boolean {
    const field = document.getElementById(fieldName) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const errorElement = document.getElementById(fieldName + "-error") as HTMLElement;
    let isValid = true;
    let errorMessage = "";

    switch (fieldName) {
      case "firstName":
      case "lastName":
        if (!field.value.trim()) {
          errorMessage = `Please enter your ${fieldName === "firstName" ? "first" : "last"} name`;
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

  function updateFieldValidation(field: HTMLElement, errorElement: HTMLElement, isValid: boolean, errorMessage: string): void {
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

  function clearFieldError(fieldName: string): void {
    const field = document.getElementById(fieldName) as HTMLElement;
    const errorElement = document.getElementById(fieldName + "-error") as HTMLElement;
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
      const firstError = document.querySelector(".form-input.error, .form-textarea.error, .form-select.error") as HTMLElement;
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
        const input = document.getElementById(field) as HTMLInputElement;
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
      alert("There was an error sending your message. Please try again or contact us directly.");
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      btnText.textContent = "Send Message";
      btnIcon.classList.remove("btn-loading");
    }
  });

  function simulateFormSubmission(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  // --- FAQ Accordion Functionality ---
  window.toggleFAQ = function (element: HTMLElement): void {
    const faqItem = element.parentElement as HTMLElement;
    const faqAnswer = faqItem.querySelector(".faq-answer") as HTMLElement;
    const faqIcon = element.querySelector(".faq-icon") as HTMLElement;

    // Close all other FAQ items
    const allFaqItems = document.querySelectorAll(".faq-item");
    allFaqItems.forEach((item) => {
      if (item !== faqItem) {
        item.classList.remove("active");
        item.querySelector(".faq-answer")?.classList.remove("active");
      }
    });

    // Toggle current FAQ item
    faqItem.classList.toggle("active");
    faqAnswer.classList.toggle("active");
  };

  