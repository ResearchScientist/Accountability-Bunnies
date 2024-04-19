const date = new Date();
const dateOptions = {weekday: "long" as const};
let todayweekday = new Intl.DateTimeFormat("en-US",dateOptions).format(date);
const tapFarmMsg = document.querySelector('#tap-farm-msg') as HTMLElement;
const tapFarmButton = document.querySelector('#tap-farm-button') as HTMLElement;

let totalBunnies: number = 4;

function onSaturday() {
    if (todayweekday == 'Friday') {
    	tapFarmMsg.style.display = "inline";
    	tapFarmButton.style.display = "inline";
	}
	else {
		tapFarmMsg.style.display = "none";
       	tapFarmButton.style.display = "none";
      	console.log('tap the farm on Saturday');
	}
}

onSaturday();