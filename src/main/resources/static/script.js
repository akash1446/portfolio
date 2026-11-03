/* ---------- DATA (edit your content here) ---------- */
const GH = "https://github.com/akash1446";

const focus = [
  "Core Java",
  "Advanced Java",
  "Object-Oriented Programming",
  "Spring Core",
  "Spring Boot",
  "SQL",
  "React",
  "Full Stack Development",
];

const skills = [
  ["Java", 90],
  ["HTML", 95],
  ["CSS", 90],
  ["JavaScript", 80],
  ["React", 75],
  ["Oracle SQL", 80],
  ["Spring Boot With AI", 90],
  ["Linux", 70],
];
const moreSkills = ["JDBC", "Hibernate", "Git & GitHub"];

// Replace repo / demo with the exact links for each project. Leave demo as '' to hide the button.
const projects = [
  {
    img: "Images/My Portfolio.jpeg",
    alt: "Portfolio",
    title: "Portfolio Website",
    repo: GH,
    demo: "",
    desc: "Responsive and interactive website built to showcase skills and projects with modern UI.",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    img: "Images/weather.png",
    alt: "Weather App",
    title: "Real-Time Weather Forecast Application",
    repo: GH,
    demo: "",
    desc: "Developed a responsive weather application using OpenWeather API to display real-time temperature, humidity, wind speed, weather conditions, and location-based forecasts.",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    img: "Images/FoodApp.png",
    alt: "Food Zonie",
    title: "Food Zonie - Online Food Ordering App",
    repo: GH,
    demo: "",
    desc: "Developed a modern food ordering web application with category-based menu browsing, search functionality, cart management, and responsive UI for better user experience.",
    tech: ["HTML", "CSS", "React", "JavaScript"],
  },
];

const certs = [
  ["Certified Java Developer", "FLM", "Images/java.jpg"],
  ["Certified Linux", "FLM", "Images/Linux.jpg"],
  ["Certified SQL Developer", "BlackBucks", "Images/SQL.png"],
];

const dockItems = [
  ["home", "Home", "🏠"],
  ["about", "About", "👤"],
  ["skills", "Skills", "⚡"],
  ["projects", "Projects", "💻"],
  ["experience", "Experience", "📝"],
  ["certifications", "Certifications", "🎓"],
  ["education", "Education", "📅"],
  ["contact", "Contact", "✉️"],
];

/* ---------- RENDER (small reusable templates) ---------- */
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) =>
  String(s).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );
const chip = (t) => `<span class="chip">${esc(t)}</span>`;

$("#focus").innerHTML = focus.map(chip).join("");
$("#more-skills").innerHTML = moreSkills.map(chip).join("");

$("#skill-list").innerHTML = skills
  .map(
    ([n, p]) => `
  <div class="skill-item fade-in">
    <div class="skill-header"><span>${esc(n)}</span><span class="skill-pct">${p}%</span></div>
    <div class="bar-track"><div class="bar-fill" data-w="${p}"></div></div>
  </div>`,
  )
  .join("");

$("#project-list").innerHTML = projects
  .map(
    (p) => `
  <article class="project-card fade-in">
    <div class="tb"><i class="r"></i><i class="y"></i><i class="g"></i><span>${esc(p.alt)}</span></div>
    <div class="project-img"><img src="${esc(p.img)}" alt="${esc(p.alt)}" loading="lazy" onerror="this.remove()" /></div>
    <div class="project-body">
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.desc)}</p>
      <div class="tech-tags">${p.tech.map((t) => `<span class="tech-tag">${esc(t)}</span>`).join("")}</div>
      <div class="proj-links">
        <a class="btn" href="${esc(p.repo)}" target="_blank" rel="noopener">GitHub</a>
        ${p.demo ? `<a class="btn btn-primary" href="${esc(p.demo)}" target="_blank" rel="noopener">Live demo</a>` : ""}
      </div>
    </div>
  </article>`,
  )
  .join("");

$("#cert-list").innerHTML = certs
  .map(
    ([n, by, href]) => `
  <div class="cert-item fade-in">
    <div><h4>${esc(n)}</h4><span>${esc(by)}</span></div>
    <a href="${esc(href)}" target="_blank" rel="noopener" class="cert-link">View ↗</a>
  </div>`,
  )
  .join("");

$("#dock").innerHTML = dockItems
  .map(
    ([id, label, icon]) =>
      `<a href="#${id}" data-id="${id}" aria-label="${label}">${icon}<em>${label}</em></a>`,
  )
  .join("");

