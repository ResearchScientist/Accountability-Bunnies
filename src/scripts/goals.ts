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
        let cbtn = document.createElement('button');
        let dbtn = document.createElement('button');
        cbtn.addEventListener('click',completeGoal);
        dbtn.addEventListener('click',deleteGoal);
        li.classList.add('goal-item');
        img.src = "tikbox.svg";
        img.classList.add('tikbox');
        div.textContent = goalText;
        div.classList.add('goal-text');
        cbtn.classList.add('complete-goal-button');
        cbtn.setAttribute('data-goal-complete','no');
        dbtn.textContent = "x";
        dbtn.classList.add('delete-goal-button');
        li.append(img,cbtn,div,dbtn);
        goalsSection.appendChild(li);
    }
    inputGoal.value = "";
}

function completeGoal(e) {
    console.log('complete goal');
    if (e.target.dataset.goalComplete == 'no') {
        e.target.dataset.goalComplete = 'yes';
        e.target.parentElement.firstElementChild.src = "tikedfilled.svg";
    }
    else if (e.target.dataset.goalComplete == 'yes') {
        e.target.dataset.goalComplete = 'no';
        e.target.parentElement.firstElementChild.src = "tikbox.svg";
    }
    console.log(e.target.dataset.goalComplete);
}

function deleteGoal(event) {
    console.log('delete goal');
    let goal = event.target.parentElement;
    goalsSection.removeChild(goal);
}