document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navBackdrop = document.getElementById('navBackdrop');
  function toggleNav(open) {
    navToggle.classList.toggle('active', open);
    navLinks.classList.toggle('open', open);
    if (navBackdrop) navBackdrop.classList.toggle('open', open);
  }
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      toggleNav(!navLinks.classList.contains('open'));
    });
    if (navBackdrop) {
      navBackdrop.addEventListener('click', function () {
        toggleNav(false);
      });
    }
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        toggleNav(false);
      }
    });
  }

  // Project modal
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.querySelector('.modal-close');

  if (modal && modalBody) {
    // Gallery detail buttons
    document.querySelectorAll('.gallery-details-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const id = this.getAttribute('data-id');
        openProjectModal(id);
      });
    });

    // Gallery item click
    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        openProjectModal(id);
      });
    });

    // Project card click
    document.querySelectorAll('.project-card').forEach(function (card) {
      card.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        openProjectModal(id);
      });
    });

    // Close modal
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
    if (modal) {
      modal.classList.remove('active');
    }
  }

  // Skill progress bar animation on scroll
  var skillFill = document.querySelectorAll('.skill-card-fill');
  if (skillFill.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var level = el.getAttribute('data-level');
          if (level) {
            el.style.width = level + '%';
            el.classList.add('animated');
          }
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    skillFill.forEach(function (el) {
      el.style.width = '0%';
      observer.observe(el);
    });
  }

  // Nav active state based on scroll
  var sections = document.querySelectorAll('.section[id]');
  if (sections.length) {
    window.addEventListener('scroll', function () {
      var scrollPos = window.scrollY + 200;
      sections.forEach(function (sec) {
        var top = sec.offsetTop;
        var height = sec.offsetHeight;
        var id = sec.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
          document.querySelectorAll('.nav-links a').forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) link.classList.add('active');
          });
        }
      });
    });
  }
});
