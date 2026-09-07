document.addEventListener("DOMContentLoaded", () => {
    const viewport = document.querySelector(".carousel-viewport");
    const track = document.querySelector(".carousel-track");
    const items = Array.from(document.querySelectorAll(".carousel-item"));
    const nextBtn = document.getElementById("carouselNext");
    const prevBtn = document.getElementById("carouselPrev");

    const gap = 40;

    // ⭐ Create clones
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[items.length - 1].cloneNode(true);

    firstClone.classList.add("clone");
    lastClone.classList.add("clone");

    // ⭐ Insert clones
    track.appendChild(firstClone);
    track.insertBefore(lastClone, items[0]);

    const allItems = Array.from(document.querySelectorAll(".carousel-item"));

    let index = 1; // ⭐ Start on real item 1

    function centerItem(animate = true) {
        const itemWidth = allItems[index].getBoundingClientRect().width;
        const viewportWidth = viewport.offsetWidth;

        // ⭐ Real center position of the active item
        const activeItem = allItems[index];
        const activeRect = activeItem.offsetLeft;

        // ⭐ Center the active item inside the viewport
        const target = (viewportWidth / 2) - (itemWidth / 2) - activeRect;

        track.style.transition = animate ? "transform 0.4s ease" : "none";
        track.style.transform = `translateX(${target}px)`;

        allItems.forEach((item, i) => {
            item.classList.remove("fade-left", "fade-right", "active");

            if (i === index) {
                item.classList.add("active");
            } else if (i === index - 1) {
                item.classList.add("fade-left");
            } else if (i === index + 1) {
                item.classList.add("fade-right");
            }
        });
    }


    centerItem(false);

    nextBtn.addEventListener("click", () => {
        index++;
        centerItem();

        // ⭐ If we hit the clone of first item, jump back to real item 1
        if (index === allItems.length - 1) {
            setTimeout(() => {
                index = 1;
                centerItem(false);
            }, 400);
        }
    });

    prevBtn.addEventListener("click", () => {
        index--;
        centerItem();

        // ⭐ If we hit the clone of last item, jump back to real item 3
        if (index === 0) {
            setTimeout(() => {
                index = allItems.length - 2;
                centerItem(false);
            }, 400);
        }
    });

    window.addEventListener("resize", () => centerItem(false));
});
