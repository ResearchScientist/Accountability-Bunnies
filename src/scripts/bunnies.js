const date = new Date();
const dateOptions = {weekday: "long"};
let todayweekday = new Intl.DateTimeFormat("en-US",dateOptions).format(date);
const tapFarmMsg = document.querySelector('#tap-farm-msg');
const tapFarmButton = document.querySelector('#tap-farm-button');

let totalBunnies = 3;

function onSaturday() {
    if (todayweekday == 'Tuesday') {
        tapFarmMsg.style.display = "inline";
        tapFarmButton.style.display = "inline";
        console.log('its Tuesday')
    }
    else {
        console.log('no');
    }
}

onSaturday();

const bunnyPen = document.querySelector("#bunny-pen");

tapFarmButton.addEventListener('click',makeBunnies);

function bunnyRush() {
    console.log('tapped the farm');
}

function makeBunnies() {
    console.log('making bunnies');
    for (i=0; i<totalBunnies; i++) {
        makeBunny(i);
    }
    tapFarmMsg.style.display = "none";
    tapFarmButton.style.display = "none";
}

function makeBunny(i) {
    setTimeout (function() {
        const bunny = document.createElement("img");
        bunny.src = "bunnyBlue.svg";
        bunny.classList.add("bunnyAppear");
        bunnyPen.appendChild(bunny);
    },500*i);
}



bunnyPen.addEventListener('click',randomBunnyAnimation);

function randomBunnyAnimation(e) {
	console.log('bunny clicked ' + e.target);
}