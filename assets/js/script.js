// Create and resize image
let clown = document.createElement("img");
const div = document.querySelector("#main");
const p = document.querySelector("p");
const lifeElmt = document.querySelector("p > span");
const timerElmt = document.querySelector("#timer");
let finishMsg = document.createElement("div");

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
};

const randMove = (elmt) => {
    let randomX = getRandInt(div.offsetWidth - clownWidth);
    let randomY = getRandInt(div.offsetHeight - clownHeight);
    elmt.style.transform = `translate(${randomX}px, ${randomY}px)`;
    elmt.style.transition = `transform ease ${moveInterval}ms`;
};
const timer = (min = 0, sec, elmt) => {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            elmt.innerHTML = `${min}:0${sec}`;
            if (min > 0 && sec == 0) {
                sec = 59;
                min--;
            }
            sec--;
            if (sec < 10) {
                elmt.innerHTML = `${min}:0${sec}`;
            } else {
                elmt.innerHTML = `${min}:${sec}`;
            }
            if (min == 0 && sec == 0) {
                clearInterval(interval);
                console.log("res");
                resolve();
            }
        }, 1000);
    });
};

let finish = async (interval) => {
    await timer(0, 5, timerElmt);
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
