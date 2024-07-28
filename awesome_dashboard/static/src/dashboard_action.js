/** @odoo-module **/

import { Component, xml } from "@odoo/owl";
import { LazyComponent } from "@web/core/assets";
import { _t } from "@web/core/l10n/translation";
import { registry } from "@web/core/registry";
import { AwesomeDashboard } from "./dashboard/dashboard";

export class AwesomeDashboardLoader extends Component {
  static components = { AwesomeDashboard, LazyComponent };
  static template = xml`
    <LazyComponent bundle="'awesome_dashboard.dashboard'" Component="'AwesomeDashboard'" />
  `;
}

registry
  .category("actions")
  .add("awesome_dashboard.dashboard", AwesomeDashboardLoader, {
    env: { _t },
  });
