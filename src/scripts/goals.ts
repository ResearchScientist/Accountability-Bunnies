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
        // tikComplete(cbtn); NEW commented out
    });
}

// NEW added function
function tikCompleteGoal(target: any, id: number, completed: string) {
    if (completed == 'no') {
        console.log('before click',target);
        target.parentElement.firstElementChild.src = "tikedfilled.svg";
        target.parentElement.children[2].classList.add('goal-completed');
        target.setAttribute('data-goalcomplete','yes');
    }
    else if (completed == 'yes') {
        console.log('before click',target);
        target.parentElement.firstElementChild.src = "tikbox.svg";
        target.parentElement.children[2].classList.remove('goal-completed');
        target.setAttribute('data-goalcomplete','no');
    }
    console.log('after click',target);
    updateCompleteGoalDB(target,id,completed);
}

// NEW added function
async function updateCompleteGoalDB(target: any, id: number, completed: string) {
    let originalCompleted = completed;
    let updatedCompleted = target.getAttribute('data-goalcomplete');
    console.log('original completed',originalCompleted);
    console.log(id,updatedCompleted);
    try {
        console.log('patching');
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
        // repopulateGoals();
    }
    catch (error) {
        console.error('Error: ', error);
        // revert changes
    }
}

// NEW comment out
// async function completeGoal(target: any, id: number, completed: string) { // added target
//     let originalSrc = target.parentElement.firstElementChild.src = "tikedfilled.svg";  // added from here
//     let originalClassList = [...target.parentElement.children[2].classList];
//     if (target.dataset.goalcomplete == 'yes') {
//         target.parentElement.firstElementChild.src = "tikedfilled.svg";
//         target.parentElement.children[2].classList.add('goal-completed');
//     }
//     else if (target.dataset.goalcomplete == 'no') {
//         target.parentElement.firstElementChild.src = "tikbox.svg";
//         target.parentElement.children[2].classList.remove('goal-completed');
//     }                                                                       // to here
//     try {
//         const response = await fetch(`/api/goals/${id}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ completed }),
//         });
//         if (!response.ok) {
//             throw new Error('Network response not ok');
//         }
//         repopulateGoals();
//     }
//     catch (error) {
//         console.error('Error: ', error);
//         target.parentElement.firstElementChild.src = originalSrc; // revert changes
//         target.parentElement.children[2].classList = originalClassList;
//     }
// }

// function tikComplete(cbtn: any) {
//     if (cbtn.dataset.goalcomplete == 'yes') {
//         cbtn.parentElement.firstElementChild.src = "tikedfilled.svg";
//         cbtn.parentElement.children[2].classList.add('goal-completed');
//     }
//     else if (cbtn.dataset.goalcomplete == 'no') {
//         cbtn.parentElement.firstElementChild.src = "tikbox.svg";
//         cbtn.parentElement.children[2].classList.remove('goal-completed');
//     }
// }

function hideGoal(target) {
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
        // tikComplete(cbtn); NEW commented out
    });
}

goalsSection.addEventListener('click',(ev) => {
    const target = ev.target as Element;
    const id = Number(target.getAttribute('data-id'));
    if (target.classList.contains('complete-goal-button')) {
        const completed = target.getAttribute('data-goalcomplete');
        tikCompleteGoal(target,id,completed); // NEW
        // completeGoal(target,id,completed); // added target NEW commented out
    }
    else if (target.classList.contains('delete-goal-button')) {
        hideGoal(target);
        deleteGoal(id);
    }
});

window.onload = () => {
    repopulateGoals();
};