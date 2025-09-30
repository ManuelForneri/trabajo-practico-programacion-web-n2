document.addEventListener("DOMContentLoaded", function () {
  initializeAnimations();

  setupContactForm();

  setupScrollEffects();

  setupAnimatedCounters();

  setupHamburgerMenu();
});

function setupHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const body = document.body;

  navLinks.forEach((link, index) => {
    link.parentElement.style.setProperty("--i", index + 1);
  });

  hamburger.addEventListener("click", function (e) {
    e.stopPropagation();
    const isActive = this.classList.contains("active");

    this.classList.toggle("active");
    navMenu.classList.toggle("active");

    if (!isActive) {
      body.style.overflow = "hidden";
      void navMenu.offsetWidth;
      navMenu.style.transform = "translateX(0)";
      navMenu.style.opacity = "1";
    } else {
      body.style.overflow = "";
      navMenu.style.transform = "translateX(100%)";
      navMenu.style.opacity = "0";
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 992) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        body.style.overflow = "";
        navMenu.style.transform = "translateX(100%)";
        navMenu.style.opacity = "0";
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar") && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      body.style.overflow = "";
      navMenu.style.transform = "translateX(100%)";
      navMenu.style.opacity = "0";
    }
  });

  let lastScroll = 0;
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;

        if (
          Math.abs(currentScroll - lastScroll) > 30 &&
          navMenu.classList.contains("active")
        ) {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
          body.style.overflow = "";
          navMenu.style.transform = "translateX(100%)";
          navMenu.style.opacity = "0";
        }

        lastScroll = currentScroll;
        ticking = false;
      });

      ticking = true;
    }
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 992) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        body.style.overflow = "";
        navMenu.style.transform = "";
        navMenu.style.opacity = "";
      }
    }, 250);
  });
}

function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
      }
    });
  }, observerOptions);

  document.querySelectorAll(".service-card").forEach((card, index) => {
    card.style.animation = `fadeInUp 0.8s ease forwards`;
    card.style.animationDelay = `${index * 0.2}s`;
    card.style.animationPlayState = "paused";
    observer.observe(card);
  });

  setupActiveNavigation();
}

function setupActiveNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

function setupContactForm() {
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const mensaje = document.getElementById("mensaje").value;

    if (nombre && email && telefono && mensaje) {
      showModernAlert("¡Mensaje enviado exitosamente!", "success");
      clearFormWithAnimation(contactForm);

      setTimeout(() => {
        showModernAlert("Te contactaremos en las próximas 24 horas", "info");
      }, 1500);
    } else {
      showModernAlert("Por favor, complete todos los campos", "warning");
    }
  });
}

function showModernAlert(message, type = "info") {
  const alert = document.createElement("div");
  alert.className = `modern-alert alert-${type}`;
  alert.innerHTML = `
        <div class="alert-content">
            <span class="alert-icon">${getAlertIcon(type)}</span>
            <span class="alert-message">${message}</span>
        </div>
        <button class="alert-close">&times;</button>
    `;

  alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getAlertColor(type)};
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 350px;
        transform: translateX(400px);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;

  document.body.appendChild(alert);

  setTimeout(() => {
    alert.style.transform = "translateX(0)";
  }, 100);
  const closeBtn = alert.querySelector(".alert-close");
  closeBtn.addEventListener("click", () => {
    closeAlert(alert);
  });

  setTimeout(() => {
    closeAlert(alert);
  }, 5000);
}

function getAlertIcon(type) {
  const icons = {
    success: "✓",
    warning: "⚠",
    info: "ℹ",
    error: "✕",
  };
  return icons[type] || icons.info;
}

function getAlertColor(type) {
  const colors = {
    success: "linear-gradient(135deg, #4caf50, #45a049)",
    warning: "linear-gradient(135deg, #ff9800, #f57c00)",
    info: "linear-gradient(135deg, #2196f3, #1976d2)",
    error: "linear-gradient(135deg, #f44336, #d32f2f)",
  };
  return colors[type] || colors.info;
}

function closeAlert(alert) {
  alert.style.transform = "translateX(400px)";
  setTimeout(() => {
    if (alert.parentNode) {
      alert.parentNode.removeChild(alert);
    }
  }, 400);
}

function clearFormWithAnimation(form) {
  const inputs = form.querySelectorAll("input, textarea");

  inputs.forEach((input, index) => {
    setTimeout(() => {
      input.style.transform = "scale(0.95)";
      setTimeout(() => {
        input.value = "";
        input.style.transform = "scale(1)";
      }, 200);
    }, index * 100);
  });
}

function setupScrollEffects() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector(".hero-section");

    if (heroSection) {
      const rate = scrolled * -0.5;
      heroSection.style.transform = `translateY(${rate}px)`;
    }
  });

  const header = document.querySelector(".header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScrollTop = scrollTop;
  });
}

function setupAnimatedCounters() {
  const counters = document.querySelectorAll(".stat-number");

  const animateCounter = (counter) => {
    const target = parseInt(counter.textContent.replace(/\D/g, ""));
    const increment = target / 100;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      const suffix = counter.textContent.includes("+")
        ? "+"
        : counter.textContent.includes("%")
        ? "%"
        : counter.textContent.includes("$")
        ? "$"
        : "";

      counter.textContent = Math.floor(current) + suffix;
    }, 20);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}

const animationStyles = document.createElement("style");
animationStyles.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    .modern-alert {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
    }

    .alert-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .alert-icon {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .alert-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.3s ease;
    }

    .alert-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    .service-card:hover .service-image {
        animation: pulse 2s ease-in-out infinite;
    }

    .hero-cta:hover {
        animation: pulse 1s ease-in-out;
    }
`;
document.head.appendChild(animationStyles);
