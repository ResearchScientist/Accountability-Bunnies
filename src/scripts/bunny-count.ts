const date = new Date();
const dateOptions = {weekday: "long" as const};
let todayweekday = new Intl.DateTimeFormat("en-US",dateOptions).format(date);
const sun = document.querySelector('#sun') as HTMLElement;
const tapFarmMsg = document.querySelector('#tap-farm-msg') as HTMLElement;
const tapFarmButton = document.querySelector('#tap-farm-button') as HTMLElement;
const dontTapFarmMsg = document.querySelector('#dont-tap-farm-msg') as HTMLElement;
const dontTapFarmButton = document.querySelector('#dont-tap-farm-button') as HTMLElement;
const countingBunniesMsg = document.querySelector('#counting-bunnies-msg') as HTMLElement;
const bunnyCountMsg = document.querySelector('#bunny-count-msg') as HTMLElement;
const bunnyColours = ["bunnyBlue.svg","bunnyGreen.svg","bunnyOrange.svg","bunnyPink.svg","bunnyLightBlue.svg","bunnyRed.svg","bunnyYellow.svg","bunnyLightOrange.svg"];
const bunnyPen = document.querySelector("#bunny-pen") as HTMLElement;
const dontTapFarmMsgsArray = ["Why?","Really?","bruh ...","aw come on","dude no","wooooow","don't tap yet","stop"];
const countingGoalsMsgArray = ['parsing goals','gathering goals','counting completed goals','gathering bunnies','counting bunnies'];
const bunnyJokesArray = ["How do you say bunny in Spanish?\nBunnito.","Why can't you hear bunnies having sex?\nBecause they have cotton balls.","I'm having a bad hare day.","Where do bunnies go for breakfast?\nI H O P","Read me a story with a hoppy ending.","Somebunny loves you.","I dance to hip hop."];
const bunnyJokeBubble = document.querySelector('#bunny-joke-bubble') as HTMLElement;

let taps: number = 0;
let processGoals: any;
let processingMsgCount = 0;
let bunnyArray: any = [];
let nTotalBunnies: number;
let nCompletedGoals: number;

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
        getUpdatedDBValue();
	}
    else if (todayweekday == 'Tuesday') {
        tapFarmMsg.style.display = "none";
       	tapFarmButton.style.display = "none";
        dontTapFarmMsg.style.display = "inline";
        dontTapFarmButton.style.display = "inline";
        resetUpdatedDBValue();
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
    setTimeout (function() {
            countingBunniesMsg.textContent = 'querying database';
    },200);
    setTimeout (function() {
        processGoals = setInterval(processingGoals,200);
    },400);
}

function processingGoals() {
    if (processingMsgCount < countingGoalsMsgArray.length) {
        countingBunniesMsg.textContent = countingGoalsMsgArray[processingMsgCount];
        processingMsgCount++;
    }
    else {
        countingBunniesMsg.textContent = '';
        clearInterval(processGoals);
        updateTotalBunnies();
    }
}

async function updateTotalBunnies() {
    const values = await Promise.all([getTotalBunnies(),getCompletedGoalsCounts()]);
    let nTotalBunnies = values[0];
    let nCompletedGoals = values[1];
    let newTotalBunnies = nTotalBunnies + nCompletedGoals;
    const id = 1;
    console.log('updated bunny count is',newTotalBunnies);
    updateTotalBunniesDBValue(id,newTotalBunnies);
}

async function updateTotalBunniesDBValue(id: number,newTotalBunnies: number) {
    try {
        const response = await fetch(`/api/bunnies/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newTotalBunnies, updated: true }),
        });
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
    }
    catch (error) {
        console.error('Error: ', error);
    }
}

async function getUpdatedDBValue() {
    try {
        const response = await fetch('/api/bunnies/updated', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('network response not ok');
        }
        const updatedValue = await response.json();
        checkUpdatedValue(updatedValue);
    }
    catch (error) {
        console.error('Error: ',error);
    }
}

function checkUpdatedValue(updatedValue) {
    console.log('updated is',updatedValue);
    if (updatedValue == false) {
        tapFarmMsg.style.display = "inline";
    	tapFarmButton.style.display = "inline";
        dontTapFarmMsg.style.display = "none";
        dontTapFarmButton.style.display = "none";
    }
    else if (updatedValue == true) {
        tapFarmMsg.style.display = "none";
       	tapFarmButton.style.display = "none";
        dontTapFarmMsg.style.display = "none";
        dontTapFarmButton.style.display = "none";
        console.log('already updated');
    }
    else {
        console.log('value is something other than boolean');
    }
}

async function resetUpdatedDBValue() {
    let id: number = 1;
    try {
        const response = await fetch(`/api/bunnies/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ updated: false }),
        });
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
    }
    catch (error) {
        console.error('Error: ', error);
    }
}

async function populateBunnies() {
    const response = await fetch('/api/bunnies');
    const totalBunniesDB:number = await response.json();
    makeBunnies(totalBunniesDB);
}

async function getTotalBunnies() {
    const response = await fetch('/api/bunnies');
    const totalBunniesDB:number = await response.json();
    return totalBunniesDB;
}

