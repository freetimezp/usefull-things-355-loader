gsap.registerPlugin(ScrollTrigger);

const percent = document.querySelector(".percent");
const progressBar = document.querySelector(".progress-bar");
const stages = document.querySelectorAll(".stage-text span");
const preloader = document.querySelector(".preloader");
const replayBtn = document.querySelector(".replay-btn");

let loaderObj = {
    value: 0,
};

function activateStage(index) {
    stages.forEach((stage) => {
        stage.classList.remove("active");
    });

    stages[index].classList.add("active");
}

function runPreloader() {
    // RESET PRELOADER POSITION
    gsap.set(preloader, {
        display: "block",
        opacity: 1,
        pointerEvents: "all",
        yPercent: 0,
    });

    // RESET CONTENT
    gsap.set(".loader-content", {
        opacity: 1,
        scale: 1,
    });

    gsap.set(".progress-bar", {
        width: "0%",
    });

    gsap.set(".loading-text span", {
        y: 120,
        opacity: 0,
        rotateX: -90,
    });

    gsap.set(".loader-circle.one", {
        x: 0,
        y: 0,
        scale: 1,
    });

    gsap.set(".loader-circle.two", {
        x: 0,
        y: 0,
        scale: 1,
    });

    loaderObj.value = 0;
    percent.innerHTML = "0%";

    activateStage(0);

    const tl = gsap.timeline();

    tl.to(".loading-text span", {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power4.out",
    });

    tl.to(
        loaderObj,
        {
            value: 100,
            duration: 4,
            ease: "power2.inOut",

            onUpdate: () => {
                const val = Math.floor(loaderObj.value);

                percent.innerHTML = val + "%";

                progressBar.style.width = val + "%";

                if (val > 20) activateStage(1);
                if (val > 55) activateStage(2);
                if (val > 85) activateStage(3);
            },
        },
        "-=0.5"
    );

    tl.to(
        ".loader-circle.one",
        {
            x: 250,
            y: 100,
            scale: 1.3,
            duration: 4,
            ease: "power1.inOut",
        },
        0
    );

    tl.to(
        ".loader-circle.two",
        {
            x: -200,
            y: -120,
            scale: 1.5,
            duration: 4,
            ease: "power1.inOut",
        },
        0
    );

    tl.to(".loader-content", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power4.inOut",
    });

    tl.to(preloader, {
        yPercent: -100,
        duration: 1.5,
        ease: "power4.inOut",
    });

    tl.set(preloader, {
        display: "none",
    });

    return tl;
}

runPreloader();

/* =========================================
   HERO ANIMATION
========================================= */

gsap.from(".mini-tag", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 5,
    ease: "power4.out",
});

gsap.from(".hero h1", {
    y: 120,
    opacity: 0,
    duration: 1.4,
    delay: 5.2,
    ease: "power4.out",
});

gsap.from(".hero p", {
    y: 80,
    opacity: 0,
    duration: 1,
    delay: 5.5,
    ease: "power4.out",
});

gsap.from(".glass-card", {
    y: 100,
    opacity: 0,
    scale: 0.9,
    duration: 1.3,
    delay: 5.8,
    ease: "power4.out",
});

/* =========================================
   SCROLL TRIGGER PANELS
========================================= */

gsap.utils.toArray(".panel").forEach((panel) => {
    gsap.from(panel, {
        scrollTrigger: {
            trigger: panel,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
        },

        y: 120,
        opacity: 0,
        scale: 0.9,
        rotateX: 10,
        ease: "power3.out",
    });
});

/* =========================================
   REPLAY
========================================= */

replayBtn.addEventListener("click", () => {
    window.scrollTo(0, 0);
    runPreloader();
});
