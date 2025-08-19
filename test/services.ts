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

document.addEventListener("DOMContentLoaded", function () {
  // --- Dark Mode Toggle Functionality ---
  const themeToggle = document.getElementById(
    "dark-mode-toggle"
  ) as HTMLButtonElement;
  const htmlEl = document.documentElement;

  const setTheme = (theme: "light" | "dark"): void => {
    htmlEl.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    setTheme(savedTheme as "light" | "dark");
  } else if (prefersDark) {
    setTheme("dark");
  } else {
    setTheme("light");
  }

  themeToggle.addEventListener("click", () => {
    const currentTheme = htmlEl.getAttribute("data-theme") as "dark" | "light";
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });

  // --- Mobile Navigation Toggle ---
  const mobileToggle = document.getElementById(
    "mobile-toggle"
  ) as HTMLButtonElement;
  const navLinks = document.getElementById("nav-links") as HTMLUListElement;

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
  navLinks.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "A") {
      navLinks.classList.remove("active");
      const icon = mobileToggle.querySelector("i") as HTMLElement;
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // --- Form Validation and Submission ---
  const contactForm = document.getElementById(
    "contact-form"
  ) as HTMLFormElement;
  const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;
  const btnText = document.getElementById("btn-text") as HTMLElement;
  const btnIcon = document.getElementById("btn-icon") as HTMLElement;
  const successMessage = document.getElementById(
    "success-message"
  ) as HTMLElement;

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
    const input = document.getElementById(field) as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    if (input) {
      input.addEventListener("blur", () => validateField(field));
      input.addEventListener("input", () => clearFieldError(field));
    }
  });

  function validateField(fieldName: string): boolean {
    const field = document.getElementById(fieldName) as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    const errorElement = document.getElementById(
      fieldName + "-error"
    ) as HTMLElement;
    let isValid = true;
    let errorMessage = "";

    if (!field) {
      return false;
    }

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
        const privacyInput = field as HTMLInputElement;
        if (!privacyInput.checked) {
          errorMessage = "Please accept our privacy policy";
          isValid = false;
        }
        break;
    }

    updateFieldValidation(field, errorElement, isValid, errorMessage);
    return isValid;
  }

  function updateFieldValidation(
    field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
    errorElement: HTMLElement,
    isValid: boolean,
    errorMessage: string
  ): void {
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
    const errorElement = document.getElementById(
      fieldName + "-error"
    ) as HTMLElement;
    field.classList.remove("error");
    errorElement.classList.remove("show");
  }

  // Form submission
  contactForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    let isFormValid = true;
    inputs.forEach((field) => {
      if (!validateField(field)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      const firstError = document.querySelector(
        ".form-input.error, .form-textarea.error, .form-select.error"
      ) as HTMLElement;
      if (firstError) {
        firstError.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        firstError.focus();
      }
      return;
    }

    submitBtn.disabled = true;
    btnText.textContent = "Sending...";
    btnIcon.classList.add("btn-loading");

    try {
      await simulateFormSubmission();

      successMessage.classList.add("show");
      contactForm.reset();

      inputs.forEach((field) => {
        const input = document.getElementById(field) as HTMLElement;
        if (input) {
          input.classList.remove("success", "error");
        }
      });

      successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } catch (error) {
      alert(
        "There was an error sending your message. Please try again or contact us directly."
      );
    } finally {
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

    const allFaqItems = document.querySelectorAll(".faq-item");
    allFaqItems.forEach((item) => {
      if (item !== faqItem) {
        item.classList.remove("active");
        (item.querySelector(".faq-answer") as HTMLElement).classList.remove(
          "active"
        );
      }
    });

    faqItem.classList.toggle("active");
    faqAnswer.classList.toggle("active");
  };

  // --- Smooth Scrolling for Navigation ---
  window.scrollToSection = function (sectionId: string): void {
    const section = document.getElementById(sectionId) as HTMLElement;
    if (section) {
      const offset = 100;
      const targetPosition = section.offsetTop - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  // --- Scheduler Functions ---
  window.openScheduler = function (type: "video" | "person" | "phone"): void {
    const messages: Record<string, string> = {
      video:
        "Video consultation scheduled! We'll send you a calendar invite within 24 hours.",
      person:
        "Office visit scheduled! We'll confirm the appointment time via email.",
      phone: "Callback requested! We'll call you within 2 business hours.",
    };

    alert(messages[type] || "Scheduling request received!");
  };

  // --- Dynamic Content Loading (Optional) ---
  const loadingObserver = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
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

  document
    .querySelectorAll(".contact-info-card, .faq-item, .hero-card")
    .forEach((el) => {
      loadingObserver.observe(el);
    });

  // --- Interactive Map Enhancement ---
  const mapIframe = document.querySelector(".map-iframe") as HTMLIFrameElement;
  if (mapIframe) {
    mapIframe.addEventListener("load", () => {
      mapIframe.style.opacity = "1";
    });
  }

  // --- Form Auto-save (Optional) ---
  let autoSaveTimeout: number;
  const formFields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "subject",
    "message",
  ];

  formFields.forEach((field) => {
    const input = document.getElementById(field) as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    if (input) {
      input.addEventListener("input", () => {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
          saveFormData();
        }, 1000);
      });
    }
  });

  function saveFormData(): void {
    const formData: Record<string, string> = {};
    formFields.forEach((field) => {
      const input = document.getElementById(field) as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement;
      if (input && input.value) {
        formData[field] = input.value;
      }
    });

    if (Object.keys(formData).length > 0) {
      localStorage.setItem("contactFormData", JSON.stringify(formData));
    }
  }

  function loadFormData(): void {
    const savedData = localStorage.getItem("contactFormData");
    if (savedData) {
      try {
        const formData: Record<string, string> = JSON.parse(savedData);
        Object.keys(formData).forEach((field) => {
          const input = document.getElementById(field) as
            | HTMLInputElement
            | HTMLTextAreaElement
            | HTMLSelectElement;
          if (input && formData[field]) {
            input.value = formData[field];
          }
        });
      } catch (e) {
        console.log("Could not load saved form data");
      }
    }
  }

  loadFormData();

  contactForm.addEventListener("submit", () => {
    localStorage.removeItem("contactFormData");
  });

  // --- Advanced Navigation Highlighting ---
  const sections = document.querySelectorAll(
    "section[id]"
  ) as NodeListOf<HTMLElement>;
  const navLinks = document.querySelectorAll(
    '.nav-links a[href^="#"]'
  ) as NodeListOf<HTMLAnchorElement>;

  const highlightNavigation = (): void => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.clientHeight;

      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id") || "";
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
  highlightNavigation();

  // --- Animated Counters for Stats (if any) ---
  const animateValue = (
    element: HTMLElement,
    start: number,
    end: number,
    duration: number,
    suffix = ""
  ): void => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
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
  const messageField = document.getElementById(
    "message"
  ) as HTMLTextAreaElement;
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
    messageField.parentNode?.appendChild(counterElement);

    const updateCounter = (): void => {
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
    messageField.setAttribute("maxlength", maxLength.toString());
    updateCounter();
  }

  // --- Enhanced Loading States ---
  const createLoadingState = (): HTMLDivElement => {
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
  const enhanceFormFields = (): void => {
    const formInputs = document.querySelectorAll(
      ".form-input, .form-textarea, .form-select"
    ) as NodeListOf<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

    formInputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentNode?.classList.add("focused");
      });

      input.addEventListener("blur", () => {
        if (!input.value) {
          input.parentNode?.classList.remove("focused");
        }
      });

      if (input.value) {
        input.parentNode?.classList.add("focused");
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

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("faq-question")) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleFAQ(target);
      }
    }
  });

  document.querySelectorAll(".faq-question").forEach((question) => {
    question.setAttribute("tabindex", "0");
    question.setAttribute("role", "button");
    question.setAttribute("aria-expanded", "false");
  });

  // --- Performance Optimizations ---

  const mapObserver = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const iframe = entry.target as HTMLIFrameElement;
          const src = iframe.dataset.src;
          if (src) {
            iframe.src = src;
            iframe.removeAttribute("data-src");
            mapObserver.unobserve(iframe);
          }
        }
      });
    }
  );

  const mapIframeElement = document.querySelector(
    ".map-iframe"
  ) as HTMLIFrameElement;
  if (mapIframeElement && mapIframeElement.dataset.src) {
    mapObserver.observe(mapIframeElement);
  }

  // --- Error Handling and Feedback ---
  window.addEventListener("error", (e: ErrorEvent) => {
    console.error("JavaScript error:", e.error);
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

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate: boolean
): (...args: Parameters<T>) => void {
  let timeout: number;
  return function executedFunction(...args: Parameters<T>): void {
    const later = (): void => {
      timeout = 0;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function executedFunction(...args: Parameters<T>): void {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

function formatPhoneNumber(value: string): string {
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

document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.getElementById("phone") as HTMLInputElement;
  if (phoneInput) {
    phoneInput.addEventListener("input", (e: Event) => {
      const target = e.target as HTMLInputElement;
      target.value = formatPhoneNumber(target.value);
    });
  }
});
