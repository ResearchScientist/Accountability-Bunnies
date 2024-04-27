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
const countingGoalsMsgArray = ['parsing goals','gathering goals','counting completed goals','finding bunnies'];

let taps = 0;
let processGoals;
let processingMsgCount = 0;

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
    if (todayweekday == 'Friday') {
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
    tapFarmMsg.style.display = "none";
	tapFarmButton.style.display = "none";
    countingBunniesMsg.style.display = "inline";
    countingBunniesMsg.style.margin = "0 0 0";
    countingBunniesMsg.style.color = "black";
    countingBunniesMsg.style.fontFamily = "Pavanam";
    countingBunniesMsg.style.fontSize = "16px";
    tapFarmButton.removeEventListener('click',countBunnies);
    console.log((Math.random() * (2000 - 200) + 200));
    // processGoals = setInterval(processingGoals,(Math.random() * (2000 - 200) + 200));
    processGoals = setInterval(processingGoals,300);
    setTimeout (function() {
            countingBunniesMsg.textContent = 'querying database';
    },200);
    setTimeout(makeBunnies,2000);
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
    }
}

function makeBunnies() {
	console.log('making bunnies');
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
	const bunnyAnimationArray = ["bunnyHop","bunnyLeft","bunnyRight"];
    // console.log(e.target.classList);
    let animationIndex = Math.floor(Math.random()*3);
    let randomAnimation = bunnyAnimationArray[animationIndex];
    e.target.classList.add("bunnyHop");
    let imHere = e.target.getBoundingClientRect();
    let boxy = e.target.offsetLeft;
    console.log(boxy);
    console.log(imHere);
    e.target.onanimationend = () => {
        e.target.classList.remove("bunnyAppear","bunnyHop","bunnyLeft","bunnyRight");
    };
}

// function bunnyRush() {
// 	console.log('tapped the farm');
// }