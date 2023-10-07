

class Todo {
    constructor(elem) {
        this.state = {
            task: "",
            todos: [],
            editId: "",
            editTask: "",
            isEdit: false
        }
        this.elem = elem
        this.setState = this.setState.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.addTask = this.addTask.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.prepareToEdit = this.prepareToEdit.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.Form = this.Form.bind(this)
        this.TextInput = this.TextInput.bind(this)
        this.List = this.List.bind(this)
        this.Header = this.Header.bind(this)
        this.render = this.render.bind(this)
    }
    setState(newState) {
        return Object.assign(this.state, newState)
    }
    handleInput(e) {
        let { name, value } = e.target
        this.setState({
            ...this.state,
            [name]: value
        })
        return this
    }
    addTask() {
        let newTask = {}
        newTask.id = Math.ceil(Math.random() * 900000000000)
        newTask.task = this.state.task
        this.setState({
            ...this.state,
            todos: [newTask, ...this.state.todos],
            task: ""
        })
        this.render()
        return this
    }
    handleDelete(todo) {
        let allTheOthers = this.state.todos.filter(task => task.id !== todo.id)
        this.setState({
            ...this.state,
            todos: allTheOthers
        })
        this.render()
        return this
    }
    prepareToEdit(todo) {
        this.setState({
            ...this.state,
            isEdit: true,
            editId: todo.id,
            editTask: todo.task
        })
        this.render()
        return this
    }
    handleEdit(e) {
        e.preventDefault()
        let youveChanged = this.state.todos.map(todo => {
            if (todo.id === this.state.editId) {
                todo.task = this.state.editTask
            }
            return todo
        })
        this.setState({
            ...this.state,
            todos: youveChanged,
            editTask: "",
            isEdit: false,
            editId: ""
        })
        this.render()
        return this
    }
    Form(handleSubmit, btnTxt, childElems) {
        const form = document.createElement("form")
        form.addEventListener("submit", handleSubmit)
        if (Array.isArray(childElems)) {
            childElems.forEach(child => form.append(child))
        } else {
            form.append(childElems)
        }
        const button = document.createElement("button")
        button.setAttribute("type", "submit")
        button.innerText = btnTxt
        form.append(button)
        return form
    }
    TextInput(name, labelTxt) {
        const wrapper = document.createElement("div")
        const label = document.createElement("label")
        label.setAttribute("for", name)
        label.innerText = labelTxt
        wrapper.append(label)
        const input = document.createElement("input")
        input.setAttribute("id", name)
        input.setAttribute("name", name)
        input.setAttribute("type", "text")
        input.required = true
        input.value = this.state[name]
        input.addEventListener("input", (e) => this.handleInput(e))
        wrapper.append(input)
        return wrapper
    }
    List() {
        let ul = document.createElement("ul")
        ul.innerHTML = ""
        if (this.state.todos.length > 0) {
            this.state.todos.forEach(todo => {
                if (this.state.isEdit && this.state.editId === todo.id) {
                    let li = document.createElement("li")
                    let editInput = this.TextInput("editTask", "Task to change: ")
                    li.append(this.Form(this.handleEdit, "CHANGE", editInput))
                    ul.append(li)
                } else {
                    let li = document.createElement("li")
                    let h3 = document.createElement("h3")
                    h3.innerText = todo.task
                    li.append(h3)
                    let buttonDiv = document.createElement("div")
                    let deleteBtn = document.createElement("button")
                    deleteBtn.innerText = "DELETE"
                    deleteBtn.addEventListener("click", () => this.handleDelete(todo))
                    buttonDiv.append(deleteBtn)
                    let editBtn = document.createElement("button")
                    editBtn.innerText = "EDIT"
                    editBtn.addEventListener("click", () => this.prepareToEdit(todo))
                    buttonDiv.append(editBtn)
                    li.append(buttonDiv)
                    ul.append(li)
                }
            })
        } else {
            let li = document.createElement("li")
            let h3 = document.createElement("h3")
            h3.innerText = "There is nothing here to do!"
            li.append(h3)
            ul.append(li)
        }
        return ul
    }
    Header() {
        let header = document.createElement("header")
        let h1 = document.createElement("h1")
        h1.innerText = "What can we do?"
        header.append(h1)
        let taskInput = this.TextInput("task", "Needed task: ")
        header.append(this.Form(this.addTask, "ADD", taskInput))
        return header
    }
    render() {
        this.elem.innerHTML = ""
        this.elem.append(this.Header())
        this.elem.append(this.List())
        return this.elem
    }
}

//export default Todo