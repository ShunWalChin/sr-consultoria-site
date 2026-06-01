// ============================================
// S&R CONSULTORIA — JAVASCRIPT COMPLETO
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // ===== NAVBAR SCROLL =====
  const header = document.querySelector('.site-header');
  if (header && !header.classList.contains('header-solid')) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ===== MOBILE MENU =====
  const toggle = document.querySelector('.navbar-toggle');
  const mobileMenu = document.querySelector('.navbar-mobile');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // ===== ACCORDION (Como funciona) =====
  document.querySelectorAll('.accordion-item').forEach(item => {
    const btn = item.querySelector('.accordion-header');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
        const icon = i.querySelector('.accordion-icon');
        if (icon) icon.textContent = '+';
        const b = i.querySelector('.accordion-header');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (!isActive) {
        item.classList.add('active');
        const icon = item.querySelector('.accordion-icon');
        if (icon) icon.textContent = '−';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ===== FAQ ACCORDION =====
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const answer = item.querySelector('.faq-answer');
      const icon = item.querySelector('.faq-icon');
      const isOpen = answer.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.querySelector('.faq-answer').classList.remove('open');
        const ic = i.querySelector('.faq-icon');
        if (ic) ic.textContent = '+';
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        answer.classList.add('open');
        if (icon) icon.textContent = '−';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ===== TEAM TABS =====
  document.querySelectorAll('.team-tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const member = this.dataset.member;
      document.querySelectorAll('.team-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.team-member-card').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      const card = document.getElementById(member);
      if (card) card.classList.add('active');
    });
  });

  // ===== CONTACT FORMS =====
  // Handler genérico para qualquer <form class="contact-form"> com feedback inline.
  document.querySelectorAll('.contact-form').forEach(form => {
    const feedback = form.querySelector('.form-feedback') || createFeedback(form);
    const submit = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      submit && submit.setAttribute('disabled', 'disabled');
      showFeedback(feedback, 'ok', 'Enviando sua mensagem...');

      // Em produção, troque por endpoint real (ex.: /api/contato.php).
      // Por enquanto, simulamos sucesso após 800ms para validação UX.
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        form.reset();
        showFeedback(feedback, 'ok', 'Mensagem enviada com sucesso! A equipe S&R retornará em breve.');
      } catch (error) {
        showFeedback(feedback, 'error', 'Não foi possível enviar agora. Tente novamente em instantes.');
      } finally {
        submit && submit.removeAttribute('disabled');
      }
    });
  });

  function createFeedback(form) {
    const node = document.createElement('div');
    node.className = 'form-feedback';
    node.setAttribute('role', 'status');
    node.setAttribute('aria-live', 'polite');
    form.appendChild(node);
    return node;
  }

  function showFeedback(node, type, message) {
    if (!node) return;
    node.className = `form-feedback is-visible is-${type === 'ok' ? 'ok' : 'error'}`;
    node.textContent = message;
  }

  // ===== SMOOTH ANCHOR LINKS (compensar navbar fixa) =====
  document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    const hashIndex = href.indexOf('#');
    const hash = href.substring(hashIndex);
    if (hash.length < 2) return;
    // Apenas trata âncoras locais (mesma página).
    if (href.startsWith('#') || href.startsWith(window.location.pathname + '#')) {
      anchor.addEventListener('click', function (event) {
        const target = document.querySelector(hash);
        if (!target) return;
        event.preventDefault();
        const headerOffset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });
        history.pushState(null, '', hash);
      });
    }
  });

});
