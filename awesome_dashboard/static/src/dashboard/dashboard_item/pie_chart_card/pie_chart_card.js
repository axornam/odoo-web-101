/** @odoo-module **/

import { Component, useRef, onWillStart, onMounted } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { loadJS } from "@web/core/assets";

export class PieChartCard extends Component {
  static template = "awesome_dashboard.PieChartCard";
  static components = {};
  static props = {
    title: { type: String },
    value: { type: Object },
  };

  setup() {
    this.canvasRef = useRef("myChart");
    this.labels = Object.keys(this.props.value);
    this.data = Object.values(this.props.value);
    this.action = useService("action");

    onWillStart(async () => {
      await loadJS("/web/static/lib/Chart/Chart.js");
    });

    onMounted(() => {
      this.myPieChart = new Chart(this.canvasRef.el, {
        type: "pie",
        plugins: [
          {
            id: "clickChartEventHandler",
            afterEvent(chart, args, pluginOptions) {
              const event = args.event;
              if (event.type === "click") {
              }
            },
          },
        ],
        data: {
          labels: this.labels,
          datasets: [{ data: this.data }],
        },
        options: {
          color: ["red", "blue", "green"],
          onClick: (event, data, chart) => {
            console.log("DATA FROM OPTIONS: ", this.data[data[0].index]);
            console.log("LABELS FROM OPTIONS: ", this.labels[data[0].index]);

            const sizeLabel = this.labels[data[0].index];

            this.action.doAction({
              type: "ir.actions.act_window",
              name: "Crm Orders",
              target: "current",
              //res_id: activity.res_id,
              res_model: "crm.order",
              domain: [["size", "=", sizeLabel]],
              views: [
                [false, "list"],
                [false, "form"],
              ],
            });
          },
        },
      });
    });
  }
}
