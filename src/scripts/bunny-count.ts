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
const dontTapFarmMsgsArray = ["Why?","Really?","bruh ...","aw come on","dude no","wooooow","don't tap yet","stop"];
const countingGoalsMsgArray = ['parsing goals','gathering goals','counting completed goals','finding bunnies'];
const oneBunnyMsg = ["Yipee! A cute little bunny !","One funny bunny.","Who's the cutest bunny? Yes you are.","Is that a rabbit in your pocket?"];
let tasksCompleted: number = 5;
const manyBunnyMsg = [`Yay! ${tasksCompleted} bouncy bunnies`,`${tasksCompleted} more bunnies for you`, `${tasksCompleted} bunnies? yes, please`,`Oi! ${tasksCompleted} bunnies hopped in`,`${tasksCompleted} bunnies have joined the farm`];
const bunnyJokesArray = ["How do you say bunny in Spanish? Bunnito.","Why can't you hear bunnies having sex? Because they have cotton balls.","I'm having a bad hare day.","Where do bunnies go for breakfast? IHOP.","Read me a story with a hoppy ending.","Somebunny loves you.","I dance to hip hop."];
const bunnyJokeBubble = document.querySelector('#bunny-joke-bubble');

let taps = 0;
let processGoals;
let processingMsgCount = 0;
let bunnyArray = [];
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
    if (todayweekday == 'Monday') {
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

function dontTapTheFarm() {
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
    tapFarmMsg.style.display = "none";
	tapFarmButton.style.display = "none";
    countingBunniesMsg.style.display = "inline";
    countingBunniesMsg.style.margin = "0 0 0";
    countingBunniesMsg.style.color = "black";
    countingBunniesMsg.style.fontFamily = "Pavanam";
    countingBunniesMsg.style.fontSize = "14px";
    tapFarmButton.removeEventListener('click',countBunnies);
    // console.log((Math.random() * (2000 - 200) + 200));
    // processGoals = setInterval(processingGoals,(Math.random() * (2000 - 200) + 200));
    processGoals = setInterval(processingGoals,300);
    setTimeout (function() {
            countingBunniesMsg.textContent = 'querying database';
    },200);
}

function processingGoals() {
    if (processingMsgCount < countingGoalsMsgArray.length) {
        countingBunniesMsg.textContent = countingGoalsMsgArray[processingMsgCount];
        console.log('processing');
        processingMsgCount++;
    }
    else {
        countingBunniesMsg.textContent = '';
        console.log('all done');
        clearInterval(processGoals);
        setTimeout(bunnyAnnouncement,500);
    }
}

function bunnyAnnouncement() {
    countingBunniesMsg.style.margin = "0 0 -4px";
    countingBunniesMsg.style.fontSize = "20px";
    countingBunniesMsg.style.fontFamily = "Annie Use Your Telescope";
    if (tasksCompleted == 0) {
        countingBunniesMsg.textContent = 'aww, no bunnies';
    }
    else if (tasksCompleted == 1) {
        countingBunniesMsg.textContent = oneBunnyMsg[Math.floor(Math.random() * oneBunnyMsg.length)];
    }
    else {
        countingBunniesMsg.textContent = manyBunnyMsg[Math.floor(Math.random() * manyBunnyMsg.length)];
    }
    setTimeout(makeBunnies,500);
}

function makeBunnies() {
	for (let i: number=0; i<tasksCompleted; i++) {
		makeBunny(i);
	}
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
}

function randomBunnyAnimation(e) {
	// const bunnyAnimationArray = ["bunnyHop","bunnyRush","bunnyJoke"];
    // let animationIndex = Math.floor(Math.random()*3);
    // let randomAnimation = bunnyAnimationArray[animationIndex];
    e.target.classList.add("bunnyHop");
    // let imHere = e.target.getBoundingClientRect();
    // let boxy = e.target.offsetLeft;
    // console.log(boxy);
    // console.log(imHere);
    bunnyJoke();
    e.target.onanimationend = () => {
        e.target.classList.remove("bunnyAppear","bunnyHop","bunnyRush","bunnyJoke");
    };
}

function bunnyRush() {
	console.log('bunny rush');
}

function bunnyJoke() {
    for (let j: number = 0; j<bunnyJokesArray.length; j++) {
        console.log(bunnyJokesArray[j]);
    }
    bunnyJokeBubble.textContent = bunnyJokesArray[0];
}