const defaultTaskContainer = document.querySelector('.defaultTodoContainer .todoList')
userId = JSON.parse(localStorage.getItem('codringData')).userId

setDefaultTaskData()
displayAllDefaultTask().then(() => checkForDoneTask())

function setDefaultCheckAnimations() {
    const containers = document.querySelectorAll('.defaultTodoContainer .checkMark')
    
    for (let i = 0; i < containers.length; i++) {
        const container = containers[i];
        const animation = lottie.loadAnimation({
            container: container, // Required
            path: '../../img/checkList-animation.json',
            renderer: 'svg',
            loop: false,
            autoplay: false,
            name: `checkmark${i}`,
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
}

async function displayAllDefaultTask() {
    let defaultTaskList
    let userDefaultTaskList

    // Get all default todoList
    await fetch('/db/getdefaultTodoList')
    .then(response => response.json())
    .then(result => defaultTaskList = result)

    // Get all default todoList of the user
    await fetch('/db/getUserDefaultTodoList', { method: 'POST', body: userId })
    .then(response => response.json())
    .then(result => userDefaultTaskList = result)

    // Check if user has all default tasks
    if (defaultTaskList.length == userDefaultTaskList.length) {
        for (let i = 0; i < defaultTaskList.length; i++) {
            displayDefaultTask(defaultTaskList[i])
        }
    } else {
        // Case where user doesn't have all default task saved in his profil
        await setAllDefaultTaskInUserProfil()
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
    .then(async (defaultTodoList) => {
        for (let i = 0; i < defaultTodoList.length; i++) {
            const task = defaultTodoList[i];
            const taskElementContainer = document.getElementById(task.taskId)
            const taskElement = taskElementContainer.querySelector('.checkMark')
            if (task.isDone) {
                taskElement.classList.add('check')
                taskElement.parentElement.parentElement.classList.add('taskDone')
            } else {
                taskElement.classList.add('uncheck')
            }
        }
    })
    setDefaultCheckAnimations()
    setDefaultTaskData()
}

async function checkIfTaskActive(taskId) {
    let defaultTodoList
    await fetch('/db/getDefaultTodoList').then((result) => defaultTodoList = result)

    for (let i = 0; i < defaultTodoList.length; i++) {
        const defaultTask = defaultTodoList[i];
        if (defaultTask._id == taskId) {
            return true
        }
    }
    return false
}

async function changeDefaultTaskStatus(taskId) {
    // Toggle the "done" or "undone" status of a task
    const task = document.getElementById(taskId)
    task.classList.toggle('taskDone')
    
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

async function setAllDefaultTaskInUserProfil() {
    // Save all default task in the profil of the user
    let defaultTaskList
    // Get all default task
    await fetch('/db/getDefaultTodoList')
    .then(response => response.json())
    .then(result => defaultTaskList = result)

    const data = {
        userId: userId,
        defaultTaskList: defaultTaskList
    }

    await fetch('/db/setAllDefaultTaskInUserProfil', { method: 'POST', body: JSON.stringify(data) })
    .then(() => console.log('done'))
}
