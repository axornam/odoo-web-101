/** @odoo-module **/

import { Component } from "@odoo/owl";

export class TodoItem extends Component {
  static template = "awesome_owl.todo_item";
  static props = ["todo", "toggleTodo", "removeTodo"];

  toggleTodo() {
    this.props.toggleTodo(this.props.todo);
  }

  removeTodo() {
    this.props.removeTodo(this.props.todo.id);
  }
}
