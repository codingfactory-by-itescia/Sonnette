const defaultTaskContainer = document.querySelector('.defaultTodoContainer .todoList')
userId = JSON.parse(localStorage.getItem('codringData')).userId

setDefaultTaskData()
displayAllDefaultTask().then(() => checkForDoneTask())

async function displayAllDefaultTask() {
    // Get all task of the user
    let taskList

    await fetch('/db/getdefaultTodoList')
    .then(response => response.json())
    .then(result => taskList = result)

    for (let i = 0; i < taskList.length; i++) {
        displayDefaultTask(taskList[i])
    }
}

async function displayDefaultTask(task) {
    // Display the new task in the container
    defaultTaskContainer.insertAdjacentHTML('beforeend', `
        <div class="task" id="${task._id}">
            <div class="completeTaskContainer">
                <div class="checkMark" onclick="changeDefaultTaskStatus('${task._id}')"></div>
            </div>
            <div class="taskTitle">
                <p>${task.task}</p>
            </div>
        </div>
    `)
    setDefaultTaskData()
}

async function checkForDoneTask() {
    // Check if some tasks was already done to add the "taskDone" classlist
    // Get all default task of the user
    await fetch('/db/getUserDefaultTodoList', { method: 'POST', body: userId })
    .then(response => response.json())
    .then((defaultTodoList) => {
        for (let i = 0; i < defaultTodoList.length; i++) {
            const task = defaultTodoList[i];
            if (task.isDone) {
                const taskElement = document.getElementById(task.taskId)
                
                taskElement.classList.add('taskDone')
                taskElement.querySelector('.checkMark').style.backgroundImage = "url('../img/check.png')"
            }
        }
    })
    setDefaultTaskData()
}

async function changeDefaultTaskStatus(taskId) {
    // Toggle the "done" or "undone" status of a task
    const task = document.getElementById(taskId)
    task.classList.toggle('taskDone')
    
    if (task.classList.contains('taskDone')) {
        task.querySelector('.checkMark').style.backgroundImage = "url('../img/check.png')"
    } else {
        task.querySelector('.checkMark').style.backgroundImage = "url('../img/uncheck.png')"
    }
    
    const data = {
        taskId: taskId,
        userId: userId
    }
    await fetch('/db/changeDefaultTaskStatus', { method: 'POST', body: JSON.stringify(data) })
    .then(() => setDefaultTaskData())
}

async function setDefaultTaskData() {
    // Get the total number of of task
    let taskLength

    await fetch('/db/getDefaultTodoList')
    .then(response => response.json())
    .then(result => taskLength = result.length)

    // Get the total number of done task
    const taskList = document.querySelectorAll('.defaultTodoContainer .task')
    let taskDoneCounter = 0

    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].classList.contains('taskDone')) taskDoneCounter++
    }

    // Display the task data and set style to progress circle
    document.querySelector('.defaultTodoContainer .taskDoneTitle').innerHTML = `${taskDoneCounter} sur ${taskLength}`
    document.querySelector('.defaultTodoContainer .progressCircle2').style.strokeDashoffset = `calc(57 - (57 * ${(taskDoneCounter / taskLength) * 100}) / 100)`
}


//fetch('/db/addNewDefaultTask', { method: 'POST', body: 'Faire du sport' })
