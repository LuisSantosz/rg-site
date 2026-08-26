/* =========================================================
   RENAN GONÇALVES — SITE ESTÁTICO
   HTML + CSS + JavaScript puro
   ========================================================= */

const RENAN_WHATSAPP = "5511976260404";
const DEFAULT_MESSAGE =
  "Olá Renan! Conheci seu trabalho pelo site e gostaria de conversar sobre uma estratégia para o meu negócio.";

function openWhatsApp(message = DEFAULT_MESSAGE) {
  const url = `https://wa.me/${RENAN_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

function updateHeader() {
  header?.classList.toggle("scrolled", window.scrollY > 6);
}

function closeMenu() {
  mobileMenu?.classList.remove("open");
  mobileMenu?.setAttribute("aria-hidden", "true");
  menuButton?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
  const icon = menuButton?.querySelector("b");
  if (icon) icon.textContent = "+";
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton?.addEventListener("click", () => {
  const isOpen = !mobileMenu?.classList.contains("open");
  mobileMenu?.classList.toggle("open", isOpen);
  mobileMenu?.setAttribute("aria-hidden", String(!isOpen));
  menuButton.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
  const icon = menuButton.querySelector("b");
  if (icon) icon.textContent = isOpen ? "×" : "+";
});

document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document
  .querySelectorAll(".header-cta, .mobile-menu-cta, .final-button, .footer-contact button")
  .forEach((button) => {
    button.addEventListener("click", () => openWhatsApp());
  });

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const dashboard = document.querySelector(".dashboard");
if (dashboard) {
  const dashboardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      });
    },
    { threshold: 0.25 },
  );
  dashboardObserver.observe(dashboard);
}

const methodSteps = document.querySelector(".method-steps");

function updateMethodProgress() {
  if (!methodSteps) return;
  const rect = methodSteps.getBoundingClientRect();
  const traveled = window.innerHeight * 0.55 - rect.top;
  const progress = Math.max(0, Math.min(1, traveled / rect.height));
  methodSteps.style.setProperty("--method-progress", `${progress * 100}%`);
}

window.addEventListener("scroll", updateMethodProgress, { passive: true });
window.addEventListener("resize", updateMethodProgress);
updateMethodProgress();

function setModalState(modal, open) {
  if (!modal) return;
  modal.classList.toggle("open", open);
  modal.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle(
    "modal-open",
    Boolean(document.querySelector(".quiz-modal.open, .case-modal.open")),
  );
}

const caseModal = document.querySelector(".case-modal");
const closeCaseButton = document.querySelector(".case-modal-close");

document.querySelectorAll(".text-link").forEach((button) => {
  button.addEventListener("click", () => setModalState(caseModal, true));
});

closeCaseButton?.addEventListener("click", () => setModalState(caseModal, false));
caseModal?.addEventListener("click", (event) => {
  if (event.target === caseModal) setModalState(caseModal, false);
});

document.querySelector(".case-modal-box .button-primary")?.addEventListener("click", () => {
  openWhatsApp(
    "Olá Renan! Vi os exemplos de resultado no seu site e quero entender qual estratégia faz sentido para o meu negócio.",
  );
});

const questions = [
  {
    key: "instagram",
    title: "Sua empresa possui Instagram profissional?",
    options: ["Sim", "Não"],
  },
  {
    key: "frequencia",
    title: "Com que frequência vocês publicam?",
    options: ["Todos os dias", "Algumas vezes por semana", "Raramente", "Não publicamos"],
  },
  {
    key: "anuncios",
    title: "Sua empresa já investe em anúncios?",
    options: ["Sim", "Não", "Já investiu"],
  },
  {
    key: "objetivo",
    title: "Qual é o principal objetivo da sua empresa hoje?",
    options: ["Vender mais", "Gerar leads", "Ganhar visibilidade", "Crescer no Instagram"],
  },
];

const quizModal = document.querySelector(".quiz-modal");
const quizShell = quizModal?.querySelector(".quiz-shell");
const quizCounter = quizModal?.querySelector(".quiz-progress > span");
const quizProgress = quizModal?.querySelector(".quiz-progress i");
const startQuizButton = document.querySelector(".diagnostic-start");
const closeQuizButton = document.querySelector(".quiz-close");

let currentQuestion = 0;
let answers = {};

function replaceQuizStage(className, content) {
  quizShell?.querySelector(".quiz-content, .quiz-result")?.remove();
  const stage = document.createElement("div");
  stage.className = className;
  stage.innerHTML = content;
  quizShell?.appendChild(stage);
  return stage;
}

function updateQuizProgress() {
  const shownIndex = Math.min(currentQuestion + 1, questions.length);
  if (quizCounter) quizCounter.textContent = `${String(shownIndex).padStart(2, "0")} / 04`;
  if (quizProgress) quizProgress.style.width = `${(shownIndex / questions.length) * 100}%`;
}

function buildQuizMessage() {
  return [
    "Olá Renan! Fiz o Raio-X Digital pelo seu site e gostaria de conversar sobre uma estratégia.",
    "",
    `Instagram profissional: ${answers.instagram || "-"}`,
    `Frequência de publicações: ${answers.frequencia || "-"}`,
    `Já investe em anúncios: ${answers.anuncios || "-"}`,
    `Principal objetivo: ${answers.objetivo || "-"}`,
  ].join("\n");
}

function finishQuiz() {
  currentQuestion = questions.length;
  updateQuizProgress();
  const objective = (answers.objetivo || "melhorar seus resultados").toLowerCase();
  const frequency = (answers.frequencia || "não informado").toLowerCase();
  const ads = (answers.anuncios || "não informado").toLowerCase();
  const stage = replaceQuizStage(
    "quiz-result",
    `<span>Diagnóstico inicial concluído.</span>
     <h2 id="quizTitle">Existe espaço para crescer.</h2>
     <p>Seu principal objetivo é ${objective}. Frequência atual: ${frequency}. Situação com anúncios: ${ads}. Este é um diagnóstico inicial; a conversa com o Renan transforma esse cenário em próximos passos.</p>
     <button class="button button-dark" type="button">Enviar para Renan pelo WhatsApp ↗</button>`,
  );
  stage.querySelector("button")?.addEventListener("click", () => openWhatsApp(buildQuizMessage()));
}

function renderQuestion() {
  const item = questions[currentQuestion];
  if (!item) return finishQuiz();
  updateQuizProgress();
  const stage = replaceQuizStage(
    "quiz-content",
    `<span class="quiz-kicker">Raio-X Digital</span>
     <h2 id="quizTitle">${item.title}</h2>
     <div class="quiz-options"></div>`,
  );
  const options = stage.querySelector(".quiz-options");
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
    options?.appendChild(button);
  });
}

function startQuiz() {
  currentQuestion = 0;
  answers = {};
  renderQuestion();
  setModalState(quizModal, true);
}

startQuizButton?.addEventListener("click", startQuiz);
closeQuizButton?.addEventListener("click", () => setModalState(quizModal, false));
quizModal?.addEventListener("click", (event) => {
  if (event.target === quizModal) setModalState(quizModal, false);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeMenu();
  setModalState(quizModal, false);
  setModalState(caseModal, false);
});
