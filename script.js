const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {}
  if (themeToggle) {
    themeToggle.textContent = theme === "light" ? "☀️" : "🌙";
    themeToggle.setAttribute(
      "aria-label",
      theme === "light" ? "Switch to dark mode" : "Switch to light mode"
    );
  }
}

setTheme(root.getAttribute("data-theme") === "light" ? "light" : "dark");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const next =
      root.getAttribute("data-theme") === "light" ? "dark" : "light";
    setTheme(next);
  });
}

const header = document.querySelector("header");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 10);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (toggle && navLinks) {
  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    }
  });
}

const revealTargets = document.querySelectorAll(
  ".section-head, .card, .about, .contact"
);

revealTargets.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((el) => observer.observe(el));

const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-links a");

function setActiveLink() {
  const scrollPos = window.scrollY + 120;

  sections.forEach((section) => {
    if (
      section.offsetTop <= scrollPos &&
      section.offsetTop + section.offsetHeight > scrollPos
    ) {
      links.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === "#" + section.id
        );
      });
    }
  });
}

window.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();
