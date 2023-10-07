//import Todo from "./Todo.js"

//const root = document.getElementById("root")


// let newTodo = new Todo(root)

// newTodo.render()

class TodoApp extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: "open"})
        let newTodo = new Todo(this.shadowRoot)
        newTodo.render()
    }
}

customElements.define("todo-app", TodoApp)