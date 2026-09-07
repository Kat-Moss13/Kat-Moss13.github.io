document.addEventListener("DOMContentLoaded", () => {
    const viewport = document.querySelector(".carousel-viewport");
    const track = document.querySelector(".carousel-track");
    const originalItems = Array.from(document.querySelectorAll(".carousel-item"));
    const nextBtn = document.getElementById("carouselNext");
    const prevBtn = document.getElementById("carouselPrev");

    const itemWidth = 500;
    const gap = 40;
    const fullWidth = itemWidth + gap;

    /* Duplicate items for infinite loop */
    while (track.children.length < originalItems.length * 3) {
        originalItems.forEach(item => {
            const clone = item.cloneNode(true);
            clone.classList.add("clone");
            track.appendChild(clone);
        });
    }

    const allItems = Array.from(track.children);

    /* Start in the middle set */
    let index = originalItems.length;

    /* ⭐ Apply classes ONLY when stable */
    function applyClasses() {
        allItems.forEach((item, i) => {
            item.classList.remove("active", "fade-left", "fade-right");

            if (i === index) item.classList.add("active");
            else if (i === index - 1) item.classList.add("fade-left");
            else if (i === index + 1) item.classList.add("fade-right");
        });
    }

    /* ⭐ Center item */
    function centerItem(animate = true) {
        const viewportWidth = viewport.offsetWidth;

        const target =
            (viewportWidth / 2) -
            (itemWidth / 2) -
            (index * fullWidth);

        track.style.transition = animate ? "transform 0.2s ease" : "none";
        track.style.transform = `translateX(${target}px)`;
    }

    /* ⭐ Initial render */
    requestAnimationFrame(() => {
        centerItem(false);
        applyClasses();
    });

    nextBtn.addEventListener("click", () => {
        index++;
        centerItem(true);

        /* ⭐ DO NOT apply classes yet — wait until movement finishes */

        /* Loop reset */
        if (index >= allItems.length - originalItems.length) {
            setTimeout(() => {
                track.style.transition = "none";   // snap instantly
                index -= originalItems.length;     // wrap index
                centerItem(false);                 // recenter without animation
                applyClasses();                    // apply AFTER snap (only once)
            }, 400);
        } else {
            /* Normal movement — apply classes AFTER animation finishes */
            setTimeout(() => applyClasses(), 200);
        }
    });

    prevBtn.addEventListener("click", () => {
        index--;
        centerItem(true);

        /* ⭐ DO NOT apply classes yet — wait until movement finishes */

        /* Loop reset */
        if (index < originalItems.length) {
            setTimeout(() => {
                track.style.transition = "none";   // snap instantly
                index += originalItems.length;     // wrap index
                centerItem(false);                 // recenter without animation
                applyClasses();                    // apply AFTER snap (only once)
            }, 400);
        } else {
            /* Normal movement — apply classes AFTER animation finishes */
            setTimeout(() => applyClasses(), 200);
        }
    });

    window.addEventListener("resize", () => {
        centerItem(false);
        applyClasses();
    });
});
