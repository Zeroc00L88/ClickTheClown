let moveInterval = 1000;
let clownWidth = 0;
let clownHeight = 0;
let min = 0;
let sec = 0;
let initLife = 5;
let currentLife = 0;
let lifDecInt = 1000;
let barClosed = true;
let lvl = [1.05, 1.1, 1.2];

let clown = document.createElement("img");
const div = document.querySelector("#main");
const p = document.querySelector("p");
const lifeElmt = document.querySelector("p > span");
const timerElmt = document.querySelector("#timerDigit");
const sideBar = document.querySelector("#sideBar");
const burgerMenu = document.querySelector("#burgerMenu");
const selectLvl = document.querySelector("#selectLvl");
const quit = document.querySelector("#quit");
const gameOverWin = document.querySelector("#gameOverWin");

lifeElmt.innerHTML = currentLife;

clown.src = "./assets/images/clown.png";
clown.style.width = "150px";
clown.style.filter = "drop-shadow(16px 16px 20px black)";
clown.style.userSelect = "none";
clown.setAttribute("draggable", "false");
div.appendChild(clown);

clown.onload = () => {
    clownWidth = clown.width;
    clownHeight = clown.height;
};

//Functions
const showGameOverWin = () => {
    gameOverWin.classList.toggle("hidden");
};

const openNav = () => {
    sideBar.style.left = "0";
    sideBar.style.transition = "left ease 1s";
    burgerMenu.style.transform = "rotate(-90deg)";
    burgerMenu.style.transition = "transform ease 1s";
    barClosed = false;
};

const closeNav = () => {
    sideBar.style.left = "-230px";
    sideBar.style.transition = "left ease 1s";
    burgerMenu.style.transform = "rotate(0deg)";
    burgerMenu.style.transition = "transform ease 1s";
    barClosed = true;
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
    elmt.style.transition = `transform linear ${moveInterval}ms`;
};

const increaseSpeed = (sec) => {
    intervalClown = setInterval(() => {
        quit.addEventListener("click", () => {
            clearInterval(interval);
            clearInterval(intervalClown);
        });
        randMove(clown);
    }, moveInterval);
    interval = setInterval(() => {
        quit.addEventListener("click", () => {
            clearInterval(interval);
            clearInterval(intervalClown);
        });
        intervalClown = setInterval(() => {
            randMove(clown);
        }, moveInterval);
        moveInterval /= 1.05;
    }, sec * 1000);
};

const timer = (elmt) => {
    const interval = setInterval(() => {
        if (sec > 59) {
            sec = 0;
            min++;
        }
        if (sec < 10) {
            elmt.innerHTML = `${min}:0${sec}`;
        } else {
            elmt.innerHTML = `${min}:${sec}`;
        }
        sec++;
    }, 1000);
};

const lifeDecrease = () => {
    currentLife = initLife;
    lifeElmt.innerHTML = currentLife;
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            currentLife--;
            lifeElmt.innerHTML = currentLife;
            if (currentLife == 0) {
                clearInterval(interval);
                resolve();
            }
        }, lifDecInt);
    });
};

// const centerMenu = (type) => {
//     div.appendChild(centerMenuMsg);
//     if (type == "finish") {
//         const finalTime = document.querySelector("#timerDigit").innerHTML;
//         timerElmt.remove();
//         centerMenuTitle.innerHTML = "Bravo vous avez tenu :";
//         centerMenuContent.innerHTML = finalTime;
//         centerMenuMsg.appendChild(resetBtn);
//     } else if (type == "lvl") {
//         centerMenuTitle.innerHTML = "Selectionnez votre niveau";
//     }
// };

let game = async () => {
    clown.addEventListener("click", () => {
        shake(p);
        if (currentLife < 100) {
            currentLife++;
        }
        lifeElmt.innerHTML = currentLife;
    });
    p.addEventListener("animationend", () => {
        shake(p);
    });
    // resetBtn.addEventListener("click", () => {
    //     window.location.reload();
    // game();
    // });
    burgerMenu.addEventListener("click", () => {
        if (barClosed == true) {
            openNav();
        } else {
            closeNav();
        }
    });
    selectLvl.addEventListener("click", () => {
        centerMenu("lvl");
    });

    timer(timerElmt);
    increaseSpeed(10);
    await lifeDecrease();
    showGameOverWin();
    clown.remove();
    // centerMenu("finish");
};

game();
