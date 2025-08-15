const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body;

darkModeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  body.setAttribute("data-theme", newTheme);
});

const mobileToggle = document.getElementById("mobile-toggle");
const navLinks = document.getElementById("nav-links");

mobileToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Counter animation
const counters = document.querySelectorAll(".stat-number");

counters.forEach((counter) => {
  const target = +counter.getAttribute("data-target");
  const suffix = counter.getAttribute("data-suffix") || "";
  const duration = 2000; // 2 seconds
  const stepTime = Math.abs(Math.floor(duration / target));

  let current = 0;
  const updateCount = () => {
    current++;
    if (current <= target) {
      counter.innerText = current + suffix;
      setTimeout(updateCount, stepTime);
    }
  };
  updateCount();
});

// Filter functionality
const filterTabs = document.getElementById("filter-tabs");
const serviceCards = document.querySelectorAll(".service-card");

filterTabs.addEventListener("click", (e) => {
  if (e.target.classList.contains("filter-tab")) {
    // Deactivate all tabs
    filterTabs.querySelectorAll(".filter-tab").forEach((tab) => {
      tab.classList.remove("active");
    });

    // Activate clicked tab
    e.target.classList.add("active");

    const filter = e.target.getAttribute("data-filter");

    serviceCards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  }
});
