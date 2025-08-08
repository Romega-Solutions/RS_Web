document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("testimonial-track");
    if (track) {
        const cards = track.querySelectorAll(".testimonial-card");
        const dots = document.querySelectorAll("[data-slide-to]");
        const prevButton = document.querySelector("[aria-label='Previous testimonial']");
        const nextButton = document.querySelector("[aria-label='Next testimonial']");

        let currentIndex = 0;

        function applyFlash() {
            track.classList.add("flash");
            setTimeout(() => {
                track.classList.remove("flash");
            }, 300);
        }

        function updateDots(index) {
            dots.forEach((dot) => {
                const slideToIndex = parseInt(dot.getAttribute("data-slide-to"));
                dot.classList.toggle("bg-rs-accent-500", slideToIndex === index);
                dot.classList.toggle("bg-rs-primary-200", slideToIndex !== index);
            });
        }

        function goToSlide(index) {
            if (index < 0) {
                index = cards.length - 1;
            } else if (index >= cards.length) {
                index = 0;
            }
            const offset = cards[index].offsetLeft - track.offsetLeft;
            track.scrollTo({
                left: offset,
                behavior: "smooth"
            });
            currentIndex = index;
            updateDots(index);
            applyFlash();
        }

        if (prevButton) {
            prevButton.addEventListener("click", () => goToSlide(currentIndex - 1));
        }

        if (nextButton) {
            nextButton.addEventListener("click", () => goToSlide(currentIndex + 1));
        }

        dots.forEach((dot) => {
            dot.addEventListener("click", () => {
                const slideToIndex = parseInt(dot.getAttribute("data-slide-to"));
                goToSlide(slideToIndex);
            });
        });

        track.addEventListener("scroll", () => {
            const scrollLeft = track.scrollLeft;
            let closestIndex = 0;
            let closestDistance = Infinity;

            cards.forEach((card, i) => {
                const distance = Math.abs(card.offsetLeft - track.offsetLeft - scrollLeft);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = i;
                }
            });

            if (currentIndex !== closestIndex) {
                currentIndex = closestIndex;
                updateDots(currentIndex);
            }
        });

        if (cards.length > 0) {
            updateDots(0);
        }
    }
});