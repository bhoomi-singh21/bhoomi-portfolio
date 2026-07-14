/* ==========================================================================
   BHOOMI SINGH — PORTFOLIO SCRIPT
   Plain, vanilla JavaScript. Every function below is small, does one job,
   and is commented so it's easy to explain line-by-line in an interview.
   ========================================================================== */

// Wait for the whole page to load before running anything.
document.addEventListener('DOMContentLoaded', function () {
  setFooterYear();
  initScrollProgressBar();
  initNavbarScrollState();
  initMobileNavToggle();
  initActiveNavLinkOnScroll();
  initScrollRevealAnimations();
  initHeroRoleTyping();
  initHeroCodeTyping();
  initProjectFilters();
  initBackToTopButton();
});

/* ---------------------------------------------------------------
   1. FOOTER YEAR
   Puts the current year into the footer automatically so it never
   goes out of date.
--------------------------------------------------------------- */
function setFooterYear() {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

/* ---------------------------------------------------------------
   2. SCROLL PROGRESS BAR
   Fills the thin bar at the very top of the page based on how far
   the user has scrolled through the document.
--------------------------------------------------------------- */
function initScrollProgressBar() {
  const progressBar = document.getElementById('scrollProgress');
  if (!progressBar) return;

  window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = scrollPercent + '%';
  });
}

/* ---------------------------------------------------------------
   3. NAVBAR BACKGROUND ON SCROLL
   Adds a class once the user scrolls past the hero so the navbar
   gets a solid, blurred background instead of staying transparent.
--------------------------------------------------------------- */
function initNavbarScrollState() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  });
}

/* ---------------------------------------------------------------
   4. MOBILE NAV TOGGLE
   Opens and closes the mobile menu when the hamburger icon is
   tapped, and closes it again after a link is chosen.
--------------------------------------------------------------- */
function initMobileNavToggle() {
  const toggleBtn = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('is-open');
    toggleBtn.classList.toggle('is-open', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close the menu whenever a nav link is clicked.
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('is-open');
      toggleBtn.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', false);
    });
  });
}

/* ---------------------------------------------------------------
   5. ACTIVE NAV LINK ON SCROLL
   Highlights the nav link for whichever section is currently in
   view, so the user always knows where they are on the page.
--------------------------------------------------------------- */
function initActiveNavLinkOnScroll() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            const linkTarget = link.getAttribute('href').replace('#', '');
            link.classList.toggle('is-active', linkTarget === id);
          });
        }
      });
    },
    { rootMargin: '-45% 0px -45% 0px' } // triggers when a section is near the middle of the screen
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
}

/* ---------------------------------------------------------------
   6. SCROLL REVEAL ANIMATIONS
   Any element with the ".reveal" class fades and slides into view
   the first time it enters the viewport.
--------------------------------------------------------------- */
function initScrollRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
          // Small stagger so grids of cards animate in one after another.
          setTimeout(function () {
            entry.target.classList.add('is-visible');
          }, index * 60);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach(function (el) {
    observer.observe(el);
  });
}

/* ---------------------------------------------------------------
   7. HERO ROLE TYPING EFFECT
   Cycles through a list of roles/titles in the hero heading,
   typing each one out and then deleting it before moving to the
   next, like a terminal typing animation.
--------------------------------------------------------------- */
function initHeroRoleTyping() {
  const roleTextEl = document.getElementById('roleText');
  if (!roleTextEl) return;

  const roles = [
    'interfaces',
    'web apps',
    'clean UI',
    'my DSA skills'
  ];

  let roleIndex = 0;   // which word we're on
  let charIndex = 0;   // how many characters of that word are shown
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    roleTextEl.textContent = currentRole.substring(0, charIndex);

    let typingSpeed = isDeleting ? 45 : 90;

    if (!isDeleting && charIndex === currentRole.length) {
      // Full word typed — pause, then start deleting.
      typingSpeed = 1400;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Word fully deleted — move to the next one.
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ---------------------------------------------------------------
   8. HERO CODE WINDOW TYPING EFFECT
   Types out a short, real code snippet inside the hero's "code
   editor" mockup, one character at a time, then loops.
--------------------------------------------------------------- */
function initHeroCodeTyping() {
  const codeEl = document.getElementById('codeTyped');
  if (!codeEl) return;

  const snippet =
    'const bhoomi = {\n' +
    '  role: "Software Engineering Intern",\n' +
    '  university: "DTU, 3rd Year",\n' +
    '  languages: ["C++", "JavaScript"],\n' +
    '  currentlyLearning: ["DSA", "Backend"],\n' +
    '  status: "open to internships"\n' +
    '};';

  let i = 0;

  function typeChar() {
    if (i <= snippet.length) {
      codeEl.textContent = snippet.substring(0, i);
      i++;
      setTimeout(typeChar, 22);
    } else {
      // Pause at the end, then retype from scratch for a subtle loop.
      setTimeout(function () {
        i = 0;
        typeChar();
      }, 3200);
    }
  }

  typeChar();
}

/* ---------------------------------------------------------------
   9. PROJECT FILTERING
   Lets the user filter the project grid by category (All, Web
   Apps, Hackathon, Games) using the data-filter / data-category
   attributes set in the HTML.
--------------------------------------------------------------- */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const selectedFilter = button.getAttribute('data-filter');

      // Update which button looks active.
      filterButtons.forEach(function (btn) {
        btn.classList.remove('is-active');
      });
      button.classList.add('is-active');

      // Show or hide each project card based on its category.
      projectCards.forEach(function (card) {
        const cardCategory = card.getAttribute('data-category');
        const shouldShow = selectedFilter === 'all' || selectedFilter === cardCategory;
        card.classList.toggle('is-hidden', !shouldShow);
      });
    });
  });
}

/* ---------------------------------------------------------------
   10. BACK TO TOP BUTTON
   Shows a small floating button once the user scrolls down the
   page, and scrolls smoothly back to the top when clicked.
--------------------------------------------------------------- */
function initBackToTopButton() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 600) {
      backToTopBtn.classList.add('is-visible');
    } else {
      backToTopBtn.classList.remove('is-visible');
    }
  });

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}