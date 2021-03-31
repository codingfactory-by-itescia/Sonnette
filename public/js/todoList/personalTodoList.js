const input = document.querySelector('.addTaskContainer input')
const taskContainer = document.querySelector('.personalTodoContainer .todoList')
const addTaskBtn = document.querySelector('.addTaskContainer img')
let userId = JSON.parse(localStorage.getItem('codringData')).userId

setTaskData()
displayAllTask()

// Add a task when click on the button or when press the enter key
addTaskBtn.addEventListener('click', () => addNewTask(input.value))
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addNewTask(input.value)
})

function setAllCheckAnimations() {
    const containers = document.querySelectorAll('.personalTodoContainer .checkMark')

    for (let i = 0; i < containers.length; i++) {
        setCheckAnimation(containers[i])
    }
}

function setCheckAnimation(container) {
    const animation = lottie.loadAnimation({
        container: container, // Required
        path: '../../img/checkList-animation.json',
        renderer: 'svg',
        loop: false,
        autoplay: false,
    })

    if (container.classList.contains('check')) {
        animation.goToAndStop(90, true)
        animation.playSegments([0,56])
    } else {
        animation.goToAndStop(90, true)
        animation.playSegments([0,20])
    }

    container.addEventListener('click', () => {
        if (container.classList.contains('uncheck')) {
            container.classList.remove('uncheck')
            container.classList.add('check')

            animation.playSegments([20,56], true)
        } else {
            container.classList.remove('check')
            container.classList.add('uncheck')

            animation.setDirection(-1)
            animation.playSegments([56,20], true)
        }
    })
}

async function displayAllTask() {
    // Get all task of the user
    let taskList

    await fetch('/db/getPersonalTodoList', { method: 'POST', body: userId})
    .then(response => response.json())
    .then(result => taskList = result)

    for (let i = 0; i < taskList.length; i++) {
        displayTask(taskList[i])
    }
    setAllCheckAnimations()
}

function displayTask(task) {
    // Display the new task in the container
    taskContainer.insertAdjacentHTML('beforeend', `
        <div class="task ${task.isDone ? 'taskDone': ''}" id="${task._id}">
            <div class="completeTaskContainer">
                <div class="checkMark ${task.isDone ? 'check': 'uncheck'}" onclick="changeTaskStatus('${task._id}')"></div>
            </div>
            <div class="taskTitle">
                <p>${task.taskBody}</p>
            </div>
            <img src="../img/close.png" alt="Supprimer la tâche" class="deleteTaskBtn" onclick="deleteTask('${task._id}')">
        </div>
    `)
    const taskElement = document.getElementById(task._id)

    setTaskData()
}

async function addNewTask(taskBody) {
    input.value = ''
    
    const task = {
        userId: userId,
        taskBody: taskBody,
        isDone: false
    }
    await fetch('/db/setNewTask', { method:'POST', body: JSON.stringify(task) })
    .then(response => response.json())
    .then(task => {
        displayTask(task)
    
        const container = document.getElementById(task._id)
        setCheckAnimation(container.querySelector('.checkMark'))
        
        setTaskData()
    })
}

async function deleteTask(taskId) {
    const data = {
        taskId: taskId,
        userId: userId
    }
    taskContainer.removeChild(document.getElementById(taskId))
    
    await fetch('/db/deletePersonalTask', { method: 'POST', body: JSON.stringify(data) })
    .then(() => setTaskData())
}

async function changeTaskStatus(taskId) {
    // Toggle the "done" or "undone" status of a task
    const task = document.getElementById(taskId)
    task.classList.toggle('taskDone')
    

    const data = {
        taskId: taskId,
        userId: userId
    }
    await fetch('/db/changePersonalTaskStatus', { method: 'POST', body: JSON.stringify(data) })
    .then(() => setTaskData())
}

async function setTaskData() {
    // Get the total number of of task
    let taskLength

    await fetch('/db/getPersonalTodoList', { method: 'POST', body: userId})
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

    // If user has no task, display the empty message
    const emptyTodoListElement = document.querySelector('.personalTodoContainer .emptyTodoList')
    if (taskLength == 0) {
        emptyTodoListElement.style.display = 'block'
    } else {
        emptyTodoListElement.style.display = 'none'
    }
}

// When user clicks on the empty todo list link, display an example of task in the input
const emptyTodoListLink = document.querySelector('.emptyTodoList a')

emptyTodoListLink.addEventListener('click', () => {
    input.value = 'Faire des avions en papier'
    input.focus()
})

