/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { useAutoFocus } from "../utils/utils";
import { TodoItem } from "./todo_item/todo_item";

export class TodoList extends Component {
  static template = "awesome_owl.todo_list";
  static components = { TodoItem };

  nextId = 1;

  setup() {
    this.todos = useState([]);
    useAutoFocus("todo-input");
  }

  toggleTodo(todoId) {
    //const index = this.todos.findIndex((todo) => todo.id === todoId);
    //this.todos[index].isCompleted = !this.todos[index].isCompleted;
    todoId.isCompleted = !todoId.isCompleted;
  }

  removeTodo(todoId) {
    const index = this.todos.findIndex((todo) => todo.id === todoId);
    this.todos.splice(index, 1);
  }

  addTodo(event) {
    // is enter pressed
    if (event.keyCode === 13) {
      const text = event.target.value.trim();
      if (text) {
        this.todos.push({
          id: this.nextId++,
          description: text,
          isCompleted: false,
        });
        event.target.value = "";
      }
    }
  }
}
