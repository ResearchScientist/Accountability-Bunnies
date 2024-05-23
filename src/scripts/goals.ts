const inputGoalForm = document.querySelector('#input-goal-form') as HTMLElement;
const addGoalButton = document.querySelector('#add-goal-button');
const goalsSection = document.querySelector('#goals-section');

inputGoalForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    let inputGoal = document.querySelector('#input-goal') as HTMLInputElement;
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
        img.classList.add('tikbox');
        div.classList.add('goal-text');
        div.textContent = goal.description;
        cbtn.classList.add('complete-goal-button');
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

async function completeGoal(id: number, completed: string) {
    try {
        const response = await fetch(`/api/goals/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed }),
        });
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
        repopulateGoals();
    }
    catch (error) {
        console.error('Error: ', error);
    }
}

function tikComplete(cbtn) {
    if (cbtn.dataset.goalcomplete == 'yes') {
        cbtn.parentElement.firstElementChild.src = "tikedfilled.svg";
        cbtn.parentElement.children[2].classList.add('goal-completed');
    }
    else if (cbtn.dataset.goalcomplete == 'no') {
        cbtn.parentElement.firstElementChild.src = "tikbox.svg";
        cbtn.parentElement.children[2].classList.remove('goal-completed');
    }
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
        img.classList.add('tikbox');
        div.classList.add('goal-text');
        div.textContent = goal.description;
        cbtn.classList.add('complete-goal-button');
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

goalsSection.addEventListener('click',(ev) => {
    const target = ev.target as Element;
    const id = Number(target.getAttribute('data-id'));
    if (target.classList.contains('complete-goal-button')) {
        const completed = target.getAttribute('data-goalcomplete');
        completeGoal(id,completed);
    }
    else if (target.classList.contains('delete-goal-button')) {
        deleteGoal(id);
    }
});

window.onload = () => {
    repopulateGoals();
};