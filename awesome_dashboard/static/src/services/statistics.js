/** @odoo-module **/

import { reactive } from "@odoo/owl";
import { registry } from "@web/core/registry";
//import { memoize } from "@web/core/utils/functions";

export const loadStatistics = {
  dependencies: ["rpc"],
  start(env, { rpc }) {
    const result = reactive({});

    async function loadData() {
      const tempResult = await rpc("/awesome_dashboard/statistics");
      Object.assign(result, tempResult);
      //console.log(result);
      //return result;
    }

    const TIME = 1000 * 10;

    //return memoize(loadData)();
    setInterval(loadData, TIME);
    loadData(); // this is needed to prevent the initial object from being null

    return result;
  },
};

registry
  .category("services")
  .add("awesome_dashboard.statistics", loadStatistics);
