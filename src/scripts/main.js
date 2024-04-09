const mainNavigation = document.querySelector('#main-navigation');
const showMenuButton = document.querySelector('#show-menu-button');
const letsGoButton = document.querySelector('#lets-go-button');
const splashScreen = document.querySelector('#splash-screen') as HTMLElement;
const mainMenu = document.querySelector('#main-menu') as HTMLElement;
const sections = document.querySelectorAll<HTMLElement>('.nav-section');

mainNavigation.addEventListener('click',transitionSection);
showMenuButton.addEventListener('click',showMenu);
letsGoButton.addEventListener('click',moveSplash);

function transitionSection(e) {
	sections.forEach ((section) => {
		section.style.zIndex="0";
	});
	let sectionClicked = (e.target.dataset.menu);
	let activeSection = document.querySelector(`#${sectionClicked}`) as HTMLElement;
	activeSection.style.zIndex="1";
	mainMenu.style.transform="translateY(-102dvh)";
}

function showMenu() {
	mainMenu.style.transform="translateY(0dvh)";
}

function moveSplash() {
	splashScreen.style.transform="translateY(-102dvh)";
}
