// Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("hide");
    }, 600);
  }
});

// Mobile menu
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu) {
      navMenu.classList.remove("open");
    }
  });
});

// Typing effect
const typingText = document.getElementById("typingText");
const roles = [
  "UI/UX Designer",
  "Graphic Designer",
  "Web Designer",
  "Mobile App Designer",
  "Creative Designer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingText) return;

  const currentRole = roles[roleIndex];
  const displayedText = currentRole.substring(0, charIndex);
  typingText.textContent = displayedText;

  if (!isDeleting && charIndex < currentRole.length) {
    charIndex++;
    setTimeout(typeEffect, 90);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 50);
  } else {
    isDeleting = !isDeleting;

    if (!isDeleting) {
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeEffect, isDeleting ? 1000 : 300);
  }
}

if (typingText) {
  typeEffect();
}

// Reveal on scroll
const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}

// Skill bar animation
const skillProgressBars = document.querySelectorAll(".skill-progress");

if (skillProgressBars.length > 0) {
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.getAttribute("data-width");
        }
      });
    },
    {
      threshold: 0.4
    }
  );

  skillProgressBars.forEach((bar) => skillObserver.observe(bar));
}

// Active nav highlight on scroll
const sections = document.querySelectorAll("main section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
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

// Back to top button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (!backToTop) return;

  if (window.scrollY > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// Modal
const modal = document.getElementById("globalModal");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    if (!modal || !modalImage || !modalTitle || !modalDescription) return;

    const title = trigger.dataset.title || "";
    const description = trigger.dataset.description || "";
    const image = trigger.dataset.image || "";

    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalImage.src = image;
    modalImage.alt = title;

    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  });
});

function closeModal() {
  if (!modal) return;
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

// Project filter
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category");

      if (filter === "all" || filter === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Contact form validation
// Contact form validation
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formSuccess = document.getElementById("formSuccess");

function setError(input, message) {
  const formGroup = input.parentElement;
  const error = formGroup.querySelector(".error");
  if (error) {
    error.textContent = message;
  }
  input.style.borderColor = "red";
}

function clearError(input) {
  const formGroup = input.parentElement;
  const error = formGroup.querySelector(".error");
  if (error) {
    error.textContent = "";
  }
  input.style.borderColor = "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (contactForm && nameInput && emailInput && messageInput) {
  contactForm.addEventListener("submit", (e) => {
    let isValid = true;

    if (formSuccess) {
      formSuccess.textContent = "";
    }

    // clear previous errors first
    clearError(nameInput);
    clearError(emailInput);
    clearError(messageInput);

    // Name validation
    if (nameInput.value.trim() === "") {
      setError(nameInput, "Please enter your name.");
      isValid = false;
    }

    // Email validation
    if (emailInput.value.trim() === "") {
      setError(emailInput, "Please enter your email.");
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      setError(emailInput, "Please enter a valid email address.");
      isValid = false;
    }

    // Message validation
    if (messageInput.value.trim() === "") {
      setError(messageInput, "Please enter your message.");
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      setError(messageInput, "Message should be at least 10 characters.");
      isValid = false;
    }
// Show success message after redirect
const params = new URLSearchParams(window.location.search);
if (params.get("success") === "true" && formSuccess) {
  formSuccess.textContent = "Your message has been sent successfully.";
}
    // Stop submit only if invalid
    if (!isValid) {
      e.preventDefault();
    }
  });

}