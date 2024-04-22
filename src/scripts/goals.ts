const inputGoal = document.querySelector('#input-goal') as HTMLInputElement;
const addGoalButton = document.querySelector('#add-goal-button');
const goalsSection = document.querySelector('#goals-section');
const deleteGoalButton = document.querySelector('#delete-goal-button');

addGoalButton.addEventListener('click',addGoal);
deleteGoalButton.addEventListener('click',deleteGoal);

function addGoal(e) {
    e.preventDefault();
    console.log('add goal');
    let goalText = inputGoal.value;
    console.log(goalText);
}


function deleteGoal() {
    console.log('delete goal');
}