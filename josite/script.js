const splash = document.getElementById("splash");
const body = document.body;

window.addEventListener("load", () => {
  const MIN_SPLASH_TIME = 4000;
  const MAX_SPLASH_TIME = 5000;
  setTimeout(() => {
    splash.classList.add("fade-out");
    body.classList.remove("locked");
    splash.addEventListener("transitionend", () => splash.remove(), {
      once: true,
    });
  }, MIN_SPLASH_TIME);
});

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

function closeMobileMenu() {
  hamburger.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
  mobileMenu.classList.remove("open");
}

hamburger.addEventListener("click", () => {
  const isOpen = hamburger.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", String(isOpen));
  mobileMenu.classList.toggle("open", isOpen);
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

["resumeBtn", "resumeBtnMobile"].forEach((id) => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener("click", () => {
      window.open("/resume.pdf", "_blank");
    });
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
  );

  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in-view"));
}

// 08037447489 - Ntedeng Estate Port Harcourt
// 08033399660 - Ebo Njogo & Company Port Harcourt
// 07066380231 - TMC Estate Port Harcourt
// 09092248592 - OceanVille Estate Port Harcourt
// 09040840396 - The Oak Residence Port Hrcourt
// 07081436312 - Potter's Estate Port Harcourt
// 08124155437 - Port Harcourt Stay and Go
