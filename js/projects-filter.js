document.addEventListener("DOMContentLoaded", () => {

    const grid = document.getElementById("projectsGrid");
    const cards = Array.from(grid.children);

    const filterLanguage = document.getElementById("filter-language");
    const filterTeam = document.getElementById("filter-team");
    const filterEngine = document.getElementById("filter-engine");
    const sortBy = document.getElementById("sort-by");
    const clearFilters = document.getElementById("clear-filters");

    function applyFilters() {
        const lang = filterLanguage.value;
        const team = filterTeam.value;
        const engine = filterEngine.value;

        cards.forEach(card => {
            const matchesLang = !lang || card.dataset.language.includes(lang);
            const matchesTeam = !team || card.dataset.team === team;
            const matchesEngine = !engine || card.dataset.engine === engine;

            card.style.display = (matchesLang && matchesTeam && matchesEngine)
                ? "block"
                : "none";
        });
    }

    function applySort() {
        let sorted = [...cards];

        if (sortBy.value === "duration") {
            sorted.sort((a, b) => Number(a.dataset.duration) - Number(b.dataset.duration));
        }

        if (sortBy.value === "recent") {
            sorted.sort((a, b) => b.dataset.date.localeCompare(a.dataset.date));
        }

        if (sortBy.value === "default") {
            sorted = cards;
        }

        sorted.forEach(card => grid.appendChild(card));
    }

    filterLanguage.addEventListener("change", () => { applyFilters(); applySort(); });
    filterTeam.addEventListener("change", () => { applyFilters(); applySort(); });
    filterEngine.addEventListener("change", () => { applyFilters(); applySort(); });
    sortBy.addEventListener("change", () => applySort());

    clearFilters.addEventListener("click", () => {
        filterLanguage.value = "";
        filterTeam.value = "";
        filterEngine.value = "";
        sortBy.value = "default";
        applyFilters();
        applySort();
    });

});
