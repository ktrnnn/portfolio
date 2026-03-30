// ============================================
// KATRINE VA PORTFOLIO – script.js
// ============================================

// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  setTimeout(() => {
    cursorTrail.style.left = e.clientX + 'px';
    cursorTrail.style.top = e.clientY + 'px';
  }, 80);
});

// Hide cursor on mobile
if ('ontouchstart' in window) {
  cursor.style.display = 'none';
  cursorTrail.style.display = 'none';
  document.body.style.cursor = 'auto';
}

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── MOBILE MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

// ── SCROLL REVEAL ──
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger items in the same parent grid
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
      const index = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ── TRIGGER HERO REVEALS ON LOAD ──
window.addEventListener('load', () => {
  const heroReveals = document.querySelectorAll('.hero .reveal');
  heroReveals.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 300 + i * 180);
  });
});

// ── ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--gold)';
    }
  });
});

// ── EMAILJS SETUP ──
// Replace these 3 values after you sign up at emailjs.com
const EMAILJS_PUBLIC_KEY   = 'gVkkxNPI6akGp7Mft';     // e.g. 'abc123XYZ'
const EMAILJS_SERVICE_ID   = 'service_ypdsiso';     // e.g. 'service_xxxxxxx'
const EMAILJS_TEMPLATE_ID  = 'YOUR_TEMPLATE_ID';   // e.g. 'template_xxxxxxx'

emailjs.init(EMAILJS_PUBLIC_KEY);

// ── CONTACT FORM (EmailJS) ──
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const btnSpan = btn.querySelector('span');
    btnSpan.textContent = 'Sending...';
    btn.disabled = true;

    // Collect form values
    const templateParams = {
      name:    contactForm.querySelector('[name="name"]').value,
      email:   contactForm.querySelector('[name="email"]').value,
      subject:      contactForm.querySelector('[name="subject"]').value,
      message:      contactForm.querySelector('[name="message"]').value,

    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
      formMsg.className = 'form-message success';
      formMsg.textContent = '✓ Message sent! I\'ll get back to you soon.';
      contactForm.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      formMsg.className = 'form-message error';
      formMsg.textContent = '✗ Could not send. Please email me directly at delacruzkatrine0310@gmail.com';
    }

    btnSpan.textContent = 'Send Message';
    btn.disabled = false;
  });
}

// ── SMOOTH SCROLL FOR ALL INTERNAL LINKS ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