/* ---------- TYPED EFFECT (preserved) ---------- */
const phrases = [
  "Building full-stack apps",
  "Writing clean Java code",
  "Solving real problems",
  "Learning every day",
];
let pi = 0,
  ci = 0,
  deleting = false;
const typedEl = $("#typed-el");
function type() {
  const cur = phrases[pi];
  if (!deleting) {
    typedEl.textContent = cur.slice(0, ++ci);
    if (ci === cur.length) {
      deleting = true;
      setTimeout(type, 1400);
      return;
    }
  } else {
    typedEl.textContent = cur.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 40 : 80);
}
setTimeout(type, 800);

/* ---------- REVEAL + SKILL BARS (preserved behaviour) ---------- */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("visible");
      const bar = e.target.querySelector(".bar-fill");
      if (bar) bar.style.width = bar.dataset.w + "%";
      io.unobserve(e.target);
    });
  },
  { threshold: 0.15 },
);
document.querySelectorAll(".fade-in").forEach((el) => io.observe(el));

/* ---------- THEME ---------- */
const root = document.documentElement;
let saved = null;
try {
  saved = localStorage.getItem("theme");
} catch (e) {}
root.dataset.theme =
  saved ||
  (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
$("#theme").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try {
    localStorage.setItem("theme", root.dataset.theme);
  } catch (e) {}
});

/* ---------- CLOCK ---------- */
function tick() {
  const d = new Date();
  const t = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  $("#clock").textContent =
    d.toLocaleDateString([], {
      weekday: "short",
      day: "numeric",
      month: "short",
    }) +
    "  " +
    t;
  $("#w-time").textContent = t;
  $("#w-date").textContent = d.toLocaleDateString([], {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
tick();
setInterval(tick, 30000);

/* ---------- WINDOW CONTROLS (red/yellow minimise, green restores) ---------- */
document.addEventListener("click", (e) => {
  const dot = e.target.closest(".tb i");
  const win = dot && dot.closest(".win");
  if (!win) return;
  if (dot.classList.contains("g")) win.classList.remove("min");
  else win.classList.toggle("min");
});

/* ---------- DOCK MAGNIFY + SCROLL SPY ---------- */
const dock = $("#dock"),
  icons = [...dock.children];
if (matchMedia("(hover:hover)").matches) {
  dock.addEventListener("mousemove", (e) =>
    icons.forEach((a) => {
      const r = a.getBoundingClientRect();
      const d = Math.abs(e.clientX - (r.left + r.width / 2));
      a.style.setProperty("--s", Math.max(1, 1.6 - d / 110).toFixed(2));
    }),
  );
  dock.addEventListener("mouseleave", () =>
    icons.forEach((a) => a.style.setProperty("--s", 1)),
  );
}
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting)
        icons.forEach((a) =>
          a.classList.toggle("active", a.dataset.id === e.target.id),
        );
    });
  },
  { rootMargin: "-40% 0px -50% 0px" },
);
dockItems.forEach(([id]) => {
  const s = document.getElementById(id);
  if (s) spy.observe(s);
});

/* ---------- CONTACT FORM -> Spring Boot API -> database + email ---------- */
const API_BASE = ""; // '' = same server (http://localhost:8080). Use 'http://localhost:8080' with Live Server.
const WHATSAPP_NUMBER = ""; // country code + number, digits only, e.g. '919876543210'

const waBtn = $("#wa-btn");
if (WHATSAPP_NUMBER) {
  waBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Akash, I saw your portfolio and would like to connect.")}`;
  waBtn.hidden = false;
}

$("#contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target,
    note = $("#form-note"),
    btn = form.querySelector("button");
  const f = Object.fromEntries(new FormData(form));
  btn.disabled = true;
  note.className = "";
  note.textContent = "Sending…";
  try {
    const res = await fetch(`${API_BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    });
    if (!res.ok) throw new Error(res.status);
    form.reset();
    note.textContent = "Thanks! Your message was sent. I’ll reply soon.";
  } catch (err) {
    note.className = "err";
    note.textContent =
      "Could not send right now. Please email me directly or try again.";
  } finally {
    btn.disabled = false;
  }
});

/* ---------- LOADER ---------- */
addEventListener("load", () =>
  setTimeout(() => $("#loader").classList.add("done"), 1200),
);
