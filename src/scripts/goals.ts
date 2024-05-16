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

async function populateGoals(inputGoal) {
    inputGoal.value = "";
    const goals = await fetch('/api/goals').then(res => res.json());
    goalsSection.innerHTML = "";
    goals.forEach(goal => {
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
        cbtn.setAttribute('data-goal-complete','no');
        cbtn.setAttribute('data-id',goal.id);
        dbtn.textContent = "x";
        dbtn.classList.add('delete-goal-button');
        dbtn.setAttribute('data-id',goal.id);
        li.append(img,cbtn,div,dbtn);
        goalsSection.appendChild(li);
    });
}

// function completeGoal(e : any) {
//     if (e.target.dataset.goalComplete == 'no') {
//         e.target.dataset.goalComplete = 'yes';
//         e.target.parentElement.firstElementChild.src = "tikedfilled.svg";
//         e.target.parentElement.children[2].classList.add('goal-completed');
//     }
//     else if (e.target.dataset.goalComplete == 'yes') {
//         e.target.dataset.goalComplete = 'no';
//         e.target.parentElement.firstElementChild.src = "tikbox.svg";
//         e.target.parentElement.children[2].classList.remove('goal-completed');
//     }
//     console.log(`goal completed: ${e.target.dataset.goalComplete}`);
// }

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
            repopulateGoals();
        }
    }
    catch (error) {
        console.log('id is',id);
        console.error('delete gave an error : ' , error);
    }
}

async function repopulateGoals() {
    const response = await fetch('/api/goals');
    const goals = await response.json();
    goalsSection.innerHTML = "";
    goals.forEach(goal => {
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
        cbtn.setAttribute('data-goal-complete','no');
        cbtn.setAttribute('data-id',goal.id);
        dbtn.textContent = "x";
        dbtn.classList.add('delete-goal-button');
        dbtn.setAttribute('data-id',goal.id);
        li.append(img,cbtn,div,dbtn);
        goalsSection.appendChild(li);
    });
}

goalsSection.addEventListener('click',(ev) => {
    const target = ev.target as Element;
    const id = Number(target.getAttribute('data-id'));
    
    if (target.classList.contains('complete-goal-button')) {
        const completed = target.getAttribute('data-goal-completed');
        console.log('completed status is ',completed);
        console.log('complete goal button clicked for ',id);
        completeGoal(id,completed);
    }
    else if (target.classList.contains('delete-goal-button')) {
        console.log('delete button clicked for ',id)
        deleteGoal(id);
        repopulateGoals();
    }
});
