/** @odoo-module **/

import { Component } from "@odoo/owl";

export class DashboardItem extends Component {
  static template = "awesome_dashboard.DashboardItem";
  static props = {
    size: { type: Number, optional: true, default: 1 },
    slots: { type: Object },
  };

  setup() {
    this.isSmall = this.env.isSmall;
    console.log("IS SMALL: ", this.isSmall);
  }
}
