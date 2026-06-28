// ===========================
// MOBILE MENU TOGGLE
// ===========================
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  // Close nav when a link is clicked on mobile
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
    });
  });

  // Mobile dropdown toggle (tap)
  mainNav.querySelectorAll('.has-dropdown > .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 640) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });
}

// ===========================
// ACCORDION
// ===========================
document.querySelectorAll('.accordion-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.accordion-item');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));

    // Toggle clicked
    if (!isOpen) {
      item.classList.add('open');
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 90;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// ===========================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ===========================
// FADE-IN ON SCROLL (Intersection Observer)
// ===========================
const fadeTargets = document.querySelectorAll('.about-block, .aim-card, .accordion-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===========================
// SUB-TABS INTERACTIVE LOGIC
// ===========================
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const tabContainer = btn.closest('.tab-container');
    const tabId = btn.getAttribute('data-tab');

    // Remove active class from buttons and panels
    tabContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    tabContainer.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    // Set active class
    btn.classList.add('active');
    const targetContent = tabContainer.querySelector(`#${tabId}`);
    if (targetContent) {
      targetContent.classList.add('active');
    }
  });
});

// ===========================
// LIGHTBOX MODAL GALLERY
// ===========================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

if (lightbox && lightboxImg && lightboxCaption) {
  document.addEventListener('click', (e) => {
    const galleryItem = e.target.closest('.gallery-item');
    if (galleryItem) {
      const img = galleryItem.querySelector('img');
      const captionText = galleryItem.getAttribute('data-caption') || img.alt;
      
      lightboxImg.src = img.src;
      lightboxCaption.textContent = captionText;
      lightbox.classList.add('open');
    }
  });

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    setTimeout(() => {
      if (!lightbox.classList.contains('open')) {
        lightboxImg.src = '';
        lightboxCaption.textContent = '';
      }
    }, 300);
  };

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
}

