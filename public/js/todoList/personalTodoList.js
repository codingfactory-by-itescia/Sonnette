const input = document.querySelector('.addTaskContainer input')
const taskContainer = document.querySelector('.personalTodoContainer .todoList')
const addTaskBtn = document.querySelector('.addTaskContainer img')
const userId = JSON.parse(localStorage.getItem('codringData')).userId

setTaskData()
displayAllTask()

// Add a task when click on the button or when press the enter key
addTaskBtn.addEventListener('click', () => addNewTask(input.value))
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addNewTask(input.value)
})

async function displayAllTask() {
    // Get all task of the user
    let taskList

    await fetch('/db/getTodoList', { method: 'POST', body: userId})
    .then(response => response.json())
    .then(result => taskList = result)

    for (let i = 0; i < taskList.length; i++) {
        displayTask(taskList[i])
    }
}

function displayTask(task) {
    // Display the new task in the container
    taskContainer.insertAdjacentHTML('beforeend', `
        <div class="task ${task.isDone ? 'taskDone': ''}" id="${task._id}">
            <div class="completeTaskContainer">
                <img src="../img/blackDownArrow.png" alt="Compléter la case" onclick="changeTaskStatus('${task._id}')">
            </div>
            <div class="taskTitle">
                <p>${task.taskBody}</p>
            </div>
            <img src="../img/close.png" alt="Supprimer la tâche" class="deleteTaskBtn" onclick="deleteTask('${task._id}')">
        </div>
    `)
    setTaskData()
}

async function addNewTask(taskBody) {
    //if (task.length > 3) {
        input.value = ''

        const task = {
            userId: userId,
            taskBody: taskBody,
            isDone: false
        }
        await fetch('/db/setNewTask', { method:'POST', body: JSON.stringify(task) })
        .then(response => response.json())
        .then(task => displayTask(task))

        setTaskData()
    //}
}

async function deleteTask(taskId) {
    const data = {
        taskId: taskId,
        userId: userId
    }
    taskContainer.removeChild(document.getElementById(taskId))
    await fetch('/db/deleteTask', { method: 'POST', body: JSON.stringify(data) })

    setTaskData()
}

async function changeTaskStatus(taskId) {
    // Toggle the "done" or "undone" status of a task
    document.getElementById(taskId).classList.toggle('taskDone')
    
    setTaskData()
    const data = {
        taskId: taskId,
        userId: userId
    }
    await fetch('/db/changeTaskStatus', { method: 'POST', body: JSON.stringify(data) })
}

async function setTaskData() {
    // Get the total number of of task
    let taskLength

    await fetch('/db/getTodoList', { method: 'POST', body: userId})
    .then(response => response.json())
    .then(result => taskLength = result.length)

    // Get the total number of done task
    const taskList = document.querySelectorAll('.personalTodoContainer .task')
    let taskDoneCounter = 0

    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].classList.contains('taskDone')) taskDoneCounter++
    }

    // Display the task data and set style to progress circle
    document.querySelector('.personalTodoContainer .taskDoneTitle').innerHTML = `${taskDoneCounter} sur ${taskLength}`
    document.querySelector('.personalTodoContainer .progressCircle2').style.strokeDashoffset = `calc(57 - (57 * ${(taskDoneCounter / taskLength) * 100}) / 100)`
}
