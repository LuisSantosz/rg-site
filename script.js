/* =========================================================
   RENAN GONÇALVES — SCRIPT
   ========================================================= */

/**
 * CONFIGURAÇÃO
 * Troque por um número real no formato internacional, somente dígitos.
 * Exemplo: 5511999999999
 */
const RENAN_WHATSAPP = "5511976260404";

const DEFAULT_MESSAGE =
  "Olá Renan! Conheci seu trabalho pelo site e gostaria de conversar sobre uma estratégia para o meu negócio.";

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu a");
const cursorGlow = document.querySelector(".cursor-glow");
const toast = document.getElementById("toast");

// Header
const updateHeader = () => {
  header?.classList.toggle("scrolled", window.scrollY > 20);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

// Menu mobile
function closeMobileMenu() {
  mobileMenu?.classList.remove("open");
  mobileMenu?.setAttribute("aria-hidden", "true");
  menuButton?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
  if (menuButton) menuButton.querySelector("b").textContent = "+";
}

menuButton?.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  mobileMenu.setAttribute("aria-hidden", String(!isOpen));
  menuButton.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
  menuButton.querySelector("b").textContent = isOpen ? "×" : "+";
});

mobileLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));

// Mouse glow
window.addEventListener("pointermove", (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
}, { passive: true });

// Toast
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

// WhatsApp
function openWhatsApp(message = DEFAULT_MESSAGE) {
  if (!RENAN_WHATSAPP) {
    navigator.clipboard?.writeText(message).catch(() => {});
    showToast("Adicione o WhatsApp do Renan no script.js. A mensagem foi copiada.");
    return;
  }

  const url = `https://wa.me/${RENAN_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

document.querySelectorAll(".js-whatsapp").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openWhatsApp();
  });
});

// Reveal on scroll
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Dashboard line animation
const dashboard = document.querySelector(".dashboard");

if (dashboard) {
  const dashboardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) dashboard.classList.add("in-view");
      });
    },
    { threshold: 0.35 }
  );

  dashboardObserver.observe(dashboard);
}

// Method scroll progress
const method = document.querySelector(".method");
const methodSteps = document.querySelector(".method-steps");

function updateMethodProgress() {
  if (!method || !methodSteps) return;

  const rect = methodSteps.getBoundingClientRect();
  const viewport = window.innerHeight;
  const start = viewport * 0.55;
  const total = rect.height;
  const traveled = start - rect.top;
  const progress = Math.max(0, Math.min(1, traveled / total));

  methodSteps.style.setProperty("--method-progress", `${progress * 100}%`);
}

window.addEventListener("scroll", updateMethodProgress, { passive: true });
window.addEventListener("resize", updateMethodProgress);
updateMethodProgress();

// Cases
const caseModal = document.getElementById("caseModal");
const closeCase = document.getElementById("closeCase");

function setModalState(modal, open) {
  if (!modal) return;
  modal.classList.toggle("open", open);
  modal.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("modal-open", open);
}

document.querySelectorAll(".js-case").forEach((button) => {
  button.addEventListener("click", () => setModalState(caseModal, true));
});

closeCase?.addEventListener("click", () => setModalState(caseModal, false));

caseModal?.addEventListener("click", (event) => {
  if (event.target === caseModal) setModalState(caseModal, false);
});

// Raio-X Digital
const questions = [
  {
    key: "instagram",
    title: "Sua empresa possui Instagram profissional?",
    options: ["Sim", "Não"]
  },
  {
    key: "frequencia",
    title: "Com que frequência vocês publicam?",
    options: ["Todos os dias", "Algumas vezes por semana", "Raramente", "Não publicamos"]
  },
  {
    key: "anuncios",
    title: "Sua empresa já investe em anúncios?",
    options: ["Sim", "Não", "Já investiu"]
  },
  {
    key: "objetivo",
    title: "Qual é o principal objetivo da sua empresa hoje?",
    options: ["Vender mais", "Gerar leads", "Ganhar visibilidade", "Crescer no Instagram"]
  }
];

const quizModal = document.getElementById("quizModal");
const startQuiz = document.getElementById("startQuiz");
const closeQuiz = document.getElementById("closeQuiz");
const quizCounter = document.getElementById("quizCounter");
const quizProgressBar = document.getElementById("quizProgressBar");
const quizTitle = document.getElementById("quizTitle");
const quizOptions = document.getElementById("quizOptions");
const quizContent = document.querySelector(".quiz-content");
const quizResult = document.getElementById("quizResult");
const quizSummary = document.getElementById("quizSummary");
const sendQuizWhatsApp = document.getElementById("sendQuizWhatsApp");

let currentQuestion = 0;
let answers = {};

function renderQuestion() {
  const item = questions[currentQuestion];
  if (!item) return finishQuiz();

  quizCounter.textContent = `${String(currentQuestion + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;
  quizProgressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  quizTitle.textContent = item.title;
  quizOptions.innerHTML = "";

  item.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.type = "button";
    button.textContent = option;

    button.addEventListener("click", () => {
      answers[item.key] = option;
      currentQuestion += 1;
      renderQuestion();
    });

    quizOptions.appendChild(button);
  });
}

function startQuizFlow() {
  currentQuestion = 0;
  answers = {};
  quizContent.hidden = false;
  quizResult.hidden = true;
  setModalState(quizModal, true);
  renderQuestion();
}

function finishQuiz() {
  quizContent.hidden = true;
  quizResult.hidden = false;
  quizCounter.textContent = "04 / 04";
  quizProgressBar.style.width = "100%";

  const objective = answers.objetivo || "melhorar seus resultados";
  const ads = answers.anuncios || "não informado";
  const frequency = answers.frequencia || "não informado";

  quizSummary.textContent =
    `Seu principal objetivo é "${objective}". Frequência atual: "${frequency}". ` +
    `Situação com anúncios: "${ads}". Este é um diagnóstico inicial; uma análise real ` +
    `precisa considerar perfil, mercado, histórico e objetivos do negócio.`;
}

function buildQuizMessage() {
  return [
    "Olá Renan! Fiz o Raio-X Digital pelo seu site e gostaria de conversar sobre uma estratégia para o meu negócio.",
    "",
    `Instagram profissional: ${answers.instagram || "-"}`,
    `Frequência de publicações: ${answers.frequencia || "-"}`,
    `Já investe em anúncios: ${answers.anuncios || "-"}`,
    `Principal objetivo: ${answers.objetivo || "-"}`
  ].join("\n");
}

startQuiz?.addEventListener("click", startQuizFlow);
closeQuiz?.addEventListener("click", () => setModalState(quizModal, false));

quizModal?.addEventListener("click", (event) => {
  if (event.target === quizModal) setModalState(quizModal, false);
});

sendQuizWhatsApp?.addEventListener("click", () => openWhatsApp(buildQuizMessage()));

// ESC fecha modais/menu
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeMobileMenu();
  setModalState(quizModal, false);
  setModalState(caseModal, false);
});
