document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("themeToggle");
    const body = document.body;

    toggle.addEventListener("click", () => {
        body.classList.toggle("dark");
        body.classList.toggle("light");

        localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
    });

    const saved = localStorage.getItem("theme");
    if (saved) {
        body.classList.remove("light", "dark");
        body.classList.add(saved);
    }
});
