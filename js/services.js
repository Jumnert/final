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
  const navLinks = document.getElementById("nav-links");

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

  // --- Service Filtering Functionality ---
  const filterTabs = document.getElementById("filter-tabs");
  const serviceCards = document.querySelectorAll(".service-card");

  filterTabs.addEventListener("click", (e) => {
    const clickedTab = e.target.closest(".filter-tab");
    if (!clickedTab) return;

    filterTabs.querySelector(".active").classList.remove("active");
    clickedTab.classList.add("active");

    const filter = clickedTab.getAttribute("data-filter");

    serviceCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      if (filter === "all" || filter === category) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });

  // --- Counter Up Animation ---
  const statsSection = document.querySelector(".hero-stats");

  const animateCount = (element) => {
    const target = +element.dataset.target;
    const suffix = element.dataset.suffix || "";
    const duration = 2000; // 2 seconds
    let current = 0;
    const stepTime = 16; // roughly 60fps
    const totalSteps = Math.round(duration / stepTime);
    const increment = target / totalSteps;

    const updateCount = () => {
      current += increment;
      if (current < target) {
        element.innerText = Math.ceil(current);
        requestAnimationFrame(updateCount);
      } else {
        element.innerText = target + suffix;
      }
    };
    requestAnimationFrame(updateCount);
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => 
        if (entry.isIntersecting) {
          const statNumbers = entry.target.querySelectorAll(".stat-number");
          statNumbers.forEach((num) => animateCount(num));
          observer.unobserve(entry.target); // Animate only once
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of the element is visible
    }
  );

  if (statsSection) {
    observer.observe(statsSection);
  }
});
