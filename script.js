
    // Typed effect
    const phrases = ['Building full-stack apps', 'Writing clean Java code', 'Solving real problems', 'Learning every day'];
    let pi = 0, ci = 0, deleting = false;
    const el = document.getElementById('typed-el');
    function type() {
      const cur = phrases[pi];
      if (!deleting) {
        el.textContent = cur.slice(0, ci + 1);
        ci++;
        if (ci === cur.length) { deleting = true; setTimeout(type, 1400); return; }
      } else {
        el.textContent = cur.slice(0, ci - 1);
        ci--;
        if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
      }
      setTimeout(type, deleting ? 40 : 80);
    }
    setTimeout(type, 800);

    // Intersection observer for animations
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          // Animate skill bars
          const bar = e.target.querySelector('.bar-fill');
          if (bar) bar.style.width = bar.dataset.w + '%';
          // Also trigger bars in section
          e.target.closest('section')?.querySelectorAll('.bar-fill').forEach(b => {
            b.style.width = b.dataset.w + '%';
          });
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

    // Also observe skills section directly for bar animation
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      const sio = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            document.querySelectorAll('.bar-fill').forEach(b => {
              b.style.width = b.dataset.w + '%';
            });
          }
        });
      }, { threshold: 0.2 });
      sio.observe(skillsSection);
    }
  