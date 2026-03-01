/* ============================================================
   POPS — Global JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Scroll-based header shadow ----
  const header = document.querySelector('.site-header');
  const scrollProgress = document.querySelector('.scroll-progress');
  const backToTop = document.querySelector('.back-to-top');

  function onScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Header shadow
    if (header) {
      header.classList.toggle('scrolled', scrollY > 10);
    }

    // Scroll progress bar
    if (scrollProgress && docHeight > 0) {
      scrollProgress.style.width = (scrollY / docHeight * 100) + '%';
    }

    // Back to top
    if (backToTop) {
      backToTop.classList.toggle('visible', scrollY > 600);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Mobile menu toggle ----
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Intersection Observer reveal ----
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  // ---- FAQ accordion ----
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      faqItems.forEach(fi => {
        fi.classList.remove('open');
        const a = fi.querySelector('.faq-answer');
        if (a) a.style.maxHeight = null;
      });

      // Open clicked one (if wasn't open)
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ---- Donate amount selection ----
  const donateAmounts = document.querySelectorAll('.donate-amount');
  const customInput = document.querySelector('#custom-amount');

  donateAmounts.forEach(btn => {
    btn.addEventListener('click', () => {
      donateAmounts.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      if (customInput) customInput.value = '';
    });
  });

  if (customInput) {
    customInput.addEventListener('focus', () => {
      donateAmounts.forEach(b => b.classList.remove('selected'));
    });
  }

  // ---- Simple form submit handlers (placeholder) ----
  document.querySelectorAll('form[data-action]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn ? btn.textContent : '';

      if (btn) {
        btn.textContent = 'Submitted!';
        btn.style.background = '#16a34a';
        btn.style.borderColor = '#16a34a';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.borderColor = '';
        }, 2500);
      }

      form.reset();
    });
  });

  // ---- Stagger animation on page load ----
  document.querySelectorAll('.stagger-children').forEach(parent => {
    const children = parent.children;
    Array.from(children).forEach((child, i) => {
      child.style.animationDelay = (i * 0.08) + 's';
    });
  });
});
