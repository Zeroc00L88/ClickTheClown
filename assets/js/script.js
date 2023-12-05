// Create and resize image
let clown = document.createElement("img");
clown.src = "./assets/images/clown.png";
clown.style.width = "150px";

const div = document.querySelector("#main");
div.appendChild(clown);

let clownWidth = 0;
let clownHeight = 0;
clown.onload = () => {
    clownWidth = clown.width;
    clownHeight = clown.height;
};

console.log(window.innerWidth);
console.log(window.innerHeight);

const getRandInt = (max) => {
    return Math.floor(Math.random() * max);
};

const randMove = (elmt) => {
    let randomX = getRandInt(window.innerWidth - clownWidth);
    let randomY = getRandInt(window.innerHeight - clownHeight);
    // elmt.style.top = `${randomY}px`;
    // elmt.style.left = `${randomX}px`;
    elmt.style.transform = `translate(${randomX}px, ${randomY}px)`;
    console.log("x :", randomX);
    console.log("y :", randomY);
};

clown.addEventListener("click", () => {
    randMove(clown);
});
