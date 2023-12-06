// Create and resize image
let clown = document.createElement("img");
const div = document.querySelector("#main");
const p = document.querySelector("p");
const lifeElmt = document.querySelector("p > span");
let moveInterval = 1300;

let clownWidth = 0;
let clownHeight = 0;
let life = 0;

lifeElmt.innerHTML = life;

clown.src = "./assets/images/clown.png";
clown.style.width = "150px";
div.appendChild(clown);

clown.onload = () => {
    clownWidth = clown.width;
    clownHeight = clown.height;
};

const getRandInt = (max) => {
    return Math.floor(Math.random() * max);
};

const shake = (elmt) => {
    elmt.classList.toggle("animShake");
    console.log(elmt.outerHTML);
};

const randMove = (elmt) => {
    let randomX = getRandInt(div.offsetWidth - clownWidth);
    let randomY = getRandInt(div.offsetHeight - clownHeight);
    elmt.style.transform = `translate(${randomX}px, ${randomY}px)`;
    elmt.style.transition = `transform ease ${moveInterval}ms`;
};
const timer = (min = 0, sec) => {
    const interval = setInterval(() => {
        if (min > 0 && sec == 0) {
            sec = 59;
            min--;
        }
        if (sec < 10) {
            console.log(min + ":0" + sec);
        } else {
            console.log(min + ":" + sec);
        }
        if (min == 0 && sec == 0) {
            clearInterval(interval);
        }
        sec--;
    }, 1000);
};

timer(0, 15);

clown.addEventListener("click", () => {
    shake(p);
    life++;
    lifeElmt.innerHTML = life;
});
p.addEventListener("animationend", () => {
    shake(p);
});
setInterval(() => {
    randMove(clown);
}, moveInterval);
