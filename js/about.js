document.addEventListener("DOMContentLoaded", function () {
  // --- Dark Mode Toggle Functionality ---
  const desktopToggle = document.getElementById("dark-mode-toggle");
  const mobileToggleBtn = document.getElementById("mobile-dark-mode-toggle");
  const htmlEl = document.documentElement;

  const setTheme = (theme) => {
    htmlEl.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  const toggleTheme = () => {
    const currentTheme = htmlEl.getAttribute("data-theme");
    setTheme(currentTheme === "dark" ? "light" : "dark");
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

  desktopToggle.addEventListener("click", toggleTheme);
  mobileToggleBtn.addEventListener("click", toggleTheme);

  // --- Mobile Navigation Toggle ---
  const mobileMenuToggle = document.getElementById("mobile-toggle");
  const navLinks = document.getElementById("nav-links");

  mobileMenuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const icon = mobileMenuToggle.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
});