async function getCompletedGoalsCounts() {
    const response = await fetch('/api/goals/complete');
    const data = await response.json();
    let tasksCompleted: number = data.completedGoals;
    let tasksNotCompleted: number = data.notcompletedGoals;
    bunnyAnnouncement(tasksCompleted);
    setTimeout(makeBunnies,1900,tasksCompleted);
    setTimeout(makeSleepingBunnies,2500,tasksNotCompleted)
    // console.log(JSON.stringify(data,null,2));
    return tasksCompleted;
}

function bunnyAnnouncement(tasksCompleted: number) {
    const oneBunnyMsg = ["Yipee! A cute little bunny !","One funny bunny.","Who's the cutest bunny? Yes you are.","Is that a rabbit in your pocket?"];
    const manyBunnyMsg = [`Yay! ${tasksCompleted} bouncy bunnies`,`${tasksCompleted} more bunnies for you`, `${tasksCompleted} bunnies? yes, please`,`Oi! ${tasksCompleted} bunnies hopped in`,`${tasksCompleted} bunnies have joined the farm`];
    bunnyCountMsg.style.display = "inline";
    if (tasksCompleted == 0) {
        bunnyCountMsg.textContent = 'aww, no bunnies';
    }
    else if (tasksCompleted == 1) {
        bunnyCountMsg.textContent = oneBunnyMsg[Math.floor(Math.random() * oneBunnyMsg.length)];
    }
    else {
        bunnyCountMsg.textContent = manyBunnyMsg[Math.floor(Math.random() * manyBunnyMsg.length)];
    }
    setTimeout(removeAnnouncement,1500);
}

function removeAnnouncement() {
    bunnyCountMsg.textContent = '';
}

function repopulateBunnies(totalBunniesDB: number) {
    console.log('repopulate bunnies',totalBunniesDB);
	for (let i: number = 0; i<totalBunniesDB; i++) {
		makeBunny(i);
	}
}

function makeBunnies(tasksCompleted: number) {
    console.log('make new bunnies',tasksCompleted);
	for (let i: number = 0; i<tasksCompleted; i++) {
		makeBunny(i);
	}
}

function makeBunny(i : any) {
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

function addIds(bunnyArray : any) {
    bunnyArray.forEach((bunnyObject : any,i : number) => {
        bunnyObject.setAttribute('class',`bunny`);
        bunnyObject.setAttribute('id',`bunny${i+1}`);
    });
}

function makeSleepingBunnies(tasksNotCompleted: number) {
    console.log('make sleeping bunnies',tasksNotCompleted);
	for (let i: number = 0; i<tasksNotCompleted; i++) {
		makeSleepingBunny(i);
	}
}

function makeSleepingBunny(i : any) {
    console.log(i);
	// setTimeout (function() {
    // 	const bunny = document.createElement("img");
    //     let randTopPosition = Math.random() * (86) + 15; // (101 - 15) + 15
    //     let randLeftPosition = Math.random() * (85); // (85 - 0) + 0
    //     bunny.src = bunnyColours[i % bunnyColours.length];
    //     bunny.classList.add("bunnyAppear","bunny");
    //     bunny.style.top = `calc( ${randTopPosition}% - 108px)`;
    //     bunny.style.left = `${randLeftPosition}%`;
    //     bunnyPen.appendChild(bunny);
    //     bunnyArray.push(bunny);
    //     addIds(bunnyArray);
    // },400*i);
}

function randomBunnyAnimation(e : any) {
    let randomAnimation = Math.random();
    console.log(randomAnimation);
    if (randomAnimation <= .2) {
        bunnyCount(bunnyArray);
    }
    else if ((randomAnimation > .2) && (randomAnimation <= .4)) {
        bunnyJoke();
    }
    else if (randomAnimation >= .99) {
        bunnyRush();
    }
    else {
        bunnyHop(e);
    }
    e.target.onanimationend = () => {
        e.target.classList.remove("bunnyAppear","bunnyHop");
    };
}

function bunnyCount(bunnyArray) {
    console.log('bunny count');
    console.log(bunnyArray);
    console.log(bunnyArray.length);
    // setInterval(rollCall,200);
    bunnyArray.forEach(bunny => {
        bunny.classList.add("bunnyHop");
        console.log(bunny);
        bunny.onanimationend = () => {
            bunny.classList.remove("bunnyHop");
        }
    });
}

// function rollCall() {
//     bunnyArray.forEach(bunny => {
//         bunny.classList.add("bunnyHop");
//         console.log(bunny);
//         bunny.onanimationend = () => {
//             bunny.classList.remove("bunnyHop");
//         }
//     });
// }

function bunnyJoke() {
    bunnyJokeBubble.textContent = bunnyJokesArray[Math.floor(Math.random() * bunnyJokesArray.length)];
    bunnyJokeBubble.style.display = "block";
    setTimeout(removeJoke,4000);
}

function removeJoke() {
    bunnyJokeBubble.style.display = "none";
}

function bunnyRush() {
    let penBunnies = document.querySelectorAll('.bunny');
    penBunnies.forEach(penBunny => {
        if ((penBunny as HTMLElement).style.left <= "40") {
            penBunny.classList.add("bunny-left");
        }
        else {
            penBunny.classList.add("bunny-right");
        }
        setTimeout(() => {
            penBunny.classList.remove("bunny-left","bunny-right");
        }, 1500);
    });
}

function bunnyHop(e : any) {
    e.target.classList.add("bunnyHop");
}

window.addEventListener('load',populateBunnies);