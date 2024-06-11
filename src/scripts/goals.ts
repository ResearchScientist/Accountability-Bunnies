export { repopulateGoals }

const inputGoalForm = document.querySelector('#input-goal-form') as HTMLElement;
const inputGoal = document.querySelector('#input-goal') as HTMLInputElement;
const addGoalButton = document.querySelector('#add-goal-button');
const goalsSection = document.querySelector('#goals-section');

inputGoal.addEventListener('input',() => {
    const trimmedValue = inputGoal.value.trim();
    if (trimmedValue.length === 0 || !/^([a-zA-Z0-9,. ]+)?$/.test(trimmedValue)) {
        inputGoal.setCustomValidity("Please enter only letters and numbers.\nKeep on hoppin!");
    }
    else {
        inputGoal.setCustomValidity("");
    }
});

inputGoalForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    var data = JSON.stringify({ description: inputGoal.value });
    const response = await fetch('/api/goals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
    if (response.ok) {
        populateGoals(inputGoal);
    }
});

goalsSection.addEventListener('click',(ev) => {
    const target = ev.target as Element;
    const id = Number(target.getAttribute('data-id'));
    if (target.classList.contains('complete-goal-button')) {
        const completed = target.getAttribute('data-goalcomplete');
        tikCompleteGoal(target,id,completed); // NEW
    }
    else if (target.classList.contains('delete-goal-button')) {
        hideGoal(target);
        deleteGoal(id);
    }
});

async function populateGoals(inputGoal: HTMLInputElement) {
    inputGoal.value = "";
    const goals = await fetch('/api/goals').then(res => res.json());
    goalsSection.innerHTML = "";
    goals.forEach((goal: any) => {
        let li = document.createElement('li');
        let img = document.createElement('img');
        let div = document.createElement('div');
        let cbtn = document.createElement('button');
        let dbtn = document.createElement('button');
        li.classList.add('goal-item');
        img.src = "tikbox.svg";
        img.alt = "tikbox";
        img.classList.add('tikbox');
        div.classList.add('goal-text');
        div.textContent = goal.description;
        cbtn.classList.add('complete-goal-button');
        cbtn.ariaLabel = "toggle goal complete";
        cbtn.setAttribute('data-goalcomplete',goal.completed);
        cbtn.setAttribute('data-id',goal.id);
        dbtn.textContent = "x";
        dbtn.classList.add('delete-goal-button');
        dbtn.setAttribute('data-id',goal.id);
        li.append(img,cbtn,div,dbtn);
        goalsSection.appendChild(li);
        tikComplete(cbtn);
    });
}

function tikComplete(cbtn: any) {
    if (cbtn.dataset.goalcomplete == 'yes') {
        cbtn.parentElement.firstElementChild.src = "tikedfilled.svg";
        cbtn.parentElement.children[2].classList.add('goal-completed');
    }
    else if (cbtn.dataset.goalcomplete == 'no') {
        cbtn.parentElement.firstElementChild.src = "tikbox.svg";
        cbtn.parentElement.children[2].classList.remove('goal-completed');
    }
}

function tikCompleteGoal(target: any, id: number, completed: string) {
    if (completed == 'no') {
        target.parentElement.firstElementChild.src = "tikedfilled.svg";
        target.parentElement.children[2].classList.add('goal-completed');
        target.setAttribute('data-goalcomplete','yes');
    }
    else if (completed == 'yes') {
        target.parentElement.firstElementChild.src = "tikbox.svg";
        target.parentElement.children[2].classList.remove('goal-completed');
        target.setAttribute('data-goalcomplete','no');
    }
    updateCompleteGoalDB(target,id,completed);
}

async function updateCompleteGoalDB(target: any, id: number, completed: string) {
    let originalCompleted = completed;
    let updatedCompleted = target.getAttribute('data-goalcomplete');
    try {
        const response = await fetch(`/api/goals/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ updatedCompleted }),
        });
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
    }
    catch (error) {
        console.log('db update error',error)
        console.error('Error: ',error);
        // revert changes
        target.setAttribute('data-goalcomplete',originalCompleted);
        if (target.dataset.goalcomplete == 'yes') {
            target.parentElement.firstElementChild.src = "tikedfilled.svg";
            target.parentElement.children[2].classList.add('goal-completed');
        }
        else if (target.dataset.goalcomplete == 'no') {
            target.parentElement.firstElementChild.src = "tikbox.svg";
            target.parentElement.children[2].classList.remove('goal-completed');
        }
    }
}

function hideGoal(target: any) {
    target.parentElement.style.display = 'none';
}

async function deleteGoal(id: number) {
    try {
        const response = await fetch(`/api/goals/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('network response not ok');
        }
        if (response.status !== 204) {
            const data = await response.json();
            console.log(id , 'successfully deleted ' , data);
        }
        repopulateGoals();
    }
    catch (error) {
        console.error('delete gave an error : ' , error);
    }
}

async function repopulateGoals() {
    const response = await fetch('/api/goals');
    const goals = await response.json();
    goalsSection.innerHTML = "";
    goals.forEach((goal: any) => {
        let li = document.createElement('li');
        let img = document.createElement('img');
        let div = document.createElement('div');
        let cbtn = document.createElement('button');
        let dbtn = document.createElement('button');
        li.classList.add('goal-item');
        img.src = "tikbox.svg";
        img.alt = "tikbox";
        img.classList.add('tikbox');
        div.classList.add('goal-text');
        div.textContent = goal.description;
        cbtn.classList.add('complete-goal-button');
        cbtn.ariaLabel = "toggle goal complete";
        cbtn.setAttribute('data-goalcomplete',goal.completed);
        cbtn.setAttribute('data-id',goal.id);
        dbtn.textContent = "x";
        dbtn.classList.add('delete-goal-button');
        dbtn.setAttribute('data-id',goal.id);
        li.append(img,cbtn,div,dbtn);
        goalsSection.appendChild(li);
        tikComplete(cbtn);
    });
}

window.onload = () => {
    repopulateGoals();
};