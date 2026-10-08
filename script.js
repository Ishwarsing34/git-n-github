const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const themeToggle = document.getElementById("themeToggle");
const formMessage = document.getElementById("formMessage");
const toast = document.getElementById("toast");
let toastTimer;

if (togglePassword && passwordInput) {
  togglePassword.addEventListener("click", () => {
    const shouldShowPassword = passwordInput.type === "password";
    passwordInput.type = shouldShowPassword ? "text" : "password";
    togglePassword.textContent = shouldShowPassword ? "Hide" : "Show";
    togglePassword.setAttribute("aria-label", `${shouldShowPassword ? "Hide" : "Show"} password`);
    togglePassword.setAttribute("aria-pressed", String(shouldShowPassword));
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLightTheme = document.body.classList.toggle("light-theme");
    themeToggle.setAttribute("aria-label", `Switch to ${isLightTheme ? "dark" : "light"} theme`);
    themeToggle.innerHTML = isLightTheme
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.4A8.5 8.5 0 0 1 8.6 3.8a8.6 8.6 0 1 0 11.6 11.6Z" /></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg>';
  });
}

function showToast(message) {
  if (!toast) {
    return;
  }

  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3200);
}

document.querySelectorAll("[data-notice]").forEach((element) => {
  element.addEventListener("click", (event) => {
    if (element instanceof HTMLAnchorElement) {
      event.preventDefault();
    }

    showToast(element.dataset.notice);
  });
});

if (loginForm && passwordInput && formMessage) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!loginForm.reportValidity()) {
      return;
    }

    const submitButton = loginForm.querySelector(".primary-btn");
    const submitLabel = submitButton.querySelector("span");
    submitButton.disabled = true;
    submitLabel.textContent = "Checking details...";
    formMessage.classList.remove("is-error");
    formMessage.classList.add("is-visible");
    formMessage.textContent = "Demo only: authentication is not configured. Your credentials were not sent or stored.";
    passwordInput.value = "";
    passwordInput.type = "password";
    togglePassword.textContent = "Show";
    togglePassword.setAttribute("aria-label", "Show password");
    togglePassword.setAttribute("aria-pressed", "false");

    window.setTimeout(() => {
      submitButton.disabled = false;
      submitLabel.textContent = "Sign in to Nova";
    }, 700);
  });
}
