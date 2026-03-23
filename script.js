const inputField = document.querySelector('.main-content .input-box input')
const inputButton = document.querySelector('.main-content .input-box button')
const ul = document.querySelector('.main-content .todo-box ul')
const h4 = document.querySelector('.main-content .todo-box h4')

let todos = JSON.parse(localStorage.getItem('todos')) || []

todos.forEach((todo) => {
  createTodo(todo)
})

toggleHeading()

inputButton.addEventListener('click', () => {
  if (inputField.value === '') {
    alert('Please Enter A Task')
    return
  }

  const todo = {
    id: Date.now(),
    text: inputField.value,
    completed: false,
  }

  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))

  createTodo(todo)
  toggleHeading()

  inputField.value = ''
})

ul.addEventListener('click', (e) => {
  if (e.target.tagName === 'I') {
    const li = e.target.parentElement
    const id = Number(li.dataset.id)

    li.remove()

    todos = todos.filter((todo) => todo.id !== id)

    localStorage.setItem('todos', JSON.stringify(todos))

    toggleHeading()
  }
})

ul.addEventListener('click', (e) => {
  if (e.target.tagName === 'SPAN') {
    const li = e.target.parentElement
    const id = Number(li.dataset.id)

    const todo = todos.find((todo) => todo.id === id)
    todo.completed = !todo.completed
    if (todo.completed) {
      e.target.classList.add('completed')
    } else {
      e.target.classList.remove('completed')
    }

    localStorage.setItem('todos', JSON.stringify(todos))
  }
})

function createTodo(todo) {
  const li = document.createElement('li')
  li.dataset.id = todo.id

  li.innerHTML = `
    <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
    <i class="fa-regular fa-trash-can"></i>
  `

  ul.append(li)
}

function toggleHeading() {
  if (ul.children.length === 0) {
    h4.style.display = 'block'
  } else {
    h4.style.display = 'none'
  }
}
