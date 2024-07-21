/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Card extends Component {
  static template = "awesome_owl.card";
  //static props = ["title", "content"];
  //

  setup() {
    this.state = useState({ expanded: true });
  }

  toggle() {
    //console.log("STATE: ", this.state.expanded);
    this.state.expanded = !this.state.expanded;
  }
}
