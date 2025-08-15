// Dark Mode Toggle Functionality
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = sessionStorage.getItem("theme") || "light";
body.setAttribute("data-theme", currentTheme);

// Update toggle button icon
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
  sessionStorage.setItem("theme", newTheme);
  updateToggleIcon(newTheme);
});

// Mobile menu toggle functionality
const mobileToggle = document.getElementById("mobileToggle");
const navLinks = document.getElementById("navLinks");

mobileToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("active");
  }
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".navbar")) {
    navLinks.classList.remove("active");
  }
});

// Newsletter Subscription
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

// Add scroll effect to navbar
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

// Character count for message textarea
const messageTextarea = document.getElementById("message");
const charCount = document.getElementById("charCount");

messageTextarea.addEventListener("input", () => {
  const count = messageTextarea.value.length;
  charCount.textContent = count;

  if (count > 1000) {
    charCount.style.color = "#ef4444";
  } else if (count > 800) {
    charCount.style.color = "#f59e0b";
  } else {
    charCount.style.color = "var(--text-secondary)";
  }
});

// File upload functionality
const fileUpload = document.getElementById("fileUpload");
const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileList");
let uploadedFiles = [];

fileUpload.addEventListener("dragover", (e) => {
  e.preventDefault();
  fileUpload.style.borderColor = "var(--primary-medium)";
  fileUpload.style.background = "rgba(82, 109, 130, 0.1)";
});

fileUpload.addEventListener("dragleave", (e) => {
  e.preventDefault();
  fileUpload.style.borderColor = "var(--border-color)";
  fileUpload.style.background = "var(--input-bg)";
});

fileUpload.addEventListener("drop", (e) => {
  e.preventDefault();
  fileUpload.style.borderColor = "var(--border-color)";
  fileUpload.style.background = "var(--input-bg)";

  const files = Array.from(e.dataTransfer.files);
  handleFiles(files);
});

fileInput.addEventListener("change", (e) => {
  const files = Array.from(e.target.files);
  handleFiles(files);
});

function handleFiles(files) {
  files.forEach((file) => {
    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      alert(`File "${file.name}" is too large. Maximum size is 10MB.`);
      return;
    }

    if (uploadedFiles.length >= 5) {
      alert("Maximum 5 files allowed.");
      return;
    }

    uploadedFiles.push(file);
    displayFile(file);
  });
}

function displayFile(file) {
  const fileItem = document.createElement("div");
  fileItem.className = "file-item";
  fileItem.innerHTML = `
    <span>📄 ${file.name} (${formatFileSize(file.size)})</span>
    <button type="button" class="file-remove" onclick="removeFile('${file.name}')">×</button>
  `;
  fileList.appendChild(fileItem);
}

function removeFile(fileName) {
  uploadedFiles = uploadedFiles.filter((file) => file.name !== fileName);
  const fileItems = fileList.querySelectorAll(".file-item");
  fileItems.forEach((item) => {
    if (item.textContent.includes(fileName)) {
      item.remove();
    }
  });
}

function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Contact form submission
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const btnText = document.getElementById("btnText");
const btnIcon = document.getElementById("btnIcon");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Show loading state
  submitBtn.classList.add("loading");
  submitBtn.disabled = true;
  btnText.textContent = "Sending...";
  btnIcon.className = "fas fa-spinner fa-spin";

  // Simulate form submission (replace with actual API call)
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Success state
    submitBtn.classList.remove("loading");
    submitBtn.classList.add("success");
    btnText.textContent = "Message Sent!";
    btnIcon.className = "fas fa-check";

    // Reset form
    contactForm.reset();
    uploadedFiles = [];
    fileList.innerHTML = "";
    charCount.textContent = "0";

    // Reset button after 3 seconds
    setTimeout(() => {
      submitBtn.classList.remove("success");
      submitBtn.disabled = false;
      btnText.textContent = "Send Message";
      btnIcon.className = "fas fa-paper-plane";
    }, 3000);
  } catch (error) {
    // Error state
    submitBtn.classList.remove("loading");
    submitBtn.disabled = false;
    btnText.textContent = "Try Again";
    btnIcon.className = "fas fa-exclamation-triangle";

    setTimeout(() => {
      btnText.textContent = "Send Message";
      btnIcon.className = "fas fa-paper-plane";
    }, 3000);
  }
});

// Form validation enhancements
const inputs = document.querySelectorAll(
  "input[required], textarea[required], select[required]"
);

inputs.forEach((input) => {
  input.addEventListener("blur", validateInput);
  input.addEventListener("input", clearValidation);
});

function validateInput(e) {
  const input = e.target;

  if (!input.value.trim()) {
    input.style.borderColor = "#ef4444";
    input.style.boxShadow = "0 0 0 4px rgba(239, 68, 68, 0.1)";
  }

  if (input.type === "email" && input.value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.value)) {
      input.style.borderColor = "#ef4444";
      input.style.boxShadow = "0 0 0 4px rgba(239, 68, 68, 0.1)";
    }
  }
}

function clearValidation(e) {
  const input = e.target;
  input.style.borderColor = "";
  input.style.boxShadow = "";
}
