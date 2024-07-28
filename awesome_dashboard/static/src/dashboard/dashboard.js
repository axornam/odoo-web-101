/** @odoo-module **/

import { Component, onWillStart, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { Layout } from "@web/search/layout";
import { dashboardRegistry } from "../dashboard_items.js";
import { DashboardItem } from "./dashboard_item/dashboard_item.js";

class AwesomeDashboard extends Component {
  static template = "awesome_dashboard.AwesomeDashboard";
  static components = { Layout, DashboardItem };

  async setup() {
    this.layoutConfig = { display: { controlPanel: {} } };

    this.actions = useService("action");
    this.orm = useService("orm");
    this.user = useService("user");
    this.statistics = useState(useService("awesome_dashboard.statistics"));
    this.items = dashboardRegistry.category("awesome_dashboard").getAll();
    //const dashboardItems = localStorage.getItem("dashboard_config");
    this.config = useState([]);

    onWillStart(async () => {
      this.dashboardItems = await this.fetchDashboardConfig();
      this.config = this.dashboardItems[0].dashboard ?? [];
      console.log("DASHBOARD ITEMS: ", this.dashboardItems, this.config);
    });
  }

  _isShown(itemId) {
    return itemId === this.config.find((e) => e === itemId);
  }

  _onInput(event) {
    const idx = this.config.findIndex((item) => item === event.target.name);
    console.log("EVENT NAME: ", event.target.name, idx);
    if (idx >= 0) {
      this.config.splice(idx, 1);
    } else {
      this.config.push(event.target.name);
    }
  }

  openLeads() {
    this.actions.doAction("base.action_partner_form");
  }

  async fetchDashboardConfig() {
    const user_id = this.user.userId;
    const dashboards = await this.orm.searchRead(
      "user.setting",
      [["user_id", "=", user_id]],
      ["user_id", "dashboard"],
      { limit: 1 }
    );
    return dashboards;
  }

  async saveDashboardConfig() {
    const user_id = this.user.userId;
    //localStorage.setItem("dashboard_config", JSON.stringify(this.config));
    let dashboard;
    if (this.dashboardItems.length) {
      dashboard = await this.orm.write(
        "user.setting",
        [this.dashboardItems[0].id],
        {
          id: this.dashboardItems[0].id,
          user_id: user_id,
          dashboard: this.config,
        }
      );
    } else {
      dashboard = await this.orm.create("user.setting", [
        {
          user_id: user_id,
          dashboard: this.config,
        },
      ]);
    }

    console.log(`SAVED DASHBOARD: ${dashboard}, ${user_id}, ${this.config}`);
  }

  openCustomers(activity) {
    this.actions.doAction({
      type: "ir.actions.act_window",
      name: "Crm Leads",
      target: "current",
      res_id: activity.res_id,
      res_model: "crm.lead",
      views: [
        [false, "list"],
        [false, "form"],
      ],
    });
  }
}

registry.category("lazy_components").add("AwesomeDashboard", AwesomeDashboard);
