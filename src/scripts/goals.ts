const inputGoalForm = document.querySelector('#input-goal-form') as HTMLElement;
const addGoalButton = document.querySelector('#add-goal-button');
const goalsSection = document.querySelector('#goals-section');
// const deleteGoalButton = document.querySelector('#delete-goal-button');

// addGoalButton.addEventListener('click',addGoal);

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
        inputGoal.value = "";
        const goals = await fetch('/api/goals').then(res => res.json());
        const goalsSection = document.querySelector('#goals-section');
        goalsSection.innerHTML = "";
        goals.forEach(goal => {
            let li = document.createElement('li');
            let img = document.createElement('img');
            let div = document.createElement('div');
            let cbtn = document.createElement('button');
            let dbtn = document.createElement('button');
            // cbtn.addEventListener('click',completeGoal);
            // dbtn.addEventListener('click',deleteGoal);
            li.classList.add('goal-item');
            img.src = "tikbox.svg";
            img.classList.add('tikbox');
            div.classList.add('goal-text');
            div.textContent = goal.description;
            cbtn.classList.add('complete-goal-button');
            cbtn.setAttribute('data-goal-complete','no');
            dbtn.textContent = "x";
            dbtn.classList.add('delete-goal-button');
            li.append(img,cbtn,div,dbtn);
            goalsSection.appendChild(li);
        });
    }
});

// function addGoal(e : any) {
//     e.preventDefault();
//     let goalText = inputGoal.value;
//     if (goalText) {
//         let li = document.createElement('li');
//         let img = document.createElement('img');
//         let div = document.createElement('div');
//         let cbtn = document.createElement('button');
//         let dbtn = document.createElement('button');
//         cbtn.addEventListener('click',completeGoal);
//         dbtn.addEventListener('click',deleteGoal);
//         li.classList.add('goal-item');
//         img.src = "tikbox.svg";
//         img.classList.add('tikbox');
//         div.textContent = goalText;
//         div.classList.add('goal-text');
//         cbtn.classList.add('complete-goal-button');
//         cbtn.setAttribute('data-goal-complete','no');
//         dbtn.textContent = "x";
//         dbtn.classList.add('delete-goal-button');
//         li.append(img,cbtn,div,dbtn);
//         goalsSection.appendChild(li);
//     }
//     inputGoal.value = "";
// }

function completeGoal(e : any) {
    if (e.target.dataset.goalComplete == 'no') {
        e.target.dataset.goalComplete = 'yes';
        e.target.parentElement.firstElementChild.src = "tikedfilled.svg";
        e.target.parentElement.children[2].classList.add('goal-completed');
    }
    else if (e.target.dataset.goalComplete == 'yes') {
        e.target.dataset.goalComplete = 'no';
        e.target.parentElement.firstElementChild.src = "tikbox.svg";
        e.target.parentElement.children[2].classList.remove('goal-completed');
    }
    console.log(`goal completed: ${e.target.dataset.goalComplete}`);
}

// async function deleteGoal(event) {
//     const id = event.target.getAttribute('data-id');
//     console.log(id);
//     console.log(typeof(id));
//     try {
//         const response = await fetch(`/api/goals/${id}`, {
//             method: 'DELETE',
//         });
//         if (!response.ok) {
//             throw new Error('network response not ok');
//         }
//         const data = await response.json();
//         console.log(id);
//         console.log('successfully deleted ' , data);
//     }
//     catch (error) {
//         console.log('id is',id);
//         console.error('delete gave an error : ' , error);
//     }
// }

// window.deleteGoal = async function(id) {

async function deleteGoal(id) {
    try {
        const response = await fetch(`/api/goals/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('network response not ok');
        }
        const data = await response.json();
        console.log(id);
        console.log('successfully deleted ' , data);
    }
    catch (error) {
        console.log('id is',id);
        console.error('delete gave an error : ' , error);
    }
}

goalsSection.addEventListener('click',(ev) => {
    const target = ev.target as Element;
    const id = target.getAttribute('data-id');
    if (target.classList.contains('complete-goal-button')) {
        console.log('complete goal');
        completeGoal(id);
    }
    else if (target.classList.contains('delete-goal-button')) {
        console.log('delete ',id)
        console.log('type is ', typeof(id));
        deleteGoal(id);
    }
});
