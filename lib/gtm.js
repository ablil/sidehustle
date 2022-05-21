import * as gtag from "./gtag";

const categories = {
  contact: "contact_us",
  profile: "profile",
  idea: "ideas",
  backlog: "backlog",
};

const gtm = {
  contact: () =>
    gtag.event({ action: "submit_form", category: categories.contact }),
  profile: {
    selecttab: (tab) =>
      gtag.event({
        action: "select_tab",
        category: categories.profile,
        value: tab,
      }),
    updatepicture: () =>
      gtag.event({ action: "update_picture", category: categories.profile }),
  },
  ideas: {
    triggerstatus: (status) =>
      gtag.event({
        action: "trigger_status",
        category: categories.idea,
        value: status,
      }),
    selecttab: (tab) =>
      gtag.event({
        action: "select_tab",
        category: categories.idea,
        value: tab,
      }),
  },
  backlog: {
    filterbystatus: (status) =>
      gtag.event({
        action: "filter_by_status",
        category: categories.backlog,
        value: status,
      }),
    sortby: (filter) =>
      gtag.event({
        action: "sort_by",
        category: categories.backlog,
        value: filter,
      }),
    orderby: (filter) =>
      gtag.event({
        action: "order_by",
        category: categories.backlog,
        value: filter,
      }),
  },
};

export default gtm;
