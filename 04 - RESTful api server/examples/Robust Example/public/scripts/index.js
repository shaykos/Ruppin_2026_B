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

forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const mode = form.id === "login-form" ? "Login" : "Registration";
        alert(`${mode} submitted successfully.`);
        form.reset();
    });
});
