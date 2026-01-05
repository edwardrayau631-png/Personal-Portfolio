/* ===== NAV SMOOTH SCROLL + ACTIVE LINK ===== */
const navLinks = document.querySelectorAll('.nav-links a');
const sections = Array.from(document.querySelectorAll('section'));

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

window.addEventListener('scroll', () => {
  const fromTop = window.scrollY + 100;

  sections.forEach(section => {
    const id = '#' + section.id;
    const nav = document.querySelector(`.nav-links a[href="${id}"]`);
    if (!nav) return;
    if (
      section.offsetTop <= fromTop &&
      (section.offsetTop + section.offsetHeight) > fromTop
    ) {
      navLinks.forEach(a => a.classList.remove('active'));
      nav.classList.add('active');
    }
  });
});

/* ===== SCROLL PROGRESS BAR ===== */
const progressBar = document.querySelector('.scroll-progress-bar');
window.addEventListener('scroll', () => {
  if (!progressBar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${scrolled}%`;
});

/* ===== TYPING EFFECT ===== */
(function typingEffect(){
  const el = document.querySelector('.typing');
  if (!el) return;
  const roles = ['Developer', 'IT Support Technician', 'Help Desk Officer'];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type(){
    const current = roles[roleIndex];

    if (!deleting){
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length){
        deleting = true;
        return setTimeout(type, 1200);
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0){
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        return setTimeout(type, 300);
      }
    }
    setTimeout(type, deleting ? 40 : 80);
  }

  setTimeout(type, 600);
})();

/* ===== FADE-IN ON SCROLL ===== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.18 });

document
  .querySelectorAll(
    '.fade-up, .fade-left, .fade-right, ' +
    '.fade-up-delay, .fade-up-delay2, .fade-up-delay3, .fade-up-delay4, .fade-up-delay5, ' +
    '.fade-left-delay, .fade-right-delay'
  )
  .forEach(el => observer.observe(el));

/* ===== SKILL BARS ANIMATION ===== */
const skillsSection = document.querySelector('#skills');
const skillFills = document.querySelectorAll('.skill-fill');

if (skillsSection){
  const skillsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        skillFills.forEach(bar => {
          bar.style.width = bar.dataset.skill || '80%';
        });
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  skillsObserver.observe(skillsSection);
}

/* ===== THEME TOGGLE ===== */
const themeBtn = document.querySelector('.theme-toggle');
const body = document.body;

function setTheme(theme){
  if (theme === 'light'){
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
    themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
    themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
  }
  localStorage.setItem('theme', theme);
}

const storedTheme = localStorage.getItem('theme');
setTheme(storedTheme === 'light' ? 'light' : 'dark');

if (themeBtn){
  themeBtn.addEventListener('click', () => {
    const isLight = body.classList.contains('light-theme');
    setTheme(isLight ? 'dark' : 'light');
  });
}

/* ===== HERO PARALLAX (small scroll effect) ===== */
const heroImgWrap = document.querySelector('.hero-img-wrap');

window.addEventListener('scroll', () => {
  if (!heroImgWrap) return;
  const offset = window.scrollY * 0.04;
  heroImgWrap.style.transform = `translateX(-20px) translateY(${offset}px)`;
});

/* ===== CONTACT FORM DEMO ===== */
const contactForm = document.querySelector('#contact form');
if (contactForm){
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    if (!btn) return;
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sent!';
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = original;
    }, 1400);
  });
}

/* ===== PROJECT MODAL LOGIC ===== */
const modal = document.getElementById('project-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalLive = document.getElementById('modal-live');
const modalGithub = document.getElementById('modal-github');

const projectData = {
  project1: {
    title: 'Currency Exchange Rate Calculator',
    desc: 'A real-time currency converter built using a public exchange-rate API with a clean and simple UI.',
    img: 'https://via.placeholder.com/800x450?text=Currency+Exchange+App',
    live: 'https://currencyexchangeratecalculator.tiiny.site/',
    github: '#'
  },
  project2: {
    title: 'IT Help Desk Application (In Progress)',
    desc: 'An internal IT ticketing and staff request tool to track and manage support issues across teams.',
    img: 'https://via.placeholder.com/800x450?text=Help+Desk+App',
    live: '#',
    github: '#'
  },
  project3: {
    title: 'Attendance Application (In Progress)',
    desc: 'A web-based attendance tracking app with basic logging and reporting for teams or classrooms.',
    img: 'https://via.placeholder.com/800x450?text=Attendance+App',
    live: '#',
    github: '#'
  }
};

document.querySelectorAll('.project-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.project;
    const data = projectData[id];
    if (!data) return;

    modalImg.src = data.img;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalLive.href = data.live;
    modalGithub.href = data.github;

    modal.style.display = 'flex';
  });
});

document.querySelector('.modal-close')?.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal?.addEventListener('click', e => {
  if (e.target === modal){
    modal.style.display = 'none';
  }
});

/* ===== 3D TILT EFFECT FOR PROJECT CARDS ===== */
document.querySelectorAll('.project-tilt').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / 20);
    const rotateY = (x / 20);
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
});