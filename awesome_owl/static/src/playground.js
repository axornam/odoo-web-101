/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { Counter } from "./counter/counter.js";
import { Card } from "./card/card.js";
import { TodoList } from "./todo_list/todo_list.js";

export class Playground extends Component {
  static template = "awesome_owl.playground";

  static components = { Card, Counter, TodoList };

  setup() {
    this.state = useState({ sum: 0 });
  }

  incrementSum() {
    this.state.sum++;
  }
}
