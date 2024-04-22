const inputGoal = document.querySelector('#input-goal') as HTMLInputElement;
const addGoalButton = document.querySelector('#add-goal-button');
const goalsSection = document.querySelector('#goals-section');
const deleteGoalButton = document.querySelector('#delete-goal-button');

addGoalButton.addEventListener('click',addGoal);
// deleteGoalButton.addEventListener('click',deleteGoal);

function addGoal(e) {
    e.preventDefault();
    let goalText = inputGoal.value;
    console.log(goalText);
    if (goalText) {
        let li = document.createElement('li');
        let img = document.createElement('img');
        let btn = document.createElement('button');
        btn.addEventListener('click',deleteGoal);
        li.classList.add('goal-item');
        img.classList.add('tikbox');
        btn.textContent = "x";
        btn.classList.add('delete-goal-button');
        img.src = "tikbox.svg";
        li.appendChild(img);
        li.textContent = goalText;
        li.appendChild(btn);
        goalsSection.appendChild(li);
    }
    inputGoal.value = "";
}


function deleteGoal(event) {
    console.log('delete goal');
    let goal = event.target.parentElement;
    goalsSection.removeChild(goal);
}