const setTodoForm = document.querySelector('.setTodoForm')
const todoListContainer = document.querySelector('.setTodoForm .todoList')
const todoListInput = document.querySelector('.setTodoForm input')
const addTaskBtn = document.querySelector('.setTodoForm img')
const emptyTodoListElement = document.querySelector('.setTodoForm .emptyTodoList')

displayAllDefaultTask()

// Add a task when click on the button or when press the enter key
addTaskBtn.addEventListener('click', (event) => {
    event.preventDefault()
    addNewDefaultTask(todoListInput.value)
})
todoListInput.addEventListener('keypress', (e) => {
    
    if (e.key === 'Enter') {
        e.preventDefault()
        addNewDefaultTask(todoListInput.value)
    }
})

async function displayAllDefaultTask() {
    // Get all task of the user
    let taskList

    await fetch('/db/getdefaultTodoList')
    .then(response => response.json())
    .then(result => taskList = result)

    for (let i = 0; i < taskList.length; i++) {
        displayDefaultTask(taskList[i])
    }

    // If there is no task, display the empty message by getting the length of all default task
    if (taskList.length == 0) emptyTodoListElement.style.display = 'flex'
}

function displayDefaultTask(task) {
    todoListContainer.insertAdjacentHTML('afterbegin', `
        <div class="task" id="${task._id}">
            <div class="taskTitle">
                <p>${task.task}</p>
            </div>
            <img src="../img/close.png" alt="Supprimer la tâche" class="deleteTaskBtn" onclick="deleteTask('${task._id}')">
        </div>
    `)
}

async function deleteTask(taskId) {
    todoListContainer.removeChild(document.getElementById(taskId))
    await fetch('/db/deleteDefaultTask', { method: 'POST', body: taskId })
    
    // If there is no task, display the empty message by getting the length of all default task
    await fetch('/db/getDefaultTodoList')
    .then(response => response.json())
    .then((todoList => {
        if (todoList.length == 0) emptyTodoListElement.style.display = 'flex'
        else emptyTodoListElement.style.display = 'none'
    }))
}

async function addNewDefaultTask(taskBody) {
    todoListInput.value = ''
    // Hide the empty todoList msg
    emptyTodoListElement.style.display = 'none'
    
    await fetch('/db/addNewDefaultTask', { method:'POST', body: taskBody })
    .then(response => response.json())
    .then(task => displayDefaultTask(task))
}
