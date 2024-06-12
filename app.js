const $ = el => document.querySelector(el)
document.getElementById('form-tasks').addEventListener('submit', saveTask)

function saveTask(e) {
    const title = $('#title').value
    const description = $('#description').value

    const task = {
        title, 
        description
    }

    //localStorage.setItem('tasks', JSON.stringify(task))
    if (localStorage.getItem('tasks') === null) {
        const tasks = []
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    else {
        const tasks = JSON.parse(localStorage.getItem('tasks'))
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    getTasks()
    document.getElementById('form-tasks').reset()
    e.preventDefault()
    
}

function getTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    const taskView = document.getElementById('tasks')

    taskView.innerHTML = ''

    for (let i = 0; i < tasks.length; i++) {
        let title = tasks[i].title
        let description = tasks[i].description

        taskView.innerHTML += `
            <div class="card mb-3"> 
                <div class="card-body"> 
                    <p>${title} - ${description}</p>
                    <a class="btn btn-danger" onclick="deleteTask('${title}')">Delete</a> 
                </div>
            </div>`
    }   
}

function deleteTask(title) {
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].title == title) {
            tasks.splice(i, 1)
        }   
    }

    localStorage.setItem('tasks', JSON.stringify(tasks))
    getTasks()
}
// Mostrar tareas al iniciar la página
getTasks()
