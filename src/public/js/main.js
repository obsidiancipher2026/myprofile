document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --- Theme Toggle ---
  var html = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');
  var themeToggleMobile = document.getElementById('themeToggleMobile');
  var themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
  var themeIconMobile = themeToggleMobile ? themeToggleMobile.querySelector('i') : null;
  var themeTextMobile = themeToggleMobile ? themeToggleMobile.querySelector('span') : null;

  function getTheme() { return html.getAttribute('data-theme') || 'dark'; }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    var isDark = theme === 'dark';
    if (themeIcon) {
      themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    }
    if (themeIconMobile) {
      themeIconMobile.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    }
    if (themeTextMobile) {
      themeTextMobile.textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }
  }

  function toggleTheme() {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

  // Set initial icon state
  var initialTheme = getTheme();
  if (themeIcon) themeIcon.className = initialTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  if (themeIconMobile) themeIconMobile.className = initialTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  if (themeTextMobile) themeTextMobile.textContent = initialTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';

  // --- Mobile Nav ---
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  var navBackdrop = document.getElementById('navBackdrop');

  function toggleNav(open) {
    if (navToggle) navToggle.classList.toggle('active', open);
    if (navLinks) navLinks.classList.toggle('open', open);
    if (navBackdrop) navBackdrop.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      toggleNav(!navLinks.classList.contains('open'));
    });
    if (navBackdrop) {
      navBackdrop.addEventListener('click', function () { toggleNav(false); });
    }
    // Close on nav link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { toggleNav(false); });
    });
    // Close on mobile theme toggle click
    if (themeToggleMobile) {
      themeToggleMobile.addEventListener('click', function () { toggleNav(false); });
    }
  }

  // --- Particle Network Canvas ---
  var canvas = document.getElementById('particle-canvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var particleCount = 60;
    var mouseX = -1000;
    var mouseY = -1000;

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    for (var i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 2 + 1
      });
    }

    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseleave', function () {
      mouseX = -1000;
      mouseY = -1000;
    });

    function getAccentColor() {
      var style = getComputedStyle(document.documentElement);
      return style.getPropertyValue('--accent').trim() || '#00d4ff';
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var accent = getAccentColor();

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse interaction
        var dx = mouseX - p.x;
        var dy = mouseY - p.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.x -= dx * 0.005;
          p.y -= dy * 0.005;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.5;
        ctx.fill();

        // Draw connections
        for (var j = i + 1; j < particles.length; j++) {
          var p2 = particles[j];
          var dx2 = p.x - p2.x;
          var dy2 = p.y - p2.y;
          var dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist2 < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = accent;
            ctx.globalAlpha = (1 - dist2 / 120) * 0.2;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // --- Scroll Reveal Animations ---
  var revealEls = document.querySelectorAll('[data-reveal]');

  var staggerEls = document.querySelectorAll('[data-stagger]');

  function checkReveal() {
    var windowH = window.innerHeight;
    revealEls.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < windowH * 0.88) {
        el.classList.add('revealed');
      }
    });
    staggerEls.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < windowH * 0.88) {
        el.classList.add('revealed');
      }
    });
  }

  if (revealEls.length || staggerEls.length) {
    checkReveal();
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('resize', checkReveal);
  }

  // --- Project Modal ---
  var modal = document.getElementById('projectModal');
  var modalBody = document.getElementById('modalBody');
  var modalClose = document.querySelector('.modal-close');

  if (modal && modalBody) {
    // Project card clicks
    document.querySelectorAll('.project-card[data-id]').forEach(function (card) {
      card.addEventListener('click', function () {
        openProjectModal(this.getAttribute('data-id'));
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  function openProjectModal(id) {
    if (!modal || !modalBody) return;
    modal.classList.add('active');
    modalBody.innerHTML = '<div class="modal-loader"><i class="fas fa-spinner fa-spin"></i></div>';
    fetch('/projects/' + id)
      .then(function (r) {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then(function (p) {
        var techHtml = '';
        if (p.techStack) {
          p.techStack.split(',').forEach(function (t) {
            techHtml += '<span class="tag">' + t.trim() + '</span>';
          });
        }
        modalBody.innerHTML =
          (p.imageUrl ? '<img src="' + p.imageUrl + '" alt="' + p.title + '" class="modal-project-image">' : '') +
          '<h2 class="modal-project-title">' + p.title + '</h2>' +
          '<p class="modal-project-desc">' + p.description + '</p>' +
          (techHtml ? '<div class="modal-project-tech">' + techHtml + '</div>' : '') +
          (p.projectUrl ? '<a href="' + p.projectUrl + '" target="_blank" rel="noopener" class="btn btn-outline modal-project-link"><i class="fas fa-external-link-alt"></i> View Project</a>' : '');
      })
      .catch(function () {
        modalBody.innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><p>Failed to load project details.</p></div>';
      });
  }

  function closeModal() {
    if (modal) modal.classList.remove('active');
  }
});
