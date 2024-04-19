const date = new Date();
const dateOptions = {weekday: "long" as const};
let todayweekday = new Intl.DateTimeFormat("en-US",dateOptions).format(date);
const tapFarmMsg = document.querySelector('#tap-farm-msg') as HTMLElement;
const tapFarmButton = document.querySelector('#tap-farm-button') as HTMLElement;

let tasksCompleted: number = 5;
let totalBunnies: number = 0;

function onSaturday() {
    if (todayweekday == 'Friday') {
    	tapFarmMsg.style.display = "inline";
    	tapFarmButton.style.display = "inline";
		console.log('its Saturday');
	}
	else {
		tapFarmMsg.style.display = "none";
       	tapFarmButton.style.display = "none";
	}
}

onSaturday();

tapFarmButton.addEventListener('click',makeBunnies);

function makeBunnies() {
	console.log('making bunnies');
	for (let i: number=0; i<tasksCompleted; i++) {
		makeBunny(i);
	}
	tapFarmButton.removeEventListener('click',makeBunnies);
	tapFarmMsg.style.display = "none";
	tapFarmButton.style.display = "none";
}

const bunnyColours = ["bunnyBlue.svg","bunnyGreen.svg","bunnyOrange.svg","bunnyPink.svg","bunnyLightBlue.svg","bunnyRed.svg","bunnyYellow.svg","bunnyLightOrange.svg"];
let bunnyArray = [];

function makeBunny(i) {
	setTimeout (function() {
    	const bunny = document.createElement("img");
        let randTopPosition = Math.random() * (86) + 15; // (101 - 15) + 15
        let randLeftPosition = Math.random() * (85); // (85 - 0) + 0
        bunny.src = bunnyColours[i % bunnyColours.length];
        bunny.classList.add("bunnyAppear","bunny");
        bunny.style.top = `calc( ${randTopPosition}% - 108px)`;
        bunny.style.left = `${randLeftPosition}%`;
        bunnyPen.appendChild(bunny);
        bunnyArray.push(bunny);
        addIds(bunnyArray);
    },400*i);
}

function addIds(bunnyArray) {
    bunnyArray.forEach((bunnyObject,i) => {
        bunnyObject.setAttribute('id',`bunny${i+1}`);
    });
    console.log(bunnyArray);
}

const bunnyPen = document.querySelector("#bunny-pen");

bunnyPen.addEventListener('click',randomBunnyAnimation);

function randomBunnyAnimation(e) {
	const bunnyAnimationArray = ["bunnyHop","bunnyLeft","bunnyRight"];
    // console.log(e.target.classList);
    let animationIndex = Math.floor(Math.random()*3);
    let randomAnimation = bunnyAnimationArray[animationIndex];
    e.target.classList.add("bunnyHop");
    let imHere = e.target.getBoundingClientRect();
    let boxy = e.target.offsetLeft;
    console.log(boxy);
    console.log(imHere);
    // e.target.style.transform = 'translate(50px,0px)';
    e.target.onanimationend = () => {
        e.target.classList.remove("bunnyAppear","bunnyHop","bunnyLeft","bunnyRight");
    };
}

// function bunnyRush() {
// 	console.log('tapped the farm');
// }