let moveInterval = 1000;
let clownWidth = 0;
let clownHeight = 0;
let min = 0;
let sec = 0;
let life = 50;
let lifDecInt = 1000;

let clown = document.createElement("img");
const div = document.querySelector("#main");
const p = document.querySelector("p");
const lifeElmt = document.querySelector("p > span");
const timerElmt = document.querySelector("#timerDigit");
const finishMsg = document.createElement("div");
const finishText = document.createElement("p");
const finishTime = document.createElement("p");
const resetBtn = document.createElement("button");
const sideBar = document.querySelector("#sideBar");
const burgerMenu = document.querySelector("#burgerMenu");
const closeBtn = document.querySelector("#closeBtn");
resetBtn.setAttribute("type", "submit");
finishMsg.appendChild(finishText);
finishMsg.appendChild(finishTime);
finishMsg.appendChild(resetBtn);

resetBtn.innerHTML = "Recommencer";
resetBtn.style.width = "100px";
lifeElmt.innerHTML = life;

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

const openNav = () => {
    sideBar.style.left = "0";
    sideBar.style.transition = "left ease 1s";
    burgerMenu.style.transform = "rotate(-90deg)";
    burgerMenu.style.transition = "transform ease 0.5s";
};

const closeNav = () => {
    sideBar.style.left = "-230px";
    sideBar.style.transition = "left ease 1s";
    burgerMenu.style.transform = "rotate(0deg)";
    burgerMenu.style.transition = "transform ease 1.5s";
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
    interval = setInterval(() => {
        intervalClown = setInterval(() => {
            randMove(clown);
        }, moveInterval);
        moveInterval /= 1.1;
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

timer(timerElmt);
let game = async (interval) => {
    increaseSpeed(10);
    await lifeDecrease();
    clown.remove();
    clearInterval(interval);
    finishMsg.classList.add("floatingMsg");
    div.appendChild(finishMsg);
    console.log("Game Over");
    const finalTime = document.querySelector("#timerDigit").innerHTML;
    timerElmt.remove();
    finishText.innerHTML = "Bravo vous avez tenu :";
    finishTime.innerHTML = finalTime;
};

clown.addEventListener("click", () => {
    shake(p);
    if (life < 100) {
        life++;
    }
    lifeElmt.innerHTML = life;
});
p.addEventListener("animationend", () => {
    shake(p);
});
intervalClown = setInterval(() => {
    randMove(clown);
}, moveInterval);
resetBtn.addEventListener("click", () => {
    window.location.reload();
});
burgerMenu.addEventListener("click", () => {
    openNav();
});
closeBtn.addEventListener("click", () => {
    closeNav();
});

game(intervalClown);
