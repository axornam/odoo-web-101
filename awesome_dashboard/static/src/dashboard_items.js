/** @odoo-module **/

import { Registry } from "@web/core/registry";
import { NumberCard } from "./dashboard/dashboard_item/number_card/number_card";
import { PieChartCard } from "./dashboard/dashboard_item/pie_chart_card/pie_chart_card";

import { _t } from "@web/core/l10n/translation";

const dashboard_items = [
  {
    id: "average_quantity",
    description: _t("Average amount of t-shirt"),
    Component: NumberCard,
    props: (data) => ({
      title: _t("Average amount of t-shirt by order this month"),
      value: data.average_quantity,
    }),
  },
  {
    id: "average_time",
    description: _t("Average amount of time"),
    Component: NumberCard,
    props: (data) => ({
      title: _t("Average amount of t-shirt by order this month"),
      value: data.average_time,
    }),
  },
  {
    id: "nb_new_orders",
    description: _t("Total Amount of New Orders"),
    Component: NumberCard,
    props: (data) => ({
      title: _t("Total Amount of New Orders"),
      value: data.nb_new_orders,
    }),
  },
  {
    id: "nb_cancelled_orders",
    description: _t("Average amount of t-shirt"),
    Component: NumberCard,
    props: (data) => ({
      title: _t("Average amount of t-shirt"),
      value: data.nb_cancelled_orders,
    }),
  },
  {
    id: "total_amount",
    description: _t("Total Amounf of New Orders"),
    Component: NumberCard,
    props: (data) => ({
      title: _t("Total Amount of New Orders."),
      value: data.total_amount,
    }),
  },
  {
    id: "orders_by_size",
    description: _t("Orders By Size(S, M, L)"),
    Component: PieChartCard,
    size: 2,
    props: (data) => ({
      title: _t("Orders By Size(S, M, L)"),
      value: data.orders_by_size,
    }),
  },
];

export const dashboardRegistry = new Registry();
dashboard_items.forEach((item) => {
  dashboardRegistry.category("awesome_dashboard").add(item.id, item);
});
