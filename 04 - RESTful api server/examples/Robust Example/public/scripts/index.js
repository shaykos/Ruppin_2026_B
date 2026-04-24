const slides = Array.from(document.querySelectorAll(".slide"));
const captionEl = document.getElementById("slider-caption");
const nextBtn = document.getElementById("next-slide");
const prevBtn = document.getElementById("prev-slide");

let index = 0;
let autoPlayTimer;

function showSlide(nextIndex) {
    slides[index].classList.remove("active");
    index = (nextIndex + slides.length) % slides.length;
    slides[index].classList.add("active");
    captionEl.textContent = slides[index].dataset.caption;
}

function startAutoPlay() {
    autoPlayTimer = setInterval(() => {
        showSlide(index + 1);
    }, 4200);
}

function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
}

nextBtn.addEventListener("click", () => {
    showSlide(index + 1);
    resetAutoPlay();
});

prevBtn.addEventListener("click", () => {
    showSlide(index - 1);
    resetAutoPlay();
});

startAutoPlay();

const tabs = Array.from(document.querySelectorAll(".tab"));
const forms = Array.from(document.querySelectorAll(".form-panel"));
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");

function activateTab(targetId) {
    tabs.forEach((tab) => {
        const isActive = tab.dataset.target === targetId;
        tab.classList.toggle("active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
    });

    forms.forEach((form) => {
        form.classList.toggle("active", form.id === targetId);
    });
}

tabs.forEach((tab) => {
    tab.addEventListener("click", () => activateTab(tab.dataset.target));
});

async function registerUser(payload) {
    const response = await fetch("/api/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.error || "Registration failed");
    }

    return result;
}

if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Login submitted successfully.");
        loginForm.reset();
    });
}

if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const payload = {
            name: document.querySelector("#register-name")?.value.trim(),
            email: document.querySelector("#register-email")?.value.trim(),
            role: document.querySelector("#register-role")?.value,
            password: document.querySelector("#register-password")?.value
        };

        try {
            await registerUser(payload);
            alert("Registration submitted successfully.");
            registerForm.reset();
        } catch (error) {
            alert(error.message || "Registration failed");
        }
    });
}
