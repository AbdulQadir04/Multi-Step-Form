const nextBtns = document.querySelectorAll(".btn-next");
const prevBtns = document.querySelectorAll(".btn-prev");
const formSteps = document.querySelectorAll(".form-step");
const progress = document.getElementById("progress");
const progressSteps = document.querySelectorAll(".progress-step");
const themeBtn = document.getElementById("themeToggle");
const successCard = document.getElementById("successCard");
const form = document.getElementById("multi-step-form");
let formStepNum = 0;

/* ---------- Theme Button Toggle ---------- */
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeBtn.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
  }
});

/* ---------- Autosave ---------- */
window.addEventListener("load", () => {
  const saved = JSON.parse(localStorage.getItem("formData")) || {};
  for (let k in saved) {
    const el = document.querySelector(`[name="${k}"]`);
    if (el) el.value = saved[k];
  }
});
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", () => {
    const data = JSON.parse(localStorage.getItem("formData")) || {};
    data[input.name] = input.value;
    localStorage.setItem("formData", JSON.stringify(data));
  });
});

/* ---------- Step Navigation ---------- */
nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const inputs = formSteps[formStepNum].querySelectorAll("input[required]");
    let valid = true;
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.style.border = "2px solid red";
        valid = false;
      } else input.style.border = "1px solid #999";
    });
    if (valid) {
      formStepNum++;
      updateFormSteps();
      updateProgressbar();
    }
  });
});
prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepNum--;
    updateFormSteps();
    updateProgressbar();
  });
});

function updateFormSteps() {
  formSteps.forEach((step) => step.classList.remove("form-step-active"));
  formSteps[formStepNum].classList.add("form-step-active");
  if (formStepNum === 2) showSummary();
}

function updateProgressbar() {
  progressSteps.forEach((step, i) => {
    if (i <= formStepNum) step.classList.add("progress-step-active");
    else step.classList.remove("progress-step-active");
  });
  const active = document.querySelectorAll(".progress-step-active");
  progress.style.width = ((active.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}

/* ---------- Review Summary ---------- */
function showSummary() {
  document.getElementById("review-name").textContent = document.getElementById("fname").value;
  document.getElementById("review-age").textContent = document.getElementById("age").value;
  document.getElementById("review-email").textContent = document.getElementById("email").value;
  document.getElementById("review-phone").textContent = document.getElementById("phone").value;
}

/* ---------- Submit ---------- */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.removeItem("formData");
  form.classList.add("hidden");
  successCard.classList.remove("hidden");
  setTimeout(() => location.reload(), 4000);
});
