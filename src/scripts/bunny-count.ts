const date = new Date();
const dateOptions = {weekday: "long" as const};
let todayweekday = new Intl.DateTimeFormat("en-US",dateOptions).format(date);
const sun = document.querySelector('#sun') as HTMLElement;
const tapFarmMsg = document.querySelector('#tap-farm-msg') as HTMLElement;
const tapFarmButton = document.querySelector('#tap-farm-button') as HTMLElement;
const dontTapFarmMsg = document.querySelector('#dont-tap-farm-msg') as HTMLElement;
const dontTapFarmButton = document.querySelector('#dont-tap-farm-button') as HTMLElement;
const countingBunniesMsg = document.querySelector('#counting-bunnies-msg') as HTMLElement;
const bunnyColours = ["bunnyBlue.svg","bunnyGreen.svg","bunnyOrange.svg","bunnyPink.svg","bunnyLightBlue.svg","bunnyRed.svg","bunnyYellow.svg","bunnyLightOrange.svg"];
const bunnyPen = document.querySelector("#bunny-pen") as HTMLElement;

let bunnyArray = [];
let tasksCompleted: number = 1;
let totalBunnies: number = 0;


sun.addEventListener('click',sunSpin);
tapFarmButton.addEventListener('click',countBunnies);
dontTapFarmButton.addEventListener('click',dontTapTheFarm);
bunnyPen.addEventListener('click',randomBunnyAnimation);

function sunSpin() {
    sun.classList.add("sunSpin");
    sun.onanimationend = () => {
        sun.classList.remove("sunSpin");
    };
}

function onSaturday() {
    if (todayweekday == 'Wednesday') {
    	tapFarmMsg.style.display = "inline";
    	tapFarmButton.style.display = "inline";
	}
	else {
		tapFarmMsg.style.display = "none";
       	tapFarmButton.style.display = "none";
        dontTapFarmMsg.style.display = "inline";
        dontTapFarmButton.style.display = "inline";
	}
}

onSaturday();

let taps = 0;
function dontTapTheFarm() {
    const dontTapFarmMsgsArray = ["Why?","Really?","bruh ...","aw come on","dude no","wooooow","don't tap yet","stop"];
    taps++;
    if (taps == 1) {
        dontTapFarmMsg.textContent = "It's not Saturday !";
    }
    else if (taps == 4) {
        dontTapFarmMsg.textContent = "no mas";
        dontTapFarmButton.style.display = "none";
        setTimeout (function() {
            dontTapFarmMsg.style.display = "none";
        },2000);
    }
    else {
        dontTapFarmMsg.textContent = dontTapFarmMsgsArray[Math.floor(Math.random() * dontTapFarmMsgsArray.length)];
    }
}

function countBunnies() {
    console.log(`counting ${tasksCompleted} bunnies`);
    countingBunniesMsg.textContent = `${tasksCompleted}`;
    countingBunniesMsg.style.display = "inline";
    makeBunnies();
}

function makeBunnies() {
	console.log('making bunnies');
	for (let i: number=0; i<tasksCompleted; i++) {
		makeBunny(i);
	}
	tapFarmButton.removeEventListener('click',makeBunnies);
	tapFarmMsg.style.display = "none";
	tapFarmButton.style.display = "none";
}

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