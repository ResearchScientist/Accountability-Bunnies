const inputGoal = document.querySelector('#input-goal') as HTMLInputElement;
const addGoalButton = document.querySelector('#add-goal-button');
const goalsSection = document.querySelector('#goals-section');
const deleteGoalButton = document.querySelector('#delete-goal-button');

addGoalButton.addEventListener('click',addGoal);

function addGoal(e) {
    e.preventDefault();
    let goalText = inputGoal.value;
    if (goalText) {
        let li = document.createElement('li');
        let img = document.createElement('img');
        let div = document.createElement('div');
        let btn = document.createElement('button');
        btn.addEventListener('click',deleteGoal);
        li.classList.add('goal-item');
        img.src = "tikbox.svg";
        img.classList.add('tikbox');
        div.textContent = goalText;
        div.classList.add('goal-text');
        btn.textContent = "x";
        btn.classList.add('delete-goal-button');
        li.append(img,div,btn);
        goalsSection.appendChild(li);
    }
    inputGoal.value = "";
}


function deleteGoal(event) {
    console.log('delete goal');
    let goal = event.target.parentElement;
    goalsSection.removeChild(goal);
}