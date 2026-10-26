const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;
const animatedHeadline = document.querySelector(".hero h1 .grad");
const sunIcon =
  '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path></svg>';
const moonIcon =
  '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"></path></svg>';

if (
  animatedHeadline &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const phrases = [
    "clean, modern",
    "fast, reliable",
    "bold, memorable",
    "smart, simple",
  ];
  let phraseIndex = 0;
  let characterIndex = phrases[phraseIndex].length;
  let deleting = true;

  function animateHeadline() {
    const phrase = phrases[phraseIndex];
    animatedHeadline.textContent = phrase.slice(0, characterIndex);

    if (deleting) {
      characterIndex -= 1;
      if (characterIndex < 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        characterIndex = 0;
        window.setTimeout(animateHeadline, 300);
        return;
      }
      window.setTimeout(animateHeadline, 45);
      return;
    }

    characterIndex += 1;
    if (characterIndex > phrase.length) {
      deleting = true;
      characterIndex = phrase.length;
      window.setTimeout(animateHeadline, 1500);
      return;
    }
    window.setTimeout(animateHeadline, 85);
  }

  window.setTimeout(animateHeadline, 1500);
}

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {}
  if (themeToggle) {
    themeToggle.innerHTML = theme === "light" ? moonIcon : sunIcon;
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

// Animated background parallax
const orbWraps = document.querySelectorAll(".orb-wrap");
let scrollTicking = false;

function updateBackground() {
  const y = window.scrollY;

  orbWraps.forEach((wrap, i) => {
    const factor = (i + 1) * 0.08;
    wrap.style.transform = `translate3d(0, ${(-y * factor).toFixed(1)}px, 0)`;
  });

  scrollTicking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!scrollTicking) {
      requestAnimationFrame(updateBackground);
      scrollTicking = true;
    }
  },
  { passive: true }
);

updateBackground();

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
        const el = entry.target;

        // Reveal siblings one at a time within the same container
        const siblings = Array.from(el.parentElement.children).filter((child) =>
          child.classList.contains("reveal")
        );
        const index = Math.max(siblings.indexOf(el), 0);
        el.style.transitionDelay = `${index * 0.12}s`;

        el.classList.add("visible");
        observer.unobserve(el);
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
