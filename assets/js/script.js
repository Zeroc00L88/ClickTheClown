// Create and resize image
let clown = document.createElement("img");
const div = document.querySelector("#main");
const p = document.querySelector("p");
const lifeElmt = document.querySelector("p > span");
const timerElmt = document.querySelector("#timerDigit");
let finishMsg = document.createElement("div");

let moveInterval = 1300;
let clownWidth = 0;
let clownHeight = 0;
let min = 0;
let sec = 0;
let life = 100;
let lifDecInt = 1000;

lifeElmt.innerHTML = life;
clown.src = "./assets/images/clown.png";
clown.style.width = "150px";
clown.style.filter = "drop-shadow(16px 16px 20px black)";
clown.style.userSelect = "none";
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
};

const randMove = (elmt) => {
    let randomX = getRandInt(div.offsetWidth - clownWidth);
    let randomY = getRandInt(div.offsetHeight - clownHeight);
    elmt.style.transform = `translate(${randomX}px, ${randomY}px)`;
    elmt.style.transition = `transform ease ${moveInterval}ms`;
};
const timer = (elmt) => {
    const interval = setInterval(() => {
        elmt.innerHTML = `${min}:0${sec}`;
        if (sec > 59) {
            sec = 0;
            min++;
        }
        sec++;
        if (sec < 10) {
            elmt.innerHTML = `${min}:0${sec}`;
        } else {
            elmt.innerHTML = `${min}:${sec}`;
        }
        if (min == 0 && sec == 0) {
            clearInterval(interval);
            console.log("res");
        }
    }, 1000);
};

const lifeDecrease = () => {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            life--;
            lifeElmt.innerHTML = life;
            if (life == 0) {
                clearInterval(interval);
                resolve();
            }
        }, lifDecInt);
    });
};

let finish = async (interval) => {
    timer(timerElmt);
    await lifeDecrease();
    clown.remove();
    clearInterval(interval);
    finishMsg.classList.add("floatingMsg");
    div.appendChild(finishMsg);
    console.log("fin de jeu");
};

clown.addEventListener("click", () => {
    shake(p);
    life++;
    lifeElmt.innerHTML = life;
});
p.addEventListener("animationend", () => {
    shake(p);
});
intervalClown = setInterval(() => {
    randMove(clown);
}, moveInterval);

finish(intervalClown);
